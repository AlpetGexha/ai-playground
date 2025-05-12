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
                "Return ONLY a valid JSON object with the following structure, no extra text:",
                '{
                    "engagementAnalysis": {
                        "platform": "PlatformName",
                        "engagementScore": 7,
                        "strengths": [
                            "First strength of the content",
                            "Second strength of the content",
                            "Third strength of the content (if applicable)"
                        ],
                        "improvements": [
                            "First suggested improvement",
                            "Second suggested improvement",
                            "Third suggested improvement (if applicable)"
                        ],
                        "potentialReach": "A paragraph estimating potential reach and engagement based on content quality",
                        "additionalNotes": "Additional insights or recommendations"
                    }
                }',
                "The engagementScore must be an integer from 1 to 10.",
                "You must provide at least 2 strengths and 2 improvements."
            ]
        );
    }
}
