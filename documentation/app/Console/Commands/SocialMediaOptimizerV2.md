# Documentation: SocialMediaOptimizerV2.php

Original file: `app/Console\Commands\SocialMediaOptimizerV2.php`

# SocialMediaOptimizerV2 Documentation

## Table of Contents
- [Introduction](#introduction)
- [Class Overview](#class-overview)
- [Methods](#methods)
  - [handle](#handle)

## Introduction

The `SocialMediaOptimizerV2` class is a command-line tool designed to optimize social media content for multiple platforms, specifically Facebook and Instagram. This console command is part of a Laravel application and provides users with an interactive way to create optimized posts based on the input content, business type, and type of post. With the added feature of monitoring, it can also track the agent's activity during execution.

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

- **Namespace**: `App\Console\Commands`
- **Dependencies**: This class uses several dependencies, including the `SocialMediaController`, user message handling, and observability through the `Inspector`.

### Properties

| Property Name      | Type     | Description                                                        |
|--------------------|----------|--------------------------------------------------------------------|
| `$signature`       | `string` | Command name and options (e.g., `social:optimize:v2`)            |
| `$description`     | `string` | Description of what the command does                               |

## Methods

### handle

```php
public function handle()
```

#### Purpose
The `handle` method is the core function of the `SocialMediaOptimizerV2` class. It executes the logic for optimizing social media posts based on user input and provides feedback on the process.

#### Functionality
1. **Initialization**: 
    - Instantiates the `SocialMediaController` agent.

2. **Monitoring Setup (Optional)**:
    - If the `--monitor` option is enabled, this method initializes the `Inspector` for tracking agent activity.

3. **Business Information Retrieval**:
    - Retrieves business-related information from configuration settings.

4. **User Input Prompting**:
    - Prompts the user for:
        - Type of business (**hotel**, **restaurant**, **both**)
        - Type of content post (**promotion**, **announcement**, etc.)
        - Base content for optimization

5. **Error Handling**: 
    - If the user does not provide content, an error message is displayed and the command exits.

6. **Content Optimization for Facebook**:
    - Calls the `FacebookAgent` to process the user’s content. Logs optimized content and handles exceptions if any occur.

7. **Content Optimization for Instagram**:
    - Similar to Facebook, uses the `InstagramAgent` to optimize the content and manages potential errors.

8. **Content Analysis**:
    - Utilizes an `AnalyticsAgent` to analyze the engagement potential for the provided content across selected platforms.

9. **Completion Message**:
    - Outputs a completion message once all processes are done.

#### Parameters
- The `handle()` method does not take any parameters.

#### Return Values
- The method returns an integer value (`1`) in case of an error when the content is empty. Otherwise, it completes without explicit return.

#### Detailed Code Walkthrough

```php
// Initialize agent
$agent = SocialMediaController::make();

// Add monitoring if requested
if ($this->option('monitor')) {
    $this->info("Monitoring enabled for agent activity");
    ...
}

// Get the business information from config
$businessName = config('business.name');
...
```

- The method begins by initializing the necessary controllers and checking for monitoring options. This helps create a flexible setup for various use cases.

```php
// Prompt user for content type
$businessType = $this->choice(...);
$content = $this->ask('Enter your base content that you want to optimize');

if (empty($content)) {
    $this->error('Content cannot be empty.');
    return 1;
}
```

- The method uses Laravel's command-line interaction features to collect necessary inputs from the user and validate them before proceeding.

```php
// Process content for Facebook
$this->info('Optimizing for Facebook...');
try {
    ...
} catch (\Exception $e) {
    $this->error('Error optimizing for Facebook: ' . $e->getMessage());
}
```

- Each section for optimization (Facebook and Instagram) is encapsulated in a try-catch block to handle potential runtime exceptions effectively.

```php
$this->info("Thanks for using the Social Media Optimizer!");
```

- Finally, the command concludes by thanking the user, improving the overall user experience.

## Conclusion

The `SocialMediaOptimizerV2` command provides an essential tool for optimizing content for social media platforms, simplifying the process for users while maintaining flexibility and error handling. This documentation should assist developers in understanding the command's structure and functionality, aiding in further development and maintenance.