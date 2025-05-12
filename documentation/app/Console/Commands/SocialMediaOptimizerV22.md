# Documentation: SocialMediaOptimizerV22.php

Original file: `app/Console\Commands\SocialMediaOptimizerV22.php`

# SocialMediaOptimizerV22 Documentation

## Table of Contents
- [Introduction](#introduction)
- [Class Overview](#class-overview)
- [Methods](#methods)
    - [handle](#handle)
    - [directMode](#directmode)

## Introduction
The `SocialMediaOptimizerV22` is a command-line console command class for optimizing social media content specific to multiple platforms, primarily Facebook and Instagram. The class is part of the `App\Console\Commands` namespace and facilitates businesses in improving their online presence through effective content strategies. It leverages artificial intelligence to generate optimized content based on user inputs and preferences.

## Class Overview
```php
namespace App\Console\Commands;

use App\Agents\SocialMediaController;
use NeuronAI\Chat\Messages\UserMessage;
use Illuminate\Console\Command;
use NeuronAI\Observability\AgentMonitoring;
use Inspector\Configuration;
use Inspector\Inspector;
```
This class extends the Laravel `Command` class, which provides a structured way to create commands that can be run via the Artisan command-line interface.

### Properties
- **$signature**: Defines the command signature and available options for the command.
- **$description**: Provides a human-readable description of what the command does.

### Signature
```bash
social:optimize {--monitor} {--direct}
```
- **--monitor**: Option to enable monitoring of agent activity.
- **--direct**: Option to skip the interactive mode and proceed directly to content optimization.

## Methods

### handle
```php
public function handle()
```
#### Purpose
The `handle` method is the main entry point for executing the command. It initializes the necessary components, handles user input, and coordinates the content optimization process.

#### Functionality
1. **Agent Initialization**: Creates an instance of `SocialMediaController`.
2. **Monitoring Setup**: Checks for the `--monitor` option, initializes an `Inspector` instance, and sets up monitoring for the agent if requested.
3. **Business Information Display**: Retrieves and displays the business information from configuration settings.
4. **User Interaction**: Depending on the provided options (interactive vs. direct mode), it either gathers user input for content optimization or proceeds to optimization directly.
5. **Content Processing**: Constructs a prompt for the AI agent to generate optimized content and displays responses.
6. **Follow-Up Interaction**: Allows the user to engage in a question-and-answer session with the agent for further queries.

#### Parameters
- No parameters are directly passed to this method.

#### Return Values
- None; outputs information directly to the console.

### directMode
```php
protected function directMode($agent)
```
#### Purpose
The `directMode` method offers an alternative interaction path for users who wish to optimize their content directly without going through the interactive sequence.

#### Parameters
- **$agent**: An instance of `SocialMediaController`, used to communicate with the optimization service.

#### Functionality
1. Prompts the user to enter base content.
2. Gathers minimal information regarding the business focus (hotel/restaurant/both).
3. Constructs an explicit prompt instructing the agent to use the `create_facebook_post` and `create_instagram_post` tools for optimization.
4. Outputs the optimized content to the console.

#### Return Values
- None; outputs information directly to the console.

## Conclusion
The `SocialMediaOptimizerV22` class provides a powerful tool for enhancing social media engagement through content optimization. It is designed to be user-friendly, with options that cater to both interactive and direct content optimization needs. By leveraging AI technology, the class facilitates effective communication strategies for businesses, thus enhancing their digital marketing efforts. 

Developers can easily extend this class to support additional social media platforms or integrate other features as required.