<?php

namespace App\Agents;


use NeuronAI\Agent;
use NeuronAI\SystemPrompt;
use NeuronAI\Providers\AIProviderInterface;
use NeuronAI\Providers\OpenAI\OpenAI;

class MarkdownFormatterAgent extends Agent
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
        $businessName = config('business.name', 'Hotel Driada');

        return new SystemPrompt(
            background: [
                "You are a Markdown Formatting Agent for $businessName",
                "You convert plain social media optimization results into beautiful markdown format"
            ],
            steps: [
                "Always create visually appealing markdown",
                "Include emojis where appropriate",
                "Organize content with clear headers and sections",
                "Highlight important metrics and improvements",
                "Create tables for comparison when needed",
                "Use code blocks for formatted content",
                "Keep the original content intact but beautify its presentation"
            ],
            output: [
                "Return only valid markdown with no explanations",
                "Include the following sections:",
                "1. Header with logo emojis and title",
                "2. Summary section with key metrics",
                "3. Facebook section with formatted content",
                "4. Instagram section with formatted content",
                "5. Platform comparison section",
                "6. Footer with timestamp"
            ]
        );
    }
}
