// d:\xammp\htdocs\@laravel\fun-with-openai-laravel\resources\js\pages\LoveLetter\Index.tsx
import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Heart,
  PenLine,
  Send,
  ArrowLeft,
  ClipboardCopy,
  User,
  Music,
  Clock,
  HeartHandshake
} from 'lucide-react';

interface LoveLetterProps {
  letter?: string;
  prompt?: string;
}

export default function Index({ letter, prompt }: LoveLetterProps) {
  const [activeTab, setActiveTab] = useState<string>(letter ? "view" : "create");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const form = useForm({
    recipient: '',
    type: 'romantic',
    traits: '',
    tone: 'poetic',
    length: 'medium',
    prompt: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    // Construct the prompt - this matches the backend format
    form.data.prompt = `Write a ${form.data.type} love letter to ${form.data.recipient}. Make it ${form.data.tone}. Include references to ${form.data.traits}. Keep it ${form.data.length} in length.`;

    form.post(route('loveletter.generate'), {
      onSuccess: () => {
        setActiveTab("view");
        setIsGenerating(false);
      },
      onError: () => {
        setIsGenerating(false);
      }
    });
  };

  return (
    <>
      <Head title="AI Love Letter Generator">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head>
      <div className="container mx-auto py-10">
        <div className="mb-8">
          <div className="flex justify-center mb-2">
            <Heart className="text-pink-500 mr-2" size={32} />
            <h1 className="text-4xl font-bold text-center">AI Love Letter Generator</h1>
            <Heart className="text-pink-500 ml-2" size={32} />
          </div>
          <p className="text-center text-muted-foreground">Create beautiful love letters with AI assistance</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create" className="flex items-center justify-center">
                <PenLine className="mr-2" size={16} />
                Create Letter
              </TabsTrigger>
              <TabsTrigger value="view" disabled={!letter} className="flex items-center justify-center">
                <HeartHandshake className="mr-2" size={16} />
                View Letter
              </TabsTrigger>
            </TabsList>

            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PenLine className="mr-2 text-pink-500" size={20} />
                    Create a New Love Letter
                  </CardTitle>
                  <CardDescription>
                    Fill in the details to generate a personalized love letter
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="recipient" className="flex items-center">
                          <User className="mr-2" size={16} />
                          Recipient Name
                        </Label>
                        <Input
                          id="recipient"
                          placeholder="e.g., Alex"
                          value={form.data.recipient}
                          onChange={e => form.setData('recipient', e.target.value)}
                          disabled={isGenerating}
                        />
                        {form.errors.recipient && (
                          <p className="text-sm text-destructive">{form.errors.recipient}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="type" className="flex items-center">
                          <Heart className="mr-2" size={16} />
                          Type of Letter
                        </Label>
                        <Select
                          value={form.data.type}
                          onValueChange={(value) => form.setData('type', value)}
                          disabled={isGenerating}
                        >
                          <SelectTrigger id="type">
                            <SelectValue placeholder="Select letter type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="romantic">Romantic</SelectItem>
                            <SelectItem value="funny">Funny</SelectItem>
                            <SelectItem value="apology">Apology</SelectItem>
                            <SelectItem value="flirty">Flirty</SelectItem>
                            <SelectItem value="dramatic">Dramatic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="traits" className="flex items-center">
                          <HeartHandshake className="mr-2" size={16} />
                          Special Traits / Inside Jokes
                        </Label>
                        <Textarea
                          id="traits"
                          placeholder="e.g., loves coffee, always late, we met on a rainy day"
                          value={form.data.traits}
                          onChange={e => form.setData('traits', e.target.value)}
                          disabled={isGenerating}
                        />
                        {form.errors.traits && (
                          <p className="text-sm text-destructive">{form.errors.traits}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tone" className="flex items-center">
                          <Music className="mr-2" size={16} />
                          Tone
                        </Label>
                        <Select
                          value={form.data.tone}
                          onValueChange={(value) => form.setData('tone', value)}
                          disabled={isGenerating}
                        >
                          <SelectTrigger id="tone">
                            <SelectValue placeholder="Select tone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="poetic">Poetic</SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="shakespearean">Shakespearean</SelectItem>
                            <SelectItem value="songlyrics">Song Lyrics</SelectItem>
                            <SelectItem value="cheesy">Cheesy</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="length" className="flex items-center">
                          <Clock className="mr-2" size={16} />
                          Length
                        </Label>
                        <Select
                          value={form.data.length}
                          onValueChange={(value) => form.setData('length', value)}
                          disabled={isGenerating}
                        >
                          <SelectTrigger id="length">
                            <SelectValue placeholder="Select length" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="short">Short</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="long">Long</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => window.history.back()} className="flex items-center">
                      <ArrowLeft className="mr-2" size={16} />
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isGenerating || !form.data.recipient || !form.data.traits}
                      className="flex items-center"
                    >
                      {isGenerating ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2" size={16} />
                          Generate Love Letter
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="view">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="mr-2 text-pink-500" fill="currentColor" size={20} />
                    AI Love Letter
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-8 flex flex-col items-center">
                    <div className="flex justify-center">
                      <div className="w-16 border-b-2 border-pink-500 dark:border-pink-400"></div>
                    </div>
                    <h2 className="mt-4 text-xl font-medium text-pink-500 dark:text-pink-400 flex items-center justify-center">
                      <Heart className="mr-2" size={16} fill="currentColor" />
                      Love Letter
                      <Heart className="ml-2" size={16} fill="currentColor" />
                    </h2>
                  </div>

                  <div className="mb-6">
                    <div className="prose max-w-none rounded-lg bg-[#FDFDFC] p-6 shadow-sm dark:bg-[#0a0a0a]">
                      <pre className="whitespace-pre-wrap font-serif text-base leading-relaxed italic">
                        {letter}
                      </pre>
                    </div>

                    <div className="mt-8 text-center">
                      <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                        Generated using OpenAI's ChatGPT API
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab("create")}
                      className="flex items-center"
                    >
                      <PenLine className="mr-2" size={16} />
                      Create New Letter
                    </Button>
                    <Button
                      onClick={() => {
                        if (letter) {
                          navigator.clipboard.writeText(letter);
                        }
                      }}
                      className="flex items-center"
                    >
                      <ClipboardCopy className="mr-2" size={16} />
                      Copy to Clipboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
