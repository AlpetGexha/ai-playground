# Documentation: YoutubeAgent.php

Original file: `app/Agents\YoutubeAgent.php`

# YouTubeAgent Documentation

## Table of Contents
- [Introduction](#introduction)
- [Methods](#methods)
  - [provider()](#provider)
  - [instructions()](#instructions)

## Introduction
The `YouTubeAgent` class is part of the `App\Agents` namespace within a Laravel application designed to leverage AI technologies for generating summaries of YouTube videos. This class inherits from the `Agent` base class and implements functionality specific to processing YouTube content by utilizing the OpenAI interface. 

The primary goal of the `YouTubeAgent` is to automate the process of summarizing YouTube videos, thus providing users with concise information conveyed in the videos without them needing to watch the entire content. This agent employs OpenAI's capabilities to extract relevant information and format it effectively.

## Methods

### provider()
```php
protected function provider(): AIProviderInterface
```

#### Purpose
The `provider` method is responsible for instantiating and returning an instance of an AI provider that adheres to the `AIProviderInterface`. In this case, it initializes the OpenAI provider.

#### Parameters
- This method does not accept any parameters.

#### Return Values
- `AIProviderInterface`: An instance of the `OpenAI` provider configured with the appropriate API key and model.

#### Functionality
- The method retrieves configuration values for the OpenAI API key and the model directly from the Laravel configuration files (specifically from the `services` configuration).
- It returns an instance of the `OpenAI` class using the retrieved settings to ensure the agent can utilize OpenAI’s services for generating video summaries.

### instructions()
```php
public function instructions(): string
```

#### Purpose
The `instructions` method defines the operating instructions for the YouTube agent, outlining its purpose and the steps it should follow to achieve its functionality.

#### Parameters
- This method does not accept any parameters.

#### Return Values
- `string`: A formatted instance of `SystemPrompt`, which describes the behavior and tasks of the agent.

#### Functionality
- The method constructs a `SystemPrompt` object that includes:
  - **Background**: A brief statement defining the agent's specialization, which in this case is in writing YouTube video summaries.
  - **Steps**: A sequence of tasks that the agent is required to follow:
    1. Acquire the URL of a YouTube video, or prompt the user to provide one.
    2. Utilize available tools to extract the video's transcription.
    3. Write a summary of the video content.
  - **Output**: Detailed instructions on how to format the summary:
    - The summary itself should be presented as a cohesive paragraph rather than in list format.
    - Following the summary, there should be a list of three essential takeaways from the video, provided as three individual sentences.

By adhering to these structured instructions, the agent can effectively assist users in understanding the key points of the video content without them needing to watch the entire video.

## Summary
The `YouTubeAgent` class is a crucial part of the AI-driven system designed to enhance user interaction with YouTube content, providing efficient summaries generated through advanced AI technology. This documentation outlines the purpose and functionality of the methods available within this class, thereby serving as a reference for developers seeking to understand or extend the functionalities of the `YouTubeAgent`.