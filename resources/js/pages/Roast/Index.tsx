import { FormEvent, useState } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Mic,
  Flame,
  Send,
  Volume2,
  AlertTriangle,
  User,
  Play
} from 'lucide-react';

export default function RoastIndex() {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roastFile, setRoastFile] = useState<{ url: string; topic: string } | null>(null);
  const [voice, setVoice] = useState('nova');

  const voices = [
    { value: 'alloy', label: 'Alloy' },
    { value: 'ash', label: 'Ash' },
    { value: 'ballad', label: 'Ballad' },
    { value: 'coral', label: 'Coral' },
    { value: 'echo', label: 'Echo' },
    { value: 'fable', label: 'Fable' },
    { value: 'nova', label: 'Nova' },
    { value: 'onyx', label: 'Onyx' },
    { value: 'sage', label: 'Sage' },
    { value: 'shimmer', label: 'Shimmer' },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!topic.trim()) {
      setError('Please enter a topic to roast');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/roastt', {
        topic,
        voice // Include the selected voice in the request
      });

      if (response.data.success) {
        setRoastFile({
          url: response.data.file_url,
          topic: response.data.topic
        });
      } else {
        setError('Failed to generate roast');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head title="AI Roast Generator" />

      <div className="flex items-center flex-wrap justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="w-full max-w-xl mb-6 text-center">
          <div className="flex justify-center mb-2">
            <Flame className="text-red-500 mr-2" size={32} />
            <h1 className="text-4xl font-bold">AI Roast Generator</h1>
            <Flame className="text-red-500 ml-2" size={32} />
          </div>
          <p className="text-muted-foreground">Create sarcastic AI-generated roasts with voice</p>
        </div>
        <Card className="w-full max-w-xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
              <Mic className="mr-2 text-red-500" size={24} />
              AI Roast Generator
            </CardTitle>
            <CardDescription className="text-center">Enter a topic, person or thing to create a sarcastic roast</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="topic" className="text-sm font-medium flex items-center">
                  <Flame className="mr-2" size={16} />
                  What would you like to roast?
                </Label>
                <Input
                  type="text"
                  id="topic"
                  placeholder="Enter a topic, person, thing, or idea..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled={isLoading}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="voice" className="text-sm font-medium flex items-center">
                  <Volume2 className="mr-2" size={16} />
                  Choose a voice
                </Label>
                <Select
                  value={voice}
                  onValueChange={setVoice}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {voices.map((voiceOption) => (
                      <SelectItem key={voiceOption.value} value={voiceOption.value}>
                        {voiceOption.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Each voice has its own unique personality and tone.</p>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
                variant="default"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Roast...
                  </>
                ) : (
                  <>
                    <Mic className="mr-2" size={16} />
                    Generate Roast
                  </>
                )}
              </Button>
            </form>

            {error && (
              <div className="mt-4 p-4 text-destructive bg-destructive/10 rounded-md">
                <p>{error}</p>
              </div>
            )}
          </CardContent>

          {roastFile && (
            <CardFooter className="flex flex-col">
              <div className="w-full">
                <h3 className="text-xl font-medium mb-3 flex items-center justify-center">
                  <Flame className="mr-2 text-red-500" size={20} fill="currentColor" />
                  Your roast is ready!
                  <Flame className="ml-2 text-red-500" size={20} fill="currentColor" />
                </h3>
                <Card className="bg-muted">
                  <CardContent className="pt-6">
                    <p className="mb-2">
                      <span className="font-medium">Topic:</span> {roastFile.topic}
                    </p>

                    <div className="mt-3">
                      <audio controls className="w-full" src={roastFile.url}>
                        Your browser does not support the audio element.
                      </audio>
                    </div>

                    <div className="mt-4">
                      <Button
                        variant="default"
                        size="sm"
                        asChild
                      >
                        <a href={roastFile.url} download>
                          <Play className="mr-2" size={16} />
                          Download MP3
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </>
  );
}
