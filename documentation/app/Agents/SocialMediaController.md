# Documentation: SocialMediaController.php

Original file: `app/Agents\SocialMediaController.php`

# SocialMediaController Documentation

## Table of Contents
- [Introduction](#introduction)
- [Methods](#methods)
  - [provider](#provider)
  - [instructions](#instructions)
  - [tools](#tools)
    - [create_facebook_post](#create_facebook_post)
    - [create_instagram_post](#create_instagram_post)
    - [analyze_content](#analyze_content)
    - [get_business_info](#get_business_info)
  
## Introduction
The `SocialMediaController` class is a key component of the Laravel application, particularly designed to act as an intermediary for managing social media interactions related to a hotel and restaurant business. It extends the `Agent` class from the NeuronAI package and coordinates between different specialized agents to optimize content for various social media platforms. The class is configured to access business-specific information and utilizes AI models for generating engaging social media posts. 

The primary functions of the `SocialMediaController` revolve around generating instructions, managing tools for content creation, and ensuring that the output maintains a consistent brand representation across platforms.

## Methods

### provider
#### Purpose
Returns an instance of the OpenAI provider configured with the appropriate API key and model.

#### Parameters
None

#### Return Values
- Returns an instance of `AIProviderInterface`, specifically an instance of `OpenAI`.

#### Functionality
```php
protected function provider(): AIProviderInterface
{
    return new OpenAI(
        key: config('services.openai.key'),
        model: config('services.openai.model', 'gpt-4o'),
    );
}
```
This method retrieves the OpenAI API key and model from the configuration files, enabling the application to communicate with the OpenAI API for processing requests related to social media content generation.

### instructions
#### Purpose
Provides the system prompt that guides the behavior of the Social Media Controller AI agent.

#### Parameters
None

#### Return Values
- Returns a `SystemPrompt` instance which outlines the context and operational steps for the agent.

#### Functionality
```php
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
```
This method sets the foundational context for the Social Media Controller agent. It specifies the background, operational steps, and output requirements to ensure that the agent performs effectively according to user requests.

### tools
#### Purpose
Defines various tools available to the `SocialMediaController` for optimizing content across social media platforms.

#### Parameters
None

#### Return Values
- Returns an array of `Tool` objects, each representing a specific tool for content optimization.

#### Functionality
```php
public function tools(): array
{
    return [
        // Tool definitions...
    ];
}
```
This method constructs an array of available tools, each accomplished with specific configurations for optimizing content on platforms such as Facebook and Instagram, as well as analyzing content for engagement potential.

#### create_facebook_post
##### Purpose
Optimizes content specifically for the Facebook platform.

##### Parameters
- **content** (string): The base content to optimize for Facebook (required).
- **business_type** (string): The type of business (hotel, restaurant, or both; required).

##### Return Values
- Returns optimized content for Facebook or an error message if content parameter is empty.

##### Functionality
```php
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
    // Content optimization logic...
})
```
This tool utilizes a Facebook-specific agent to optimize user-provided content by sending a message to the `FacebookAgent` for processing. The optimized content is then returned to the user.

#### create_instagram_post
##### Purpose
Optimizes content specifically for the Instagram platform.

##### Parameters
- **content** (string): The base content to optimize for Instagram (required).
- **business_type** (string): The type of business (hotel, restaurant, or both; required).

##### Return Values
- Returns optimized content for Instagram or an error message if the content parameter is empty.

##### Functionality
```php
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
    // Content optimization logic...
})
```
Similar to the Facebook tool, this functionality engages the `InstagramAgent` to refine the content for Instagram's specific requirements and audience engagement strategies.

#### analyze_content
##### Purpose
Analyzes given content for potential engagement based on specified social media platforms.

##### Parameters
- **content** (string): The content to analyze (required).
- **platform** (string): The platform to perform the analysis on (facebook, instagram; required).

##### Return Values
- Returns the analysis results or an error message if the content parameter is empty.

##### Functionality
```php
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
    // Content analysis logic...
})
```
This tool delegates the analysis task to the `AnalyticsAgent`, sending the relevant content for engagement metrics evaluation, benefiting future content strategy decisions