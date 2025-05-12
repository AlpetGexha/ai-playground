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
          <h1 className="text-4xl font-bold text-center mb-2">AI Love Letter Generator</h1>
          <p className="text-center text-muted-foreground">Create beautiful love letters with AI assistance</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create">Create Letter</TabsTrigger>
              <TabsTrigger value="view" disabled={!letter}>View Letter</TabsTrigger>
            </TabsList>

            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>Create a New Love Letter</CardTitle>
                  <CardDescription>
                    Fill in the details to generate a personalized love letter
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="recipient">Recipient Name</Label>
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
                        <Label htmlFor="type">Type of Letter</Label>
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
                        <Label htmlFor="traits">Special Traits / Inside Jokes</Label>
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
                        <Label htmlFor="tone">Tone</Label>
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
                        <Label htmlFor="length">Length</Label>
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
                    <Button variant="outline" type="button" onClick={() => window.history.back()}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isGenerating || !form.data.recipient || !form.data.traits}
                    >
                      {isGenerating ? 'Generating...' : 'Generate Love Letter'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="view">
              <Card>
                <CardHeader>
                  <CardTitle>AI Love Letter</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-8 flex flex-col items-center">
                    <div className="flex justify-center">
                      <div className="w-16 border-b-2 border-pink-500 dark:border-pink-400"></div>
                    </div>
                    <h2 className="mt-4 text-xl font-medium text-pink-500 dark:text-pink-400">
                      Love Letter
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
                    >
                      Create New Letter
                    </Button>
                    <Button
                      onClick={() => {
                        if (letter) {
                          navigator.clipboard.writeText(letter);
                        }
                      }}
                    >
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
