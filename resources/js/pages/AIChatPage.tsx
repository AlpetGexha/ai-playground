import { useState, useEffect, useRef } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import type { SharedData } from '@/types';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface Message {
  user: string;
  text: string;
}

export default function AIChatPage() {
  const { auth } = usePage<{ auth: SharedData['auth'] }>().props;

  const [messages, setMessages] = useState<Message[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamedText, setStreamedText] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  // Fetch todos when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, streamedText]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(route('todos'));
      setTodos(response.data.todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      await axios.post(route('todos.toggle', { id }));
      fetchTodos();
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { user: 'You', text: input };
    setMessages([...messages, userMessage]);

    // Clear input and show typing indicator
    setInput('');
    setIsTyping(true);
    setStreamedText('');

    // Stream AI response
    streamAIResponse(input);
  };

  const streamAIResponse = (prompt: string) => {
    // Close any existing event source
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    // Create a new event source
    const eventSource = new EventSource(route('chat.stream') + `?message=${encodeURIComponent(prompt)}`);
    eventSourceRef.current = eventSource;

    let fullResponse = '';

    eventSource.onmessage = (event) => {
      if (event.data === '[DONE]') {
        // Add the complete message and close the connection
        const aiMessage = { user: 'AI', text: fullResponse };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
        setIsTyping(false);
        setStreamedText('');
        eventSource.close();
        eventSourceRef.current = null;

        // Refresh todos in case AI created some
        fetchTodos();
      } else {
        try {
          const data = JSON.parse(event.data);
          fullResponse += data.chunk;
          setStreamedText(fullResponse);
        } catch (error) {
          console.error('Error parsing event data:', error);
        }
      }
    };

    eventSource.onerror = () => {
      console.error('Error with EventSource connection');
      eventSource.close();
      eventSourceRef.current = null;
      setIsTyping(false);

      // Add error message
      const errorMessage = { user: 'AI', text: 'Sorry, there was an error processing your request.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    };
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Clean up event source on unmount
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  return (
    <>
      <Head title="AI Chat">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head>
      <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
        <div className="w-full max-w-[335px] lg:max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-xl font-semibold md:text-2xl">AI Chat Assistant</h1>
            <p className="text-sm text-[#66635c] dark:text-[#84837E]">
              Chat with AI and manage your todos in one place
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            {/* Chat Section - takes up more space */}
            <div className="flex flex-col rounded-lg border border-[#E3E3E0] bg-white p-4 shadow-sm dark:border-[#232323] dark:bg-[#171717] md:col-span-3">
              {/* Chat Messages */}
              <div className="mb-4 flex-grow overflow-y-auto h-64 space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.user === 'You' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="max-w-[80%]">
                      <div className={`${message.user === 'You' ? 'bg-[#EDEDFD] dark:bg-[#2d2d8f]' : 'bg-[#F5F5F3] dark:bg-[#232323]'} rounded-xl p-3 shadow-sm`}>
                        <p className="text-sm whitespace-pre-wrap">
                          {message.text}
                        </p>
                      </div>
                      <span className={`mt-1 block text-xs text-[#66635c] dark:text-[#84837E] ${message.user === 'You' ? 'text-right' : 'text-left'}`}>
                        {message.user}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%]">
                      <div className="bg-[#F5F5F3] dark:bg-[#232323] rounded-xl p-3 shadow-sm">
                        <p className="text-sm whitespace-pre-wrap">
                          {streamedText}
                        </p>
                      </div>
                      <span className="mt-1 block text-xs text-[#66635c] dark:text-[#84837E] text-left">
                        AI
                      </span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="border-t border-[#E3E3E0] dark:border-[#232323] pt-3">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask something..."
                    className="w-full rounded-sm border border-[#E3E3E0] bg-white p-2 text-sm text-[#1b1b18] placeholder-[#84837E] focus:border-[#2D2D2D] focus:outline-none dark:border-[#232323] dark:bg-[#171717] dark:text-[#EDEDEC] dark:focus:border-[#505050]"
                    required
                  />
                  <button
                    type="submit"
                    className="rounded-sm bg-[#2D2D2D] px-4 py-2 text-sm font-medium text-white hover:bg-[#505050] dark:bg-[#E3E3E0] dark:text-[#171717] dark:hover:bg-white"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>

            {/* Todo List - takes up less space */}
            <div className="rounded-lg border border-[#E3E3E0] bg-white p-4 shadow-sm dark:border-[#232323] dark:bg-[#171717] md:col-span-2">
              <h3 className="mb-4 text-lg font-medium">Your Todos</h3>
              <div className="space-y-2">
                {todos.length === 0 ? (
                  <p className="text-sm text-[#66635c] dark:text-[#84837E]">No todos yet. Ask AI to create one!</p>
                ) : (
                  todos.map((todo) => (
                    <div key={todo.id} className="flex items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="rounded border-[#E3E3E0] text-[#2D2D2D] focus:ring-[#2D2D2D] dark:border-[#232323] dark:focus:ring-[#E3E3E0]"
                      />
                      <span className={`text-sm ${todo.completed ? 'line-through text-[#84837E]' : ''}`}>
                        {todo.title}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
