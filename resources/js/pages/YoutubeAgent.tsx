import React from 'react';
import { Head } from '@inertiajs/react';
import { Terminal, Youtube, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function YoutubeAgent() {
    const command = 'php artisan agent:youtube';

    const copyToClipboard = () => {
        navigator.clipboard.writeText(command);
    };

    return (
        <>
            <Head title="YouTube Agent" />
            <div className="p-6 md:p-8 lg:p-10 max-w-6xl mx-auto">
                <div className="mb-8 space-y-4">
                    <div className="flex items-center space-x-4">
                        <Youtube className="h-10 w-10 text-red-500" />
                        <h1 className="text-3xl font-bold tracking-tight">YouTube Optimization Agent</h1>
                    </div>
                    <p className="text-lg text-muted-foreground">
                        Optimize your content for YouTube to maximize engagement, views, and channel growth.
                    </p>
                </div>

                <Card className="mb-8 border-2 border-red-100 dark:border-red-900">
                    <CardHeader>
                        <CardTitle className="text-xl">Run YouTube Agent from Terminal</CardTitle>
                        <CardDescription>
                            Copy and paste this command into your terminal to run the YouTube optimization agent
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative">
                            <div className="bg-muted rounded-md p-4 font-mono text-sm flex items-center">
                                <Terminal className="mr-2 h-4 w-4" />
                                <code>{command}</code>
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                className="absolute right-4 top-3 h-7 w-7"
                                onClick={copyToClipboard}
                            >
                                <Copy className="h-3.5 w-3.5" />
                                <span className="sr-only">Copy command</span>
                            </Button>
                        </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <p className="text-sm text-muted-foreground">
                            The YouTube Agent will help you optimize titles, descriptions, tags, thumbnails, and content strategy.
                        </p>
                    </CardFooter>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Features</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Search-optimized title generation</li>
                                <li>Engaging description templates</li>
                                <li>Strategic keyword suggestions</li>
                                <li>Content structure recommendations</li>
                                <li>Thumbnail design tips</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Coming Soon</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Channel performance analytics</li>
                                <li>Competitor analysis</li>
                                <li>Script generation</li>
                                <li>Thumbnail mockup creation</li>
                                <li>A/B testing recommendations</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
