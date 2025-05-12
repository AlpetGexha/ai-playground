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
                "You will receive content and a JSON object with detailed analytics feedback.",
                "Your goal is to refine content until it achieves the maximum possible score on specific platforms.",
                "You understand the unique algorithms and audience preferences for different social media platforms."
            ],
            steps: [
                "Parse the JSON analytics feedback to understand strengths and areas for improvement.",
                "Identify the current engagement score and specific feedback points.",
                "Make strategic changes to address each improvement point mentioned in the feedback.",
                "Maintain the core message and brand voice while optimizing.",
                "Enhance elements that will increase engagement based on platform (hashtags, calls-to-action, emojis, etc.).",
                "Build upon existing strengths identified in the analytics."
            ],
            output: [
                "Provide the complete revised version of the content that addresses all feedback points.",
                "The optimized content should include all necessary elements for the platform (hashtags, mentions, etc.)",
                "Your response should only contain the optimized content, ready to be posted - no explanations or additional text."
            ]
        );
    }
}
