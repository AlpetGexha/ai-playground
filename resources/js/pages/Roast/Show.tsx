import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface RoastShowProps {
  mp3: string;
  topic: string;
  flash?: string;
}

export default function RoastShow({ mp3, topic, flash }: RoastShowProps) {
  const [audioUrl, setAudioUrl] = useState<string>('');

  useEffect(() => {
    // Ensure the URL is absolute
    setAudioUrl(mp3.startsWith('http') ? mp3 : `/${mp3}`);
  }, [mp3]);

  return (
    <>
      <Head title={`Roast: ${topic}`} />

      <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <Card className="w-full max-w-xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Roast: {topic}</CardTitle>

            {flash && (
              <div className="flex items-center p-4 mt-4 text-primary-foreground bg-primary/20 rounded-md">
                <AlertCircle className="h-5 w-5 mr-2" />
                <p>{flash}</p>
              </div>
            )}
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <Card className="bg-muted">
                <CardContent className="pt-6">
                  <h2 className="text-lg font-medium mb-4">Listen to your roast:</h2>

                  {audioUrl && (
                    <div>
                      <audio controls className="w-full" src={audioUrl}>
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between flex-wrap gap-2">
            <Button
              variant="default"
              asChild
            >
              <a href={audioUrl} download>
                <svg className="mr-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download MP3
              </a>
            </Button>

            <Button
              variant="outline"
              asChild
            >
              <a href="/roast">
                <svg className="mr-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create New Roast
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
