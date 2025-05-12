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
                "Content Optimization Agent for $businessName, a $businessType business.",
                "Improve social media content based on analytics to maximize engagement scores."
            ],
            steps: [
                "Parse analytics feedback",
                "Address improvement points",
                "Maintain core message while enhancing engagement elements"
            ],
            output: [
                "Provide ONLY the complete revised content. No explanations or other text."
            ]
        );
    }
}
