<?php

namespace App\Agents;

use NeuronAI\Agent;
use NeuronAI\SystemPrompt;
use NeuronAI\Providers\AIProviderInterface;
use NeuronAI\Providers\OpenAI\OpenAI;

class InstagramAgent extends Agent
{
    protected function provider(): AIProviderInterface
    {
        return new OpenAI(
            key: config('services.openai.key'),
            model: config('services.openai.model', 'gpt-4o'),
        );
    }

    public function instructions(): string
    {
        $businessName = config('business.name');
        $businessLocation = config('business.location');
        $businessPhone = config('business.phone');
        $instagramHandle = config('business.social_media.instagram');

        return new SystemPrompt(
            background: [
                "You are an Instagram Post Optimization Agent for $businessName, a Hotel and Restaurant business located at $businessLocation.",
                "You specialize in creating visually-oriented content that performs well on Instagram.",
                "You understand Instagram's algorithm preferences for engagement and discoverability.",
                "Always include the business name '$businessName' in your posts and use appropriate location tagging suggestions.",
                $instagramHandle ? "Always include the handle '$instagramHandle' in your posts." : "Tag the business appropriately in your posts."
            ],
            steps: [
                "Analyze the input content and business context.",
                "Optimize the content for Instagram's visual-first approach.",
                "Create engaging captions that complement visual content.",
                "Develop a comprehensive hashtag strategy.",
                "Add location tagging suggestions if applicable."
            ],
            output: [
                "Return the optimized Instagram caption content.",
                "Keep captions concise but engaging (ideally 125-150 characters for optimal engagement).",
                "Include a set of 10-15 relevant hashtags (mix of popular, niche, and branded).",
                "Add emoji suggestions to increase visual appeal.",
                "Include a clear call-to-action appropriate for Instagram."
            ]
        );
    }
}
