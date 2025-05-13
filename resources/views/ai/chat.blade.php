@extends('layouts.app')

@section('content')
<div class="flex flex-col bg-gray-900 text-gray-200 p-4 rounded-lg">
    <!-- Chat Messages -->
    <div class="overflow-y-auto h-48 mb-3 space-y-2" id="messages">
        @foreach($messages ?? [] as $message)
            <div class="flex {{ $message['user'] === 'You' ? 'justify-end' : 'justify-start' }}">
                <div class="max-w-md">
                    <div class="{{ $message['user'] === 'You' ? 'bg-indigo-600' : 'bg-gray-700' }} shadow rounded-xl p-2">
                        <p class="text-sm whitespace-pre-wrap">
                            {{ $message['text'] }}
                        </p>
                    </div>
                    <span class="block text-xs mt-1 text-gray-400 {{ $message['user'] === 'You' ? 'text-right' : 'text-left' }}">
                        {{ $message['user'] }}
                    </span>
                </div>
            </div>
        @endforeach

        <div id="typing-indicator" class="flex justify-start hidden">
            <div class="max-w-md">
                <div class="bg-gray-700 shadow rounded-xl p-2">
                    <p class="text-sm whitespace-pre-wrap" id="response-stream">
                        <!-- Streamed content will appear here -->
                    </p>
                </div>
                <span class="block text-xs mt-1 text-gray-400 text-left">
                    AI
                </span>
            </div>
        </div>
    </div>

    <!-- Chat Input -->
    <div class="border-t border-gray-700 pt-2">
        <form id="chat-form" class="flex space-x-2">
            <input type="text"
                   id="chat-input"
                   placeholder="Ask something..."
                   class="w-full rounded-lg border border-gray-700 bg-gray-800 text-gray-200 placeholder-gray-500 p-2 text-sm shadow focus:ring-indigo-500 focus:border-indigo-500"
                   required />
            <button type="submit"
                    class="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-4 text-sm shadow transition">
                Send
            </button>
        </form>
    </div>

    <!-- Todo List -->
    <div class="mt-4 bg-gray-800 rounded-lg p-3">
        <h3 class="text-lg font-medium mb-2">Your Todos</h3>
        <div class="space-y-2" id="todo-list">
            <!-- Todos will be loaded here -->
        </div>
    </div>
</div>

@endsection

@push('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Store chat messages
        const messages = [];
        const messageContainer = document.getElementById('messages');
        const typingIndicator = document.getElementById('typing-indicator');
        const responseStream = document.getElementById('response-stream');
        const chatForm = document.getElementById('chat-form');
        const chatInput = document.getElementById('chat-input');
        const todoList = document.getElementById('todo-list');

        // Load todos on page load
        fetchTodos();

        // Handle chat form submission
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const prompt = chatInput.value.trim();
            if (!prompt) return;

            // Add user message
            addMessage('You', prompt);
            chatInput.value = '';

            // Show typing indicator
            typingIndicator.classList.remove('hidden');
            responseStream.textContent = '';

            // Scroll down
            scrollToBottom();

            // Stream response from server
            streamAIResponse(prompt);
        });

        // Function to add a message to the chat
        function addMessage(user, text) {
            messages.push({ user, text });

            const messageDiv = document.createElement('div');
            messageDiv.classList.add('flex');
            messageDiv.classList.add(user === 'You' ? 'justify-end' : 'justify-start');

            messageDiv.innerHTML = `
                <div class="max-w-md">
                    <div class="${user === 'You' ? 'bg-indigo-600' : 'bg-gray-700'} shadow rounded-xl p-2">
                        <p class="text-sm whitespace-pre-wrap">
                            ${text}
                        </p>
                    </div>
                    <span class="block text-xs mt-1 text-gray-400 ${user === 'You' ? 'text-right' : 'text-left'}">
                        ${user}
                    </span>
                </div>
            `;

            // Insert before typing indicator
            messageContainer.insertBefore(messageDiv, typingIndicator);
            scrollToBottom();
        }

        // Function to stream AI response
        function streamAIResponse(prompt) {
            const eventSource = new EventSource(`/ai/chat/stream?message=${encodeURIComponent(prompt)}`);
            let fullResponse = '';

            eventSource.onmessage = function(event) {
                if (event.data === '[DONE]') {
                    // Add the complete message and hide typing indicator
                    addMessage('AI', fullResponse);
                    typingIndicator.classList.add('hidden');
                    responseStream.textContent = '';
                    eventSource.close();

                    // Refresh todos as the AI might have created some
                    fetchTodos();
                } else {
                    const data = JSON.parse(event.data);
                    fullResponse += data.chunk;
                    responseStream.textContent = fullResponse;
                    scrollToBottom();
                }
            };

            eventSource.onerror = function(error) {
                console.error('Error streaming response:', error);
                eventSource.close();
                typingIndicator.classList.add('hidden');
                addMessage('AI', 'Sorry, there was an error processing your request.');
            };
        }

        // Function to fetch todos
        function fetchTodos() {
            fetch('/ai/todos')
                .then(response => response.json())
                .then(data => {
                    todoList.innerHTML = '';

                    data.todos.forEach(todo => {
                        const todoItem = document.createElement('div');
                        todoItem.classList.add('flex', 'items-center', 'gap-2');

                        todoItem.innerHTML = `
                            <input
                                type="checkbox"
                                data-id="${todo.id}"
                                ${todo.completed ? 'checked' : ''}
                                class="rounded text-indigo-600 focus:ring-indigo-500 todo-checkbox"
                            >
                            <span class="text-sm ${todo.completed ? 'line-through text-gray-500' : ''}">
                                ${todo.title}
                            </span>
                        `;

                        todoList.appendChild(todoItem);
                    });

                    // Add event listeners to checkboxes
                    document.querySelectorAll('.todo-checkbox').forEach(checkbox => {
                        checkbox.addEventListener('change', function() {
                            toggleTodo(this.dataset.id);
                        });
                    });
                })
                .catch(error => {
                    console.error('Error fetching todos:', error);
                });
        }

        // Function to toggle todo completion status
        function toggleTodo(id) {
            fetch(`/ai/todos/${id}/toggle`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            })
                .then(response => response.json())
                .then(data => {
                    // Refresh todos to reflect the change
                    fetchTodos();
                })
                .catch(error => {
                    console.error('Error toggling todo:', error);
                });
        }

        // Scroll to bottom of chat
        function scrollToBottom() {
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }
    });
</script>
@endpush
