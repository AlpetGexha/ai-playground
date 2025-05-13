import React from 'react';
import { Head } from '@inertiajs/react';
import { Terminal, Share2, Copy, Facebook, Instagram, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function SocialMediaOptimizer() {
    const command = 'php artisan agent:social-optimize';
    
    const copyToClipboard = () => {
        navigator.clipboard.writeText(command);
    };

    return (
        <>
            <Head title="Social Media Optimizer" />
            <div className="p-6 md:p-8 lg:p-10 max-w-6xl mx-auto">
                <div className="mb-8 space-y-4">
                    <div className="flex items-center space-x-4">
                        <Share2 className="h-10 w-10 text-blue-500" />
                        <h1 className="text-3xl font-bold tracking-tight">Social Media Optimization</h1>
                    </div>
                    <p className="text-lg text-muted-foreground">
                        Optimize your content for multiple social media platforms with our specialized AI agents.
                    </p>
                </div>

                <Card className="mb-8 border-2 border-blue-100 dark:border-blue-900">
                    <CardHeader>
                        <CardTitle className="text-xl">Run Social Media Optimizer from Terminal</CardTitle>
                        <CardDescription>
                            Copy and paste this command into your terminal to optimize your content
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
                            The Social Media Optimizer helps tailor your content for Facebook, Instagram, and other platforms.
                        </p>
                    </CardFooter>
                </Card>
                
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Supported Platforms</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Facebook className="h-6 w-6 text-blue-600" />
                                <div>
                                    <CardTitle>Facebook</CardTitle>
                                    <CardDescription>
                                        Optimize for Facebook's algorithm and audience
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-5 space-y-1 text-sm">
                                    <li>Engagement-focused content structuring</li>
                                    <li>Optimal hashtag strategy</li>
                                    <li>Call-to-action optimization</li>
                                    <li>Audience targeting recommendations</li>
                                </ul>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Instagram className="h-6 w-6 text-pink-600" />
                                <div>
                                    <CardTitle>Instagram</CardTitle>
                                    <CardDescription>
                                        Visual-first approach for Instagram users
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-5 space-y-1 text-sm">
                                    <li>Visual content descriptions</li>
                                    <li>Strategic hashtag recommendations</li>
                                    <li>Caption optimization for engagement</li>
                                    <li>Story and feed content differentiation</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <Separator className="my-6" />

                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">Advanced Options</h2>
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Settings className="h-5 w-5" />
                                    <CardTitle>Command Options</CardTitle>
                                </div>
                                <CardDescription>
                                    Customize the optimizer behavior with these options
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                    <div className="space-y-1">
                                        <p className="font-mono text-xs bg-muted px-2 py-1 rounded inline-block">--compact</p>
                                        <p>Use fewer tokens</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-mono text-xs bg-muted px-2 py-1 rounded inline-block">--target=8</p>
                                        <p>Set quality target score (1-10)</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-mono text-xs bg-muted px-2 py-1 rounded inline-block">--attempts=3</p>
                                        <p>Maximum optimization attempts</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-mono text-xs bg-muted px-2 py-1 rounded inline-block">--cache</p>
                                        <p>Use cached results when possible</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-mono text-xs bg-muted px-2 py-1 rounded inline-block">--save</p>
                                        <p>Save results to a file</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-mono text-xs bg-muted px-2 py-1 rounded inline-block">--markdown</p>
                                        <p>Output as beautiful markdown</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
