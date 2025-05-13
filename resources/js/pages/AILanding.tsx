import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Bot,
    Sparkles,
    MessageSquare,
    Image as ImageIcon,
    PenTool,
    Heart,
    Flame,
    TerminalSquare,
    MessageCircleQuestion,
    Cpu,
    ArrowRight,
    Rows3,
    BookOpen,
    Instagram,
    Facebook,
    Youtube
} from 'lucide-react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function AILanding() {
    const [activeFeature, setActiveFeature] = useState<string | null>(null);

    const handleCardHover = (feature: string | null) => {
        setActiveFeature(feature);
    };

    return (
        <>
            <Head title="AI Playground - All Your AI Tools">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen flex-col bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                {/* Hero Section */}
                <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 px-6">
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/70 via-transparent to-blue-50/70 dark:from-purple-950/20 dark:to-blue-950/20"></div>
                        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-100/30 to-transparent dark:from-purple-900/10"></div>
                    </div>

                    {/* Floating sparkles effect */}
                    <div className="absolute inset-0 -z-5">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute animate-pulse text-purple-300 dark:text-purple-600"
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    animationDuration: `${3 + Math.random() * 7}s`,
                                    opacity: Math.random() * 0.5 + 0.3
                                }}
                            >
                                <Sparkles size={Math.random() * 10 + 10} />
                            </div>
                        ))}
                    </div>

                    <div className="container mx-auto max-w-4xl text-center">
                        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full text-sm font-medium bg-[#F5F5F3] text-[#2D2D2D] dark:bg-[#1E1E1E] dark:text-[#D1D1D1]">
                            <Sparkles size={16} className="mr-2 text-purple-500" />
                            <span>Powered by OpenAI and Laravel</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                            Your AI Playground
                        </h1>

                        <p className="text-lg md:text-xl text-[#66635c] dark:text-[#A1A09A] mb-8 md:mb-10 max-w-2xl mx-auto">
                            Explore the power of artificial intelligence with our suite of creative and practical AI tools.
                            Generate images, write poems, chat with AI assistants, and much more! ✨
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300 transform hover:scale-105">
                                <Link href="/dashboard">
                                    Get Started
                                    <ArrowRight size={18} className="ml-2" />
                                </Link>
                            </Button>
                            <Button size="lg" asChild variant="outline" className="backdrop-blur-sm border-2 transition-all duration-300 transform hover:scale-105">
                                <Link href="#features">
                                    Explore Features
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20 px-6 bg-white dark:bg-[#111]">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Discover Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">AI Tools</span>
                            </h2>
                            <p className="text-[#66635c] dark:text-[#A1A09A] max-w-2xl mx-auto">
                                From creative writing to practical assistance, we've built a collection of powerful AI tools to enhance your digital experience.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Chat AI */}
                            <Card
                                className={`overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 ${activeFeature === 'chat' ? 'border-purple-300 dark:border-purple-800' : ''}`}
                                onMouseEnter={() => handleCardHover('chat')}
                                onMouseLeave={() => handleCardHover(null)}
                            >
                                <CardHeader className="pb-3">
                                    <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-3">
                                        <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <CardTitle>AI Chat Assistant</CardTitle>
                                    <CardDescription>
                                        Interactive chat with AI that can create todos and assist with tasks
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="text-sm text-[#66635c] dark:text-[#A1A09A]">
                                    <p>Have natural conversations with our AI assistant that can help manage your todos. Ask questions, get information, or just chat!</p>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild variant="ghost" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 p-0">
                                        <Link href="/chat" className="flex items-center">
                                            Try it <ArrowRight size={14} className="ml-1" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>

                            {/* Image Generator */}
                            <Card
                                className={`overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30 ${activeFeature === 'image' ? 'border-blue-300 dark:border-blue-800' : ''}`}
                                onMouseEnter={() => handleCardHover('image')}
                                onMouseLeave={() => handleCardHover(null)}
                            >
                                <CardHeader className="pb-3">
                                    <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
                                        <ImageIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <CardTitle>Image Generator</CardTitle>
                                    <CardDescription>
                                        Create stunning images from text descriptions
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="text-sm text-[#66635c] dark:text-[#A1A09A]">
                                    <p>Transform your ideas into beautiful images with our AI image generator powered by DALL-E. Just describe what you want to see!</p>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild variant="ghost" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-0">
                                        <Link href="/image" className="flex items-center">
                                            Try it <ArrowRight size={14} className="ml-1" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>

                            {/* Poem Generator */}
                            <Card
                                className={`overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-pink-200/50 dark:hover:shadow-pink-900/30 ${activeFeature === 'poem' ? 'border-pink-300 dark:border-pink-800' : ''}`}
                                onMouseEnter={() => handleCardHover('poem')}
                                onMouseLeave={() => handleCardHover(null)}
                            >
                                <CardHeader className="pb-3">
                                    <div className="w-12 h-12 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-3">
                                        <BookOpen className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                                    </div>
                                    <CardTitle>Poem Generator</CardTitle>
                                    <CardDescription>
                                        Create beautiful poems on any topic or theme
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="text-sm text-[#66635c] dark:text-[#A1A09A]">
                                    <p>Let AI craft elegant poems based on your prompts. Perfect for creative inspiration, special occasions, or just for fun!</p>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild variant="ghost" className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 p-0">
                                        <Link href={route('poem.index')} className="flex items-center">
                                            Try it <ArrowRight size={14} className="ml-1" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>

                            {/* Roast Generator */}
                            <Card
                                className={`overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-orange-200/50 dark:hover:shadow-orange-900/30 ${activeFeature === 'roast' ? 'border-orange-300 dark:border-orange-800' : ''}`}
                                onMouseEnter={() => handleCardHover('roast')}
                                onMouseLeave={() => handleCardHover(null)}
                            >
                                <CardHeader className="pb-3">
                                    <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-3">
                                        <Flame className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <CardTitle>Roast Generator</CardTitle>
                                    <CardDescription>
                                        Humorous roasts with text-to-speech capability
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="text-sm text-[#66635c] dark:text-[#A1A09A]">
                                    <p>Get hilariously savage roasts with our AI roast generator, complete with voice output. Great for parties and friendly banter!</p>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild variant="ghost" className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 p-0">
                                        <Link href={route('roast.index')} className="flex items-center">
                                            Try it <ArrowRight size={14} className="ml-1" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>

                            {/* Love Letter */}
                            <Card
                                className={`overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-red-200/50 dark:hover:shadow-red-900/30 ${activeFeature === 'love' ? 'border-red-300 dark:border-red-800' : ''}`}
                                onMouseEnter={() => handleCardHover('love')}
                                onMouseLeave={() => handleCardHover(null)}
                            >
                                <CardHeader className="pb-3">
                                    <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-3">
                                        <Heart className="h-6 w-6 text-red-600 dark:text-red-400" />
                                    </div>
                                    <CardTitle>Love Letter Generator</CardTitle>
                                    <CardDescription>
                                        Create romantic letters tailored to your relationship
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="text-sm text-[#66635c] dark:text-[#A1A09A]">
                                    <p>Express your feelings with beautifully crafted love letters. Choose tone, length, and personalized details for your special someone.</p>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild variant="ghost" className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-0">
                                        <Link href={route('loveletter.index')} className="flex items-center">
                                            Try it <ArrowRight size={14} className="ml-1" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>

                            {/* Comment Validator */}
                            <Card
                                className={`overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-green-200/50 dark:hover:shadow-green-900/30 ${activeFeature === 'comment' ? 'border-green-300 dark:border-green-800' : ''}`}
                                onMouseEnter={() => handleCardHover('comment')}
                                onMouseLeave={() => handleCardHover(null)}
                            >
                                <CardHeader className="pb-3">
                                    <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3">
                                        <MessageCircleQuestion className="h-6 w-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <CardTitle>Comment Validator</CardTitle>
                                    <CardDescription>
                                        AI-powered spam detection for comments
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="text-sm text-[#66635c] dark:text-[#A1A09A]">
                                    <p>Keep your content clean with our AI spam detector. It analyzes comments to help maintain a positive, spam-free environment.</p>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild variant="ghost" className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 p-0">
                                        <Link href="/comment" className="flex items-center">
                                            Try it <ArrowRight size={14} className="ml-1" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Advanced AI Section */}
                <section className="py-20 px-6 bg-gradient-to-b from-[#F5F5F3] to-white dark:from-[#111] dark:to-[#0a0a0a]">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Advanced <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">AI Agents</span>
                            </h2>
                            <p className="text-[#66635c] dark:text-[#A1A09A] max-w-2xl mx-auto">
                                Our specialized AI agents provide industry-specific solutions for optimizing your content across platforms.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-[#171717] border border-[#E3E3E0] dark:border-[#232323] shadow-sm">
                                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                                    <Facebook className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Facebook Agent</h3>
                                <p className="text-[#66635c] dark:text-[#A1A09A]">
                                    Optimize your content specifically for Facebook's audience and algorithm for maximum engagement.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-[#171717] border border-[#E3E3E0] dark:border-[#232323] shadow-sm">
                                <div className="w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center mb-4">
                                    <Instagram className="h-8 w-8 text-pink-600 dark:text-pink-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Instagram Agent</h3>
                                <p className="text-[#66635c] dark:text-[#A1A09A]">
                                    Create visually compelling captions and content strategies tailored for Instagram's visual platform.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-[#171717] border border-[#E3E3E0] dark:border-[#232323] shadow-sm">
                                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
                                    <Youtube className="h-8 w-8 text-red-600 dark:text-red-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">YouTube Agent</h3>
                                <p className="text-[#66635c] dark:text-[#A1A09A]">
                                    Generate video ideas, descriptions, and scripts optimized for YouTube's search and recommendation system.
                                </p>
                            </div>
                        </div>

                        <div className="mt-16 text-center">
                            <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                                <Link href="/dashboard">
                                    Explore All AI Tools
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="py-20 px-6 bg-white dark:bg-[#111]">
                    <div className="container mx-auto max-w-5xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                How Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">AI Works</span>
                            </h2>
                            <p className="text-[#66635c] dark:text-[#A1A09A] max-w-2xl mx-auto">
                                Powerful technology, simple to use. Here's how we bring AI to your fingertips.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="relative">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 relative z-10">
                                        <span className="text-xl font-bold text-purple-600 dark:text-purple-400">1</span>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">Choose Your Tool</h3>
                                    <p className="text-[#66635c] dark:text-[#A1A09A]">
                                        Select from our variety of specialized AI tools based on what you want to create.
                                    </p>
                                </div>
                                <div className="hidden md:block absolute top-7 left-full w-full h-0.5 bg-gradient-to-r from-purple-300 to-blue-300 dark:from-purple-700 dark:to-blue-700 transform -translate-x-4"></div>
                            </div>

                            <div className="relative">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 relative z-10">
                                        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">2</span>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">Provide Input</h3>
                                    <p className="text-[#66635c] dark:text-[#A1A09A]">
                                        Enter your prompt, upload relevant files, or describe what you'd like the AI to create.
                                    </p>
                                </div>
                                <div className="hidden md:block absolute top-7 left-full w-full h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 dark:from-blue-700 dark:to-purple-700 transform -translate-x-4"></div>
                            </div>

                            <div className="relative">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 relative z-10">
                                        <span className="text-xl font-bold text-purple-600 dark:text-purple-400">3</span>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">Get Results</h3>
                                    <p className="text-[#66635c] dark:text-[#A1A09A]">
                                        Receive your AI-generated content instantly, ready to use or further customize.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30">
                    <div className="container mx-auto max-w-4xl text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Experience the <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">Power of AI</span>?
                        </h2>
                        <p className="text-lg text-[#66635c] dark:text-[#A1A09A] mb-8 max-w-2xl mx-auto">
                            Start creating amazing content, get help with tasks, or simply have fun exploring what AI can do for you.
                        </p>
                        <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8">
                            <Link href="/dashboard">
                                Get Started Now
                            </Link>
                        </Button>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-10 px-6 bg-[#F5F5F3] dark:bg-[#0F0F0F] border-t border-[#E3E3E0] dark:border-[#232323]">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Bot size={24} className="text-purple-600 dark:text-purple-400" />
                                    <span className="text-xl font-semibold">AI Playground</span>
                                </div>
                                <p className="text-[#66635c] dark:text-[#A1A09A] max-w-md">
                                    A collection of powerful AI tools to enhance your creativity and productivity.
                                </p>
                            </div>
                            <div className="flex flex-col md:flex-row md:justify-end gap-6">
                                <div>
                                    <h3 className="font-semibold mb-3">Quick Links</h3>
                                    <ul className="space-y-2">
                                        <li><Link href="/dashboard" className="text-[#66635c] dark:text-[#A1A09A] hover:text-[#2D2D2D] dark:hover:text-white">Dashboard</Link></li>
                                        <li><Link href="/chat" className="text-[#66635c] dark:text-[#A1A09A] hover:text-[#2D2D2D] dark:hover:text-white">AI Chat</Link></li>
                                        <li><Link href="/image" className="text-[#66635c] dark:text-[#A1A09A] hover:text-[#2D2D2D] dark:hover:text-white">Image Generator</Link></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-3">Tools</h3>
                                    <ul className="space-y-2">
                                        <li><Link href={route('poem.index')} className="text-[#66635c] dark:text-[#A1A09A] hover:text-[#2D2D2D] dark:hover:text-white">Poem Generator</Link></li>
                                        <li><Link href={route('roast.index')} className="text-[#66635c] dark:text-[#A1A09A] hover:text-[#2D2D2D] dark:hover:text-white">Roast Generator</Link></li>
                                        <li><Link href={route('loveletter.index')} className="text-[#66635c] dark:text-[#A1A09A] hover:text-[#2D2D2D] dark:hover:text-white">Love Letters</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <Separator className="my-8" />
                        <div className="text-center text-[#66635c] dark:text-[#A1A09A] text-sm">
                            © {new Date().getFullYear()} AI Playground. All rights reserved. by Alpet Gexha
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
