# Documentation: ShowBusinessSettings.php

Original file: `app/Console\Commands\ShowBusinessSettings.php`

# ShowBusinessSettings Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Class Overview](#class-overview)
3. [Method Documentation](#method-documentation)
   - [handle](#handle)

## Introduction

The `ShowBusinessSettings` class is a custom Artisan command in a Laravel application designed to display the current business settings. This command can be executed from the console to retrieve and print important configuration values relevant to the business, such as its name, location, and contact details. The command enhances the visibility of configuration settings, aiding developers and administrators in quickly retrieving business-related information without accessing the codebase directly.

## Class Overview

The `ShowBusinessSettings` class extends the base `Command` class provided by Laravel, which facilitates the creation of console commands. This class has specific properties and methods that define its behavior:

- **Namespace**: `App\Console\Commands`
- **Properties**:
  - `$signature`: Defines the command signature that can be used to invoke this command in the console.
  - `$description`: Provides a brief description of what the command does.

## Method Documentation

### handle

```php
public function handle()
```

#### Purpose
The `handle` method is the main function of the `ShowBusinessSettings` command. It is executed when the command is called from the terminal.

#### Parameters
- None.

#### Return Values
- None.

#### Functionality
1. **Display a Header**: The method begins by printing a header indicating the section of current business settings that will be displayed.
   ```php
   $this->info('=== Current Business Settings ===');
   ```

2. **Display Settings in a Table**: 
   The core functionality of this method involves displaying key business settings in a structured table format. It fetches values from the Laravel configuration using the `config` helper function.

   The table displays the following settings:
   - **Name**: The name of the business.
   - **Location**: The physical address of the business.
   - **Phone**: Contact phone number.
   - **Business Type**: The category or type of the business.
   - **Description**: A brief description of the business.
   - **Social Media Links**: Facebook and Instagram links, with a default value of ‘Not set’ if these links are absent. 
   ```php
   $this->table(
       ['Setting', 'Value'],
       [
           ['Name', config('business.name')],
           ['Location', config('business.location')],
           ['Phone', config('business.phone')],
           ['Business Type', config('business.business_type')],
           ['Description', config('business.description')],
           ['Facebook', config('business.social_media.facebook') ?: 'Not set'],
           ['Instagram', config('business.social_media.instagram') ?: 'Not set'],
       ]
   );
   ```

3. **Informative Messages**: After displaying the settings, the method prints additional information to guide the user on how to update these settings by running another command.
   ```php
   $this->info('These settings are used by social media optimization agents.');
   $this->info('To update these settings, run: php artisan business:update');
   ```

### Summary
The `ShowBusinessSettings` command is a helpful tool for administrators and developers to quickly assess the current business settings configured in the application. Its structured output and informative messages enhance usability and provide essential information in an accessible format. 

This command reflects the flexibility and capability of Artisan commands within Laravel and serves as a practical example of how to interact with application configurations effectively.