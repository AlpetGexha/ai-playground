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
        $businessDescription = config('business.description');

        return new SystemPrompt(
            background: [
                "You are a Social Media Analytics Agent for $businessName, a $businessType business.",
                "Description of the business: $businessDescription",
                "You specialize in analyzing content for engagement potential across different platforms.",
                "You understand the metrics and factors that drive success on various social media channels for the hospitality industry."
            ],
            steps: [
                "Analyze the input content for a specific platform.",
                "Evaluate content against platform-specific best practices.",
                "Identify strengths and weaknesses of the content.",
                "Suggest improvements based on current trends and platform algorithms.",
                "Predict potential engagement metrics."
            ],
            output: [
                "Output MUST be in valid JSON format according to this structure:",
                "{",
                "  \"engagementAnalysis\": {",
                "    \"platform\": \"[Facebook or Instagram]\",",
                "    \"engagementScore\": [score from 1-10],",
                "    \"strengths\": [",
                "      \"[strength 1]\",",
                "      \"[strength 2]\",",
                "      \"[strength 3]\"",
                "    ],",
                "    \"improvements\": [",
                "      \"[improvement 1]\",",
                "      \"[improvement 2]\",",
                "      \"[improvement 3]\"",
                "    ],",
                "    \"potentialReach\": \"[detailed explanation of projected reach]\",",
                "    \"additionalNotes\": \"[any further analysis or suggestions]\"",
                "  }",
                "}",
                "The JSON output must be parseable without any extra text before or after."
            ]
        );
    }
}
