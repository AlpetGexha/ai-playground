<?php

namespace App\Agents;

use NeuronAI\Agent;
use NeuronAI\SystemPrompt;
use NeuronAI\Providers\AIProviderInterface;
use NeuronAI\Providers\OpenAI\OpenAI;
use NeuronAI\Tools\Tool;
use NeuronAI\Tools\ToolProperty;

class SocialMediaController extends Agent
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

        return new SystemPrompt(
            background: [
                "You are a Social Media Controller Agent for $businessName, a Hotel and Restaurant business located at $businessLocation.",
                "You coordinate between specialized agents to create optimized posts for different social media platforms.",
                "You have access to the business information through the get_business_info tool.",
                "Your goal is to ensure consistent branding while maximizing engagement across platforms."
            ],
            steps: [
                "Understand the user's content request for social media posts.",
                "Delegate content creation to specialized platform agents.",
                "Collect and present optimized content for each platform.",
                "Provide a summary of optimization strategies used."
            ],
            output: [
                "Present the optimized content for each platform in a clear, organized way.",
                "Include brief notes on platform-specific optimizations applied.",
                "Offer suggestions for posting schedule and hashtag strategies."
            ]
        );
    }

    public function tools(): array
    {
        return [
            Tool::make(
                'create_facebook_post',
                'Optimize content for Facebook platform.'
            )->addProperty(
                new ToolProperty(
                    name: 'content',
                    type: 'string',
                    description: 'The base content to optimize for Facebook.',
                    required: true
                )
            )->addProperty(
                new ToolProperty(
                    name: 'business_type',
                    type: 'string',
                    description: 'The type of business (hotel, restaurant, or both).',
                    required: true
                )
            )->setCallable(function (array $inputs) {
                // Extract parameters
                $content = $inputs['content'] ?? '';
                $business_type = $inputs['business_type'] ?? 'hotel_restaurant';

                if (empty($content)) {
                    return "Error: Content parameter is empty";
                }

                // Get the Facebook agent to optimize content
                $agent = FacebookAgent::make();
                $message = new \NeuronAI\Chat\Messages\UserMessage("Optimize this content for Facebook: $content. Business type: $business_type");
                $response = $agent->stream($message);
                $fullResponse = '';
                foreach ($response as $text) {
                    $fullResponse .= $text;
                }
                return $fullResponse;
            }),

            Tool::make(
                'create_instagram_post',
                'Optimize content for Instagram platform.'
            )->addProperty(
                new ToolProperty(
                    name: 'content',
                    type: 'string',
                    description: 'The base content to optimize for Instagram.',
                    required: true
                )
            )->addProperty(
                new ToolProperty(
                    name: 'business_type',
                    type: 'string',
                    description: 'The type of business (hotel, restaurant, or both).',
                    required: true
                )
            )->setCallable(function (array $inputs) {
                // Extract parameters
                $content = $inputs['content'] ?? '';
                $business_type = $inputs['business_type'] ?? 'hotel_restaurant';

                if (empty($content)) {
                    return "Error: Content parameter is empty";
                }

                // Get the Instagram agent to optimize content
                $agent = InstagramAgent::make();
                $message = new \NeuronAI\Chat\Messages\UserMessage("Optimize this content for Instagram: $content. Business type: $business_type");
                $response = $agent->stream($message);
                $fullResponse = '';
                foreach ($response as $text) {
                    $fullResponse .= $text;
                }
                return $fullResponse;
            }),
            Tool::make(
                'analyze_content',
                'Analyze content for engagement potential.'
            )->addProperty(
                new ToolProperty(
                    name: 'content',
                    type: 'string',
                    description: 'The content to analyze.',
                    required: true
                )
            )->addProperty(
                new ToolProperty(
                    name: 'platform',
                    type: 'string',
                    description: 'The platform for analysis (facebook, instagram).',
                    required: true
                )
            )->setCallable(function (array $inputs) {
                // Extract parameters
                $content = $inputs['content'] ?? '';
                $platform = $inputs['platform'] ?? 'facebook';

                if (empty($content)) {
                    return "Error: Content parameter is empty";
                }

                // Get the Analytics agent to analyze content
                $agent = AnalyticsAgent::make();
                $message = new \NeuronAI\Chat\Messages\UserMessage("Analyze this $platform content for engagement potential: $content");
                $response = $agent->stream($message);
                $fullResponse = '';
                foreach ($response as $text) {
                    $fullResponse .= $text;
                }
                return $fullResponse;
            }),

            Tool::make(
                'get_business_info',
                'Get information about the business.'
            )->setCallable(function (array $inputs = []) {
                $businessInfo = config('business');
                return json_encode($businessInfo, JSON_PRETTY_PRINT);
            })
        ];
    }
}
