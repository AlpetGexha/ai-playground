import React, { FormEvent, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Download, Image as ImageIcon, ChevronDown, ChevronUp, Settings } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ImageIndex() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  // Advanced options state
  const [model, setModel] = useState<string>('dall-e-3');
  const [quality, setQuality] = useState<string>('auto');
  const [size, setSize] = useState<string>('1024x1024');
  const [style, setStyle] = useState<string>('vivid');
  const [background, setBackground] = useState<string>('auto');
  const [outputFormat, setOutputFormat] = useState<string>('png');
  const [responseFormat, setResponseFormat] = useState<string>('url');
  const [moderation, setModeration] = useState<string>('auto');
  const [compressionLevel, setCompressionLevel] = useState<number>(100);

  // Available options based on model selection
  const modelOptions = [
    { value: 'dall-e-2', label: 'DALL·E 2' },
    { value: 'dall-e-3', label: 'DALL·E 3' },
    { value: 'gpt-image-1', label: 'GPT-4o Vision' }
  ];

  const qualityOptions = {
    'dall-e-2': [{ value: 'standard', label: 'Standard' }],
    'dall-e-3': [
      { value: 'auto', label: 'Auto' },
      { value: 'hd', label: 'HD' },
      { value: 'standard', label: 'Standard' }
    ],
    'gpt-image-1': [
      { value: 'auto', label: 'Auto' },
      { value: 'high', label: 'High' },
      { value: 'medium', label: 'Medium' },
      { value: 'low', label: 'Low' }
    ]
  };

  const sizeOptions = {
    'dall-e-2': [
      { value: '256x256', label: '256x256' },
      { value: '512x512', label: '512x512' },
      { value: '1024x1024', label: '1024x1024' }
    ],
    'dall-e-3': [
      { value: '1024x1024', label: '1024x1024 (Square)' },
      { value: '1792x1024', label: '1792x1024 (Landscape)' },
      { value: '1024x1792', label: '1024x1792 (Portrait)' }
    ],
    'gpt-image-1': [
      { value: 'auto', label: 'Auto' },
      { value: '1024x1024', label: '1024x1024 (Square)' },
      { value: '1536x1024', label: '1536x1024 (Landscape)' },
      { value: '1024x1536', label: '1024x1536 (Portrait)' }
    ]
  };

  const styleOptions = [
    { value: 'vivid', label: 'Vivid (Hyper-real, dramatic)' },
    { value: 'natural', label: 'Natural (More realistic)' }
  ];

  const backgroundOptions = [
    { value: 'auto', label: 'Auto' },
    { value: 'transparent', label: 'Transparent' },
    { value: 'opaque', label: 'Opaque' }
  ];

  const outputFormatOptions = [
    { value: 'png', label: 'PNG' },
    { value: 'jpeg', label: 'JPEG' },
    { value: 'webp', label: 'WebP' }
  ];

  const responseFormatOptions = [
    { value: 'url', label: 'URL' },
    { value: 'b64_json', label: 'Base64 JSON' }
  ];

  const moderationOptions = [
    { value: 'auto', label: 'Auto' },
    { value: 'low', label: 'Low (Less restrictive)' }
  ];

  const handleModelChange = (value: string) => {
    setModel(value);
    // Reset other options based on model compatibility
    setQuality('auto');
    // Set default size based on model
    if (value === 'dall-e-2') {
      setSize('1024x1024');
    } else if (value === 'dall-e-3') {
      setSize('1024x1024');
    } else if (value === 'gpt-image-1') {
      setSize('auto');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      setError('Please enter a description for the image');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Build request payload with all selected options
      const payload: Record<string, any> = {
        prompt,
        model
      };

      // Add optional parameters based on model
      if (quality !== 'auto') {
        payload.quality = quality;
      }

      if (size !== '1024x1024' || model === 'gpt-image-1') {
        payload.size = size;
      }

      if (model === 'dall-e-3' && style !== 'vivid') {
        payload.style = style;
      }

      if (model !== 'gpt-image-1') {
        if (responseFormat !== 'url') {
          payload.response_format = responseFormat;
        }
      }

      // GPT-image-1 specific options
      if (model === 'gpt-image-1') {
        if (background !== 'auto') {
          payload.background = background;
        }

        if (outputFormat !== 'png') {
          payload.output_format = outputFormat;
        }

        if (moderation !== 'auto') {
          payload.moderation = moderation;
        }

        if ((outputFormat === 'webp' || outputFormat === 'jpeg') && compressionLevel !== 100) {
          payload.output_compression = compressionLevel;
        }
      }

      const response = await axios.post('/image', payload);

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
              <div className="mt-2">
                <Link
                  href="/image/gallery"
                  className="text-sm text-primary hover:underline inline-flex items-center"
                >
                  <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  View Image Gallery
                </Link>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="prompt">Image Description</Label>
                  <Textarea
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

                {/* Advanced Options Section */}
                <Collapsible
                  open={showAdvancedOptions}
                  onOpenChange={setShowAdvancedOptions}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 text-sm w-full justify-between"
                      >
                        <div className="flex items-center">
                          <Settings className="h-4 w-4 mr-1" />
                          <span>Advanced Options</span>
                        </div>
                        {showAdvancedOptions ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  </div>

                  <CollapsibleContent className="space-y-4 pt-2">
                    <div className="grid grid-cols-2 gap-3">
                      {/* Model Selection */}
                      <div className="space-y-1">
                        <Label htmlFor="model" className="text-xs">Model</Label>
                        <Select value={model} onValueChange={handleModelChange}>
                          <SelectTrigger id="model" className="h-8 text-xs">
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent>
                            {modelOptions.map(option => (
                              <SelectItem key={option.value} value={option.value} className="text-xs">
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Size Selection */}
                      <div className="space-y-1">
                        <Label htmlFor="size" className="text-xs">Size</Label>
                        <Select
                          value={size}
                          onValueChange={setSize}
                          disabled={isLoading}
                        >
                          <SelectTrigger id="size" className="h-8 text-xs">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            {sizeOptions[model as keyof typeof sizeOptions]?.map(option => (
                              <SelectItem key={option.value} value={option.value} className="text-xs">
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Quality Selection */}
                      <div className="space-y-1">
                        <Label htmlFor="quality" className="text-xs">Quality</Label>
                        <Select
                          value={quality}
                          onValueChange={setQuality}
                          disabled={isLoading}
                        >
                          <SelectTrigger id="quality" className="h-8 text-xs">
                            <SelectValue placeholder="Select quality" />
                          </SelectTrigger>
                          <SelectContent>
                            {qualityOptions[model as keyof typeof qualityOptions]?.map(option => (
                              <SelectItem key={option.value} value={option.value} className="text-xs">
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Style Selection (DALL-E 3 only) */}
                      {model === 'dall-e-3' && (
                        <div className="space-y-1">
                          <Label htmlFor="style" className="text-xs">Style</Label>
                          <Select
                            value={style}
                            onValueChange={setStyle}
                            disabled={isLoading || model !== 'dall-e-3'}
                          >
                            <SelectTrigger id="style" className="h-8 text-xs">
                              <SelectValue placeholder="Select style" />
                            </SelectTrigger>
                            <SelectContent>
                              {styleOptions.map(option => (
                                <SelectItem key={option.value} value={option.value} className="text-xs">
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {/* Background (GPT-image-1 only) */}
                      {model === 'gpt-image-1' && (
                        <div className="space-y-1">
                          <Label htmlFor="background" className="text-xs">Background</Label>
                          <Select
                            value={background}
                            onValueChange={setBackground}
                            disabled={isLoading || model !== 'gpt-image-1'}
                          >
                            <SelectTrigger id="background" className="h-8 text-xs">
                              <SelectValue placeholder="Select background" />
                            </SelectTrigger>
                            <SelectContent>
                              {backgroundOptions.map(option => (
                                <SelectItem key={option.value} value={option.value} className="text-xs">
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {/* Output Format (GPT-image-1 only) */}
                      {model === 'gpt-image-1' && (
                        <div className="space-y-1">
                          <Label htmlFor="output-format" className="text-xs">Output Format</Label>
                          <Select
                            value={outputFormat}
                            onValueChange={setOutputFormat}
                            disabled={isLoading || model !== 'gpt-image-1'}
                          >
                            <SelectTrigger id="output-format" className="h-8 text-xs">
                              <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                            <SelectContent>
                              {outputFormatOptions.map(option => (
                                <SelectItem key={option.value} value={option.value} className="text-xs">
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {/* Response Format (dall-e models only) */}
                      {model !== 'gpt-image-1' && (
                        <div className="space-y-1">
                          <Label htmlFor="response-format" className="text-xs">Response Format</Label>
                          <Select
                            value={responseFormat}
                            onValueChange={setResponseFormat}
                            disabled={isLoading || model === 'gpt-image-1'}
                          >
                            <SelectTrigger id="response-format" className="h-8 text-xs">
                              <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                            <SelectContent>
                              {responseFormatOptions.map(option => (
                                <SelectItem key={option.value} value={option.value} className="text-xs">
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {/* Moderation (GPT-image-1 only) */}
                      {model === 'gpt-image-1' && (
                        <div className="space-y-1">
                          <Label htmlFor="moderation" className="text-xs">Content Moderation</Label>
                          <Select
                            value={moderation}
                            onValueChange={setModeration}
                            disabled={isLoading || model !== 'gpt-image-1'}
                          >
                            <SelectTrigger id="moderation" className="h-8 text-xs">
                              <SelectValue placeholder="Select moderation" />
                            </SelectTrigger>
                            <SelectContent>
                              {moderationOptions.map(option => (
                                <SelectItem key={option.value} value={option.value} className="text-xs">
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {/* Compression Level (GPT-image-1 with WebP/JPEG only) */}
                      {model === 'gpt-image-1' && (outputFormat === 'webp' || outputFormat === 'jpeg') && (
                        <div className="col-span-2 space-y-1">
                          <div className="flex justify-between">
                            <Label htmlFor="compression" className="text-xs">Compression Level: {compressionLevel}%</Label>
                          </div>
                          <Input
                            id="compression"
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={compressionLevel}
                            onChange={(e) => setCompressionLevel(parseInt(e.target.value))}
                            className="w-full"
                            disabled={isLoading || model !== 'gpt-image-1' || (outputFormat !== 'webp' && outputFormat !== 'jpeg')}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Smaller file</span>
                            <span>Higher quality</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground">
                        Note: Some options are model-specific. Changing the model will update available options.
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

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
