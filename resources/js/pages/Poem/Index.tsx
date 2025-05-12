import { useState } from 'react';
import { type PageProps } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface PoemProps extends PageProps {
  poem?: string;
  prompt?: string;
}

export default function Index({ poem, prompt }: PoemProps) {
  const { auth } = usePage<PageProps>().props;
  const [activeTab, setActiveTab] = useState<string>(poem ? "view" : "create");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const form = useForm({
    prompt: prompt || '',
    modify: false,
  });

  const modifyForm = useForm({
    prompt: prompt || '',
    poem: poem || '',
    instruction: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    form.post(route('poem.generate'), {
      onSuccess: () => {
        setActiveTab("view");
        setIsGenerating(false);
      },
      onError: () => {
        setIsGenerating(false);
      }
    });
  };

  const handleModify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    modifyForm.post(route('poem.modify'), {
      onSuccess: () => {
        setIsGenerating(false);
      },
      onError: () => {
        setIsGenerating(false);
      }
    });
  };

  return (
    <>
      <Head title="AI Poetry Generator">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head>
      <div className="container mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-2">AI Poetry Generator</h1>
          <p className="text-center text-muted-foreground">Create beautiful poems with AI assistance</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create">Create Poem</TabsTrigger>
              <TabsTrigger value="view" disabled={!poem}>View & Modify</TabsTrigger>
            </TabsList>

            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>Create a New Poem</CardTitle>
                  <CardDescription>
                    Describe what kind of poem you'd like the AI to generate
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="prompt">Poem Prompt</Label>
                        <Textarea
                          id="prompt"
                          placeholder="E.g., Write a sonnet about the changing seasons, focusing on autumn's rich colors..."
                          className="min-h-32"
                          value={form.data.prompt}
                          onChange={e => form.setData('prompt', e.target.value)}
                          disabled={isGenerating}
                        />
                        {form.errors.prompt && (
                          <p className="text-sm text-destructive">{form.errors.prompt}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" asChild>
                      <Link href="/dashboard">Cancel</Link>
                    </Button>
                    <Button type="submit" disabled={isGenerating || !form.data.prompt}>
                      {isGenerating ? 'Generating...' : 'Generate Poem'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="view">
              <Card>
                <CardHeader>
                  <CardTitle>AI Poetry Corner</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-8 flex flex-col items-center">
                    <div className="flex justify-center">
                      <div className="w-16 border-b-2 border-[#f53003] dark:border-[#FF4433]"></div>
                    </div>
                    <h2 className="mt-4 text-xl font-medium text-[#f53003] dark:text-[#FF4433]">
                      {prompt ? `A Poem About ${prompt.split(' ').slice(0, 3).join(' ')}...` : "Your Poem"}
                    </h2>
                  </div>

                  <div className="mb-6">
                    <div className="prose max-w-none rounded-lg bg-[#FDFDFC] p-6 shadow-sm dark:bg-[#0a0a0a]">
                      <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed">
                        {poem}
                      </pre>
                    </div>
                    
                    <div className="mt-8 text-center">
                      <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                        Generated using OpenAI's ChatGPT API
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleModify}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="instruction">Modification Request</Label>
                        <Textarea
                          id="instruction"
                          placeholder="E.g., Make it more romantic, add more metaphors, make it rhyme..."
                          value={modifyForm.data.instruction}
                          onChange={e => modifyForm.setData('instruction', e.target.value)}
                          disabled={isGenerating}
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setActiveTab("create")}
                        disabled={isGenerating}
                      >
                        Create New Poem
                      </Button>
                      <Button
                        type="submit"
                        disabled={isGenerating || !modifyForm.data.instruction}
                      >
                        {isGenerating ? 'Modifying...' : 'Modify Poem'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
