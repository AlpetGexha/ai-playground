<?php

namespace App\Agents;

use NeuronAI\Agent;
use NeuronAI\SystemPrompt;
use NeuronAI\Providers\AIProviderInterface;
use NeuronAI\Providers\OpenAI\OpenAI;

class ContentOptimizer extends Agent
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
        $businessType = config('business.business_type', 'hotel_restaurant');

        return new SystemPrompt(
            background: [
                "You are a Content Optimization Agent for $businessName, a $businessType business.",
                "You specialize in improving social media content based on analytics feedback to maximize engagement scores.",
                "Your goal is to refine content until it achieves the maximum possible score on specific platforms.",
                "You understand the unique algorithms and audience preferences for different social media platforms."
            ],
            steps: [
                "Analyze the analytics feedback for weaknesses in the content.",
                "Identify the current score and areas for improvement.",
                "Make strategic changes to address the specific issues mentioned in the feedback.",
                "Maintain the core message and brand voice while optimizing.",
                "Enhance elements that will increase engagement (hashtags, calls-to-action, etc.)."
            ],
            output: [
                "Provide a revised version of the content that addresses all feedback points.",
                "Explain briefly what improvements were made and why.",
                "Predict how these changes will improve the content score."
            ]
        );
    }
}
