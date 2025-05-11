import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft, Grid, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from '@inertiajs/react';

interface Image {
  id: string;
  url: string;
  prompt: string;
  date: string;
  timestamp: string;
}

interface GalleryProps {
  images: Image[];
}

export default function Gallery({ images }: GalleryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  // Filter images based on search term
  const filteredImages = images.filter(image =>
    image.prompt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head title="AI Image Gallery" />
      <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
        {/* Header with navigation */}
        <div className="max-w-7xl mx-auto mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">AI Image Gallery</h1>
            <p className="text-muted-foreground">Browse all your previously generated images</p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button variant="outline" asChild>
              <Link href="/image">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Generator
              </Link>
            </Button>
          </div>
        </div>

        {/* Search and filter */}
        <div className="max-w-7xl mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search images by prompt..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Showing {filteredImages.length} of {images.length} images
          </div>
        </div>

        {selectedImage ? (
          // Image detail view
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-border">
              <CardHeader className="border-b border-border">
                <CardTitle className="text-xl font-semibold text-foreground">{selectedImage.prompt}</CardTitle>
                <p className="text-sm text-muted-foreground">{selectedImage.date}</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative w-full">
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.prompt}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t border-border flex flex-col sm:flex-row gap-2 p-4">
                <Button
                  variant="secondary"
                  className="w-full sm:w-auto hover:bg-muted"
                  asChild
                >
                  <a href={selectedImage.url} target="_blank" download={`ai-image-${selectedImage.id}.png`}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Image
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: selectedImage.prompt,
                        text: 'Check out this image I created with AI!',
                        url: selectedImage.url
                      })
                    } else {
                      navigator.clipboard.writeText(selectedImage.url);
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
                  variant="ghost"
                  className="sm:ml-auto"
                  onClick={() => setSelectedImage(null)}
                >
                  Back to Gallery
                </Button>
              </CardFooter>
            </Card>
          </div>
        ) : (
          // Gallery grid view
          <div className="max-w-7xl mx-auto">
            {filteredImages.length === 0 ? (
              <Card className="shadow-lg border-border text-center p-8">
                <div className="flex flex-col items-center justify-center py-12">
                  <Grid className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-1">No images found</h3>
                  <p className="text-muted-foreground mb-4">
                    {images.length === 0
                      ? "You haven't generated any images yet."
                      : "No images match your search criteria."}
                  </p>
                  {images.length === 0 && (
                    <Button asChild>
                      <Link href="/image">Generate Your First Image</Link>
                    </Button>
                  )}
                  {images.length > 0 && searchTerm && (
                    <Button variant="outline" onClick={() => setSearchTerm('')}>
                      Clear Search
                    </Button>
                  )}
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((image) => (
                  <Card
                    key={image.id}
                    className="shadow-md border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.prompt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <CardFooter className="p-3 border-t border-border">
                      <div className="w-full">
                        <p className="font-medium text-sm truncate text-foreground">
                          {image.prompt.length > 60 ? `${image.prompt.substring(0, 60)}...` : image.prompt}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {image.date}
                        </p>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
