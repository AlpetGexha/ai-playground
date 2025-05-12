import React, { FormEvent, useState } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Send, MessageCircle, ThumbsUp, Flag, Trash2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function SpamIndex() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<{ id: number; text: string; author: string; date: string; }[]>([
    {
      id: 1,
      text: 'This is a great post! I learned a lot from this content.',
      author: 'John Doe',
      date: '10 min ago'
    },
    {
      id: 2,
      text: 'I have a question about this topic. Could you please elaborate more on the second point?',
      author: 'Jane Smith',
      date: '25 min ago'
    }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      setError('Please enter a comment');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('/comment', { comment });


      if (response.data.success) {
        if (response.data.is_spam) {
          // Handle spam comment
          setError(response.data.message || 'Your comment was flagged as spam and cannot be posted.');
        } else {
          // Handle valid comment
          setSuccess(response.data.message || 'The comment is clear, it can be posted!');
          setComments([
            {
              id: comments.length + 1,
              text: comment,
              author: 'You',
              date: 'Just now'
            },
            ...comments
          ]);
          setComment('');
        }
      } else {
        setError(response.data);
        // setError('Failed to submit comment');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head title="AI Comment Moderator" />
      <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <Flag className="text-orange-500 mr-2" size={28} />
            <h1 className="text-3xl font-bold">AI Comment Moderator</h1>
            <Flag className="text-orange-500 ml-2" size={28} />
          </div>
          <p className="text-center text-muted-foreground mb-8">AI-powered spam detection for your comments</p>
          <h2 className="text-2xl font-bold mb-6">Article Title</h2>

          {/* Simulated Article Content */}
          <div className="prose dark:prose-invert mb-8">
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis eget urna ultricies
              accumsan. Proin eget tortor risus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.
            </p>
            <p>
              Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Pellentesque in ipsum id orci porta
              dapibus. Curabitur aliquet quam id dui posuere blandit.
            </p>
          </div>

          {/* Comment Form */}
          <Card className="mb-8 shadow-md">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-xl flex items-center">
                <MessageCircle className="mr-2 h-5 w-5" />
                Leave a Comment
              </CardTitle>
              <CardDescription>
                Join the discussion about this article
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Label htmlFor="comment" className="flex items-center">
                    <MessageCircle className="mr-2" size={16} />
                    Your Comment
                  </Label>
                  <Textarea
                    id="comment"
                    placeholder="Write your comment here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    disabled={isSubmitting}
                    className="resize-none"
                  />
                </div>

                {error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="mt-4 bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    <ThumbsUp className="h-4 w-4" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}
              </CardContent>

              <CardFooter className="border-t border-border pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Publish Comment
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          {/* Comments List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <MessageCircle className="mr-2 text-orange-500" size={20} />
              Comments ({comments.length})
            </h2>

            {comments.map((comment) => (
              <Card key={comment.id} className="shadow-sm">
                <CardHeader className="py-3 px-4 border-b border-border">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{comment.author}</div>
                    <div className="text-xs text-muted-foreground">{comment.date}</div>
                  </div>
                </CardHeader>
                <CardContent className="py-3 px-4">
                  <p>{comment.text}</p>
                </CardContent>
                <CardFooter className="py-2 px-4 border-t border-border flex justify-end">
                  <div className="flex space-x-2 text-muted-foreground text-sm">
                    <button className="hover:text-foreground flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Like
                    </button>
                    <button className="hover:text-foreground flex items-center">
                      <Flag className="h-4 w-4 mr-1" />
                      Report
                    </button>
                    {comment.author === 'You' && (
                      <button className="hover:text-foreground flex items-center text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
