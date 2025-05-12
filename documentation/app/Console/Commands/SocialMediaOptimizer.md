# Documentation: SocialMediaOptimizer.php

Original file: `app/Console\Commands\SocialMediaOptimizer.php`

# SocialMediaOptimizer Documentation

## Table of Contents
- [Introduction](#introduction)
- [Class Definition](#class-definition)
- [Command Signature](#command-signature)
- [Description](#description)
- [Method: handle()](#method-handle)

## Introduction

The `SocialMediaOptimizer.php` file contains the `SocialMediaOptimizer` class, which is a Laravel Artisan command designed to optimize social media content for various platforms, specifically Facebook and Instagram. Utilizing the capabilities of the `SocialMediaController`, the command interacts with the user to collect relevant information and then processes this data to create optimized social media posts. The command can also enable monitoring of agent activities through the Inspector service when specified.

## Class Definition

```php
class SocialMediaOptimizer extends Command
```

The `SocialMediaOptimizer` class extends the `Illuminate\Console\Command` class, inheriting its functionalities to facilitate command-line execution.

## Command Signature

```php
protected $signature = 'social:optimize {--monitor : Enable monitoring of agent activity}';
```

- This command can be invoked from the command line using: 
  ```
  php artisan social:optimize
  ```
- An optional flag `--monitor` can be used:
  ```
  php artisan social:optimize --monitor
  ```
  This flag enables activity monitoring of the agent during execution.

## Description

```php
protected $description = 'Optimize social media content for multiple platforms';
```

This command is described as a tool that assists users in creating optimized content designed explicitly for social media platforms, enhancing engagement and visibility.

## Method: handle()

### Purpose
The `handle()` method is the main execution point for the `SocialMediaOptimizer` command. It encapsulates the logic to initialize the agent, gather user input, process the content, and display the optimized output.

### Functionality
1. **Agent Initialization**: Creates an instance of `SocialMediaController`.
2. **Monitoring Setup**: If the `--monitor` option is specified, initializes the `Inspector` for monitoring agent activities.
3. **User Interaction**: Collects business information and user input to guide content creation.
4. **Content Processing**: Forms a prompt from user inputs and passes it to the agent for optimization.
5. **Output**: Displays the optimized content along with the ability for users to ask follow-up questions.

### Parameters
- The `handle()` method does not accept parameters but utilizes `$this->option()`, `$this->info()`, `$this->line()`, etc., to interact with the command line input/output.

### Return Values
- The `handle()` method does not return a value as it is primarily designed for executing commands and outputting results directly to the console.

### Detailed Steps
1. **Initialization of Agent**:
   ```php
   $agent = SocialMediaController::make();
   ```

2. **Monitoring Configuration**:
   If monitoring is enabled, an `Inspector` instance is created, and the agent begins observing through the `AgentMonitoring` class:
   ```php
   if ($this->option('monitor')) {...}
   ```

3. **Business Info Display**: Business details are fetched from the application configuration and displayed to the user:
   ```php
   $businessName = config('business.name');
   ```

4. **User Input Retrieval**: Asks the user for the type of content and the post type they wish to create:
   ```php
   $businessType = $this->choice(...);
   $contentType = $this->choice(...);
   $content = $this->ask(...);
   ```

5. **Content Optimization**: Constructs a prompt for the agent based on user inputs and retrieves the optimized content:
   ```php
   $prompt = "I need to create a {$contentType} post for my {$businessType} business...";
   ```

6. **Follow-up Questions**: Allows for ongoing interaction where users can ask additional questions until they choose to exit:
   ```php
   do {...} while (true);
   ```

7. **Closure Message**: The command concludes with a thank you message.

### Example Usage
To use this command:
1. Open terminal/command prompt.
2. Navigate to the Laravel project directory.
3. Run the command:
   ```bash
   php artisan social:optimize
   ```

### Additional Information
- This class relies on other components, including the `SocialMediaController`, `UserMessage`, and `Inspector`, which performs the actual optimization logic and monitors the request-response lifecycle.

By examining the `SocialMediaOptimizer.php` file, developers can understand how the optimization process is structured, how to extend the functionality, and how it integrates with the overall Laravel application.