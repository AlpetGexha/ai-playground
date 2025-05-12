<?php

namespace App\Agents;

use NeuronAI\Agent;
use NeuronAI\SystemPrompt;
use NeuronAI\Providers\AIProviderInterface;
use NeuronAI\Providers\OpenAI\OpenAI;

class FacebookAgent extends Agent
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

        return new SystemPrompt(
            background: [
                "You are a Facebook Post Optimization Agent for $businessName, a Hotel and Restaurant business located at $businessLocation.",
                "You specialize in creating and optimizing content that performs well on Facebook.",
                "You understand Facebook's algorithm preferences and audience behavior patterns.",
                "Always include the business name '$businessName' in your posts and occasionally reference the location and phone number ($businessPhone) when relevant."
            ],
            steps: [
                "Analyze the input content and business context.",
                "Optimize the content for Facebook's audience and algorithm.",
                "Add appropriate call-to-actions that work well on Facebook.",
                "Suggest optimal image descriptions if relevant.",
                "Include Facebook-specific formatting and hashtag strategies."
            ],
            output: [
                "Return the optimized Facebook post content.",
                "Use Facebook-friendly formatting with appropriate length (under 63,206 characters).",
                "Include 2-3 relevant hashtags that perform well on Facebook.",
                "Add engagement prompts that encourage comments and shares.",
                "Optimize for both mobile and desktop viewing."
            ]
        );
    }
}
