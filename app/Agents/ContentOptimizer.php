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
                "Parse the JSON analytics feedback to understand the current content assessment.",
                "Identify the current engagement score and specific areas for improvement from the JSON.",
                "Make strategic changes to address each point in the 'improvements' section of the analytics JSON.",
                "Maintain the core message and brand voice while optimizing.",
                "Enhance elements that will increase engagement (hashtags, calls-to-action, etc.).",
                "Focus on leveraging the identified strengths while improving weak areas."
            ],
            output: [
                "Provide ONLY the complete revised content with all improvements applied.",
                "Do not include any explanations, JSON, or other information outside the optimized content itself.",
                "The output should be the complete, ready-to-post content that addresses all feedback points."
            ]
        );
    }
}
