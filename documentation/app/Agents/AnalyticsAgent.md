# Documentation: AnalyticsAgent.php

Original file: `app/Agents\AnalyticsAgent.php`

# AnalyticsAgent Documentation

## Table of Contents
- [Introduction](#introduction)
- [Methods](#methods)
  - [provider](#provider)
  - [instructions](#instructions)

## Introduction

The `AnalyticsAgent` class is a component of the `fun-with-openai-laravel` project, found in the `App\Agents` namespace. It extends from the `NeuronAI\Agent` class and serves as a dedicated agent for analyzing social media content. Utilizing the OpenAI model, this class focuses on evaluating engagement potential for different platforms, especially tailored for businesses in the hospitality industry, such as hotels and restaurants.

By collecting various pieces of information about the business—its name, type, and description—the class provides structured instructions for analyzing content and produces insights that help improve social media engagement strategies.

## Methods

### provider

```php
protected function provider(): AIProviderInterface
```

#### Purpose

The `provider` method initializes and returns an instance of the OpenAI provider configured to interact with the OpenAI API.

#### Parameters

This method does not take any parameters.

#### Return Value

- Returns an instance of `AIProviderInterface`, specifically an OpenAI implementation.

#### Functionality

- The method retrieves the OpenAI API key and model from the application's configuration files using the `config()` helper function.
- It creates a new instance of the `OpenAI` class with the specified key and model, enabling the agent to perform requests to OpenAI's services for content analysis.

### instructions

```php
public function instructions(): string
```

#### Purpose

The `instructions` method generates a structured prompt that outlines the analytical tasks this agent is designed to perform, tailored to the specific business context.

#### Parameters

This method does not take any parameters.

#### Return Value

- Returns a `string` representation of a `SystemPrompt`, which contains a detailed set of instructions for analyzing content.

#### Functionality

- The method constructs a context-aware prompt by gathering the following configuration values:
  - `business.name`: The name of the business.
  - `business.business_type`: The type of the business (default value is 'hotel_restaurant').
  - `business.description`: A brief description of the business.
  
- It creates a `SystemPrompt` instance with the following sections:

  - **Background**: Provides contextual background about the business and the analytics focus of the agent. 
    - Example statements include the role as a social media analytics agent and the specialization in engagement metrics for the hospitality sector.

  - **Steps**: Outlines the sequential tasks the agent will follow to analyze content, such as:
    1. Analyze input content for a specific platform.
    2. Evaluate content against platform-specific best practices.
    3. Identify strengths and weaknesses of the content.
    4. Suggest improvements based on trends and algorithms.
    5. Predict potential engagement metrics.

  - **Output**: Defines the expected outcome of the analysis, including:
    - A brief analysis of engagement potential.
    - A score for the content on a scale of 1-10.
    - Identification of strengths and areas for improvement.
    - An estimation of potential reach and engagement based on content quality.

This structured approach helps maintain clarity and focus on enhancing social media strategies by leveraging artificial intelligence.

## Conclusion

The `AnalyticsAgent` class is a crucial component for automating and refining social media analysis in the hospitality sector. By leveraging the OpenAI API, it provides valuable insights that can greatly enhance content strategy and engagement, enabling businesses to thrive in a competitive digital landscape.