# Documentation: InstagramAgent.php

Original file: `app/Agents\InstagramAgent.php`

# InstagramAgent Documentation

## Table of Contents
- [Introduction](#introduction)
- [Methods](#methods)
  - [provider](#provider)
  - [instructions](#instructions)

## Introduction
The `InstagramAgent` class is a component of the Laravel application that interacts with the OpenAI API to optimize Instagram posts for a specific business. It extends the functionality of the `Agent` class, which is part of the NeuronAI package. The `InstagramAgent` focuses on generating engaging content tailored to the unique characteristics of the Instagram platform, leveraging key business information such as the business name, location, and Instagram handle.

## Methods

### `provider()`
```php
protected function provider(): AIProviderInterface
```
**Purpose:**  
This method creates an instance of the OpenAI provider configured to interact with the OpenAI API using the application settings.

**Parameters:**  
- None

**Return Values:**  
- Returns an instance of `AIProviderInterface`, specifically an instance of the `OpenAI` class.

**Functionality:**  
This method utilizes configuration data stored in the application to instantiate the `OpenAI` class, which is responsible for making requests to the OpenAI API. It retrieves the API key and model from the configuration files:
- **API Key:** Retrieved from `services.openai.key`.
- **Model:** Retrieved from `services.openai.model`, with a default value of `gpt-4o`. 

### `instructions()`
```php
public function instructions(): string
```
**Purpose:**  
This method constructs a `SystemPrompt`, which provides detailed instructions for the optimization process of Instagram content related to the specified business.

**Parameters:**  
- None

**Return Values:**  
- Returns a string representation of a `SystemPrompt` containing background information, steps for content optimization, and output expectations.

**Functionality:**  
This method assembles a prompt that is tailored to the business's needs by leveraging configuration settings, including:
- **Business Name:** Fetched from `business.name`.
- **Business Location:** Fetched from `business.location`.
- **Business Phone:** Fetched from `business.phone`.
- **Instagram Handle:** Fetched from `business.social_media.instagram`.

The `SystemPrompt` is created with three main components: 

1. **Background**: This includes context about the business and its focus on Instagram content:
   - Describes the role of the agent as an Instagram Post Optimization Agent.
   - Highlights the business's specialization in visually-oriented content.
   - Emphasizes the importance of engagement and discoverability on Instagram.

2. **Steps**: A structured list of actions that the agent should take to optimize content:
   - Analyze content and business context.
   - Optimize the content visually for Instagram.
   - Create engaging captions.
   - Develop a hashtag strategy.
   - Suggest location tags as applicable.

3. **Output**: Specific instructions on the expected results from the agent:
   - Return optimized captions that are concise (ideally between 125-150 characters).
   - Include 10-15 relevant hashtags covering popular, niche, and branded categories.
   - Suggested emojis to enhance visual appeal.
   - A clear call-to-action appropriate for an Instagram audience.

## Conclusion
The `InstagramAgent` class plays a vital role in helping businesses create engaging Instagram content by utilizing AI through the OpenAI provider. By focusing on the unique aspects of the Instagram platform, this class enhances a business's ability to engage with its audience effectively. Through the use of configuration-driven parameters, developers can easily adapt and extend this functionality for different business contexts.