import React, { FormEvent, useState } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Download, Image as ImageIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ImageIndex() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      setError('Please enter a description for the image');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/image', { prompt });

      if (response.data) {
        setGeneratedImage(response.data);
      } else {
        setError('Failed to generate image');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head title="AI Image Generator" />
        <div className="flex flex-col md:flex-row min-h-screen bg-background">
        {/* Left side - Form */}
        <div className="flex flex-1 items-center justify-center p-4 md:p-6 lg:p-8">
          <Card className="w-full max-w-md shadow-lg border-border">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-2xl font-bold text-foreground">AI Image Generator</CardTitle>
              <CardDescription className="text-muted-foreground">
                Create stunning AI-generated images from your text descriptions
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="prompt">Image Description</Label>                  <Textarea
                    id="prompt"
                    placeholder="Describe the image you want to create..."
                    value={prompt}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
                    rows={5}
                    disabled={isLoading}
                    className="resize-none"
                  />
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground mb-1 font-medium">Example prompts:</p>
                    <div className="grid grid-cols-1 gap-2">
                      <button
                        type="button"
                        className="text-xs bg-muted/50 hover:bg-muted py-1 px-2 rounded-md text-left text-muted-foreground transition-colors"
                        onClick={() => setPrompt("A serene Japanese garden with cherry blossoms, a small wooden bridge over a koi pond, captured at sunset with warm golden light")}
                      >
                        A serene Japanese garden with cherry blossoms, a small wooden bridge...
                      </button>
                      <button
                        type="button"
                        className="text-xs bg-muted/50 hover:bg-muted py-1 px-2 rounded-md text-left text-muted-foreground transition-colors"
                        onClick={() => setPrompt("A steampunk-inspired mechanical owl with brass gears, copper wings, and glowing emerald eyes against a Victorian cityscape background")}
                      >
                        A steampunk-inspired mechanical owl with brass gears, copper wings...
                      </button>
                    </div>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Generate Image
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>        {/* Right side - Generated Image */}
        <div className="hidden md:flex flex-1 items-center justify-center p-4 md:p-6 lg:p-8 bg-muted/20 dark:bg-muted/10">
          <Card className="w-full h-full max-w-lg flex flex-col shadow-lg border-border">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-xl font-semibold text-foreground">Your Generated Image</CardTitle>
            </CardHeader>            <CardContent className="flex-1 flex items-center justify-center p-4">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center text-center p-6 h-full w-full">
                  <div className="animate-spin rounded-full border-t-transparent border-primary border-4 h-16 w-16 mb-6"></div>
                  <p className="text-foreground font-medium text-lg">Creating your masterpiece...</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    This may take up to 30 seconds
                  </p>
                </div>
              ) : generatedImage ? (
                <div className="relative w-full">
                  <img
                    src={generatedImage}
                    alt="Generated image"
                    className="w-full h-auto rounded-md shadow-md object-contain max-h-[500px]"
                  />
                </div>
              ) : (<div className="flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-border rounded-lg h-full w-full bg-muted/20 dark:bg-muted/10">
                  <ImageIcon className="h-12 w-12 mb-4 text-muted-foreground" />                  <p className="text-muted-foreground font-medium">
                    Your generated image will appear here
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 max-w-xs text-center">
                    Enter a detailed description including style, setting, lighting, and colors for best results
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <span className="mr-2">✨</span>
                      <span>Add artistic style</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">🎭</span>
                      <span>Specify mood/tone</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">🔍</span>
                      <span>Include details</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">🌈</span>
                      <span>Mention colors</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>            {generatedImage && (
              <CardFooter className="border-t border-border flex flex-col gap-2">
                <Button
                  variant="secondary"
                  className="w-full hover:bg-muted"
                  asChild
                >
                  <a href={generatedImage} target="_blank" download="ai-generated-image.png">
                    <Download className="mr-2 h-4 w-4" />
                    Download Image
                  </a>
                </Button>
                <div className="flex gap-2 w-full">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'My AI Generated Image',
                          text: 'Check out this image I created with AI!',
                          url: generatedImage
                        })
                      } else {
                        navigator.clipboard.writeText(generatedImage);
                        alert('Image URL copied to clipboard!');
                      }
                    }}
                  >
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share Image
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPrompt('');
                      setGeneratedImage(null);
                    }}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </Button>
                </div>
              </CardFooter>
            )}
          </Card>
        </div>        {/* Mobile view for generated image */}
        {generatedImage && (
          <div className="md:hidden mt-4 p-4 w-full">
            <Card className="shadow-lg border-border">
              <CardHeader className="border-b border-border">
                <CardTitle className="text-xl font-semibold text-foreground">Your Generated Image</CardTitle>
              </CardHeader>

              <CardContent>
                <img
                  src={generatedImage}
                  alt="Generated image"
                  className="w-full h-auto rounded-md shadow-md"
                />
              </CardContent>              <CardFooter className="border-t border-border flex flex-col gap-2">
                <Button
                  variant="secondary"
                  className="w-full hover:bg-muted"
                  asChild
                >
                  <a href={generatedImage} target="_blank" download="ai-generated-image.png">
                    <Download className="mr-2 h-4 w-4" />
                    Download Image
                  </a>
                </Button>
                <div className="flex gap-2 w-full">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'My AI Generated Image',
                          text: 'Check out this image I created with AI!',
                          url: generatedImage
                        })
                      } else {
                        navigator.clipboard.writeText(generatedImage);
                        alert('Image URL copied to clipboard!');
                      }
                    }}
                  >
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPrompt('');
                      setGeneratedImage(null);
                    }}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
