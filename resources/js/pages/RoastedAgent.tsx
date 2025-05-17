import React from 'react';
import { Head } from '@inertiajs/react';
import { Terminal, Flame, Copy, MessageCircleOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function RoastedAgent() {
    const command = 'php artisan agent:r-chat';

    const copyToClipboard = () => {
        navigator.clipboard.writeText(command);
    };

    return (
        <>
            <Head title="Roasted Agent" />
            <div className="p-6 md:p-8 lg:p-10 max-w-6xl mx-auto">
                <div className="mb-8 space-y-4">
                    <div className="flex items-center space-x-4">
                        <Flame className="h-10 w-10 text-orange-500" />
                        <h1 className="text-3xl font-bold tracking-tight">Roasted Chat Agent</h1>
                    </div>
                    <p className="text-lg text-muted-foreground">
                        Experience humorous, light-hearted roasts with our AI roasting agent.
                    </p>
                </div>

                <Card className="mb-8 border-2 border-orange-100 dark:border-orange-900">
                    <CardHeader>
                        <CardTitle className="text-xl">Run Roasted Agent from Terminal</CardTitle>
                        <CardDescription>
                            Copy and paste this command into your terminal to start the roasted chat experience
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
                            The Roasted Chat Agent provides humorous interactions while keeping content appropriate and fun.
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
                                <li>Personalized humorous roasts</li>
                                <li>Witty comebacks and responses</li>
                                <li>Comedy style selection</li>
                                <li>Customizable intensity levels</li>
                                <li>Always keeps content appropriate</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle>Important Note</CardTitle>
                            <MessageCircleOff className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                All roasts are meant to be light-hearted and fun. The agent is designed to avoid truly offensive content and maintains appropriate boundaries. If you ever feel uncomfortable, you can end the interaction at any time.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
