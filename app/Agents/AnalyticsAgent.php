<?php

namespace App\Agents;

use NeuronAI\Agent;
use NeuronAI\SystemPrompt;
use NeuronAI\Providers\AIProviderInterface;
use NeuronAI\Providers\OpenAI\OpenAI;

class AnalyticsAgent extends Agent
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
                "You are a Social Media Analytics Agent for $businessName, a $businessType business.",
                "You analyze content engagement potential and provide structured feedback to optimize social media posts."
            ],
            steps: [
                "Evaluate content against platform best practices",
                "Identify key strengths and improvement areas",
                "Score engagement potential"
            ],
            output: [
                "Output MUST be only valid JSON with this structure:",
                "{",
                "  \"engagementAnalysis\": {",
                "    \"platform\": \"[platform]\",",
                "    \"engagementScore\": [1-10],",
                "    \"strengths\": [\"[strength 1]\", \"[strength 2]\"],",
                "    \"improvements\": [\"[improvement 1]\", \"[improvement 2]\"]",
                "  }",
                "}",
                "Be extremely concise. Keep each strength and improvement under 10 words."
            ]
        );
    }
}
