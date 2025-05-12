# Documentation: FacebookAgent.php

Original file: `app/Agents\FacebookAgent.php`

# FacebookAgent Documentation

## Table of Contents
- [Introduction](#introduction)
- [Method: provider](#method-provider)
- [Method: instructions](#method-instructions)

## Introduction
The `FacebookAgent` class is part of the Agents namespace within a Laravel application. Its primary role is to optimize Facebook posts for a business in the hospitality industry. By leveraging the capabilities of an AI provider (specifically, OpenAI), this agent creates content that adheres to Facebook's algorithm preferences and enhances audience engagement. 

The class configures itself based on parameters defined in the application's configuration files, ensuring that the generated posts maintain consistency with the business's branding and operational details.

## Method: provider

### Purpose
The `provider` method instantiates and returns an AI provider interface, specifically using OpenAI. This method encapsulates the logic necessary for initializing the OpenAI service with the proper API key and model.

### Parameters
None.

### Return Value
Returns an instance of `AIProviderInterface`, specifically configured with the API key and model for OpenAI.

### Functionality
The `provider` method is responsible for retrieving the necessary configuration settings (`key` and `model`) from the Laravel application's configuration files. It then creates an instance of the `OpenAI` class using these properties.

```php
protected function provider(): AIProviderInterface
{
    return new OpenAI(
        key: config('services.openai.key'),
        model: config('services.openai.model', 'gpt-4o'),
    );
}
```

## Method: instructions

### Purpose
The `instructions` method generates a `SystemPrompt` that encapsulates the guiding information and context for optimizing Facebook posts for a specific business. This structured prompt is essential for instructing the AI to create contextually relevant content.

### Parameters
None.

### Return Value
Returns an instance of `SystemPrompt`, which contains background information, step-by-step instructions, and expected output details.

### Functionality
This method constructs a detailed `SystemPrompt` using business-related information defined in the configuration files, such as the business name, location, and phone number. 

1. **Background Information**: Sets the context of the task, which includes:
   - Business name
   - Business type
   - Location
   - Phone number

2. **Steps for Optimization**: Lists sequential actions the AI will take to optimize the content:
   - Analyze input content and context
   - Optimize for Facebook’s audience
   - Suggest CTAs (Call To Action)
   - Recommend image descriptions
   - Address Facebook-specific formatting and hashtags

3. **Output Expectations**: Defines what the AI output should consist of:
   - Optimized content
   - Formatting guidelines
   - Hashtags for engagement
   - Prompts to encourage interaction
   
```php
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
```

### Summary
The `FacebookAgent` class effectively automates the process of creating optimized content for Facebook, which is critical for businesses like hotels and restaurants looking to enhance their online presence. Through the integration of an AI provider, this class provides tailored solutions that can adapt to a business's specific needs and market dynamics.