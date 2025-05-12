# Documentation: UpdateBusinessSettings.php

Original file: `app/Console\Commands\UpdateBusinessSettings.php`

# UpdateBusinessSettings Documentation

## Table of Contents
- [Introduction](#introduction)
- [Class Overview](#class-overview)
- [Method: handle](#method-handle)
- [Method: updateEnvFile](#method-updateenvfile)

## Introduction
The `UpdateBusinessSettings.php` file is a console command in a Laravel application designed to facilitate the updating of business information that can be utilized for social media optimization. This command allows developers or administrators to interactively update essential business configuration values, such as name, phone number, location, and linked social media accounts, directly modifying the `.env` environment file where these settings are typically stored. By doing so, this command aids in keeping business information current without the need for directly editing the environment configuration in the Laravel project.

## Class Overview
The `UpdateBusinessSettings` class extends Laravel's `Command` class and provides a console command signature `business:update`. It manages the process of prompting users for various business-related information and updating the `.env` file accordingly.

### Properties
- **$signature**: A string that defines the console command name and its parameters.
- **$description**: A brief description of what the command does.

## Method: handle
### Purpose
The `handle` method is the main execution point of the console command. It gathers input from the user, prompts for updates to business information, and invokes the method to update the environment file with the new values.

### Functionality
1. Displays information headers to the console.
2. Retrieves the current business information stored in the configuration.
3. Prompts the user for new values related to the business, including name, phone number, description, business type, and social media handles.
4. Constructs an associative array of the new data to be saved in the `.env` file.
5. Calls the `updateEnvFile` method to apply the changes.
6. Notifies the user of successful updates and reminds them to restart the application for changes to take effect.

### Parameters
- This method does not accept any parameters.

### Return Values
- This method does not return any values.

### Code
```php
public function handle()
{
    $this->info('=== Business Information Update ===');
    $this->info('This will update the business information used by the AI agents.');
    $this->newLine();

    // Retrieve current values
    $currentName = config('business.name');
    $currentPhone = config('business.phone');
    $currentLocation = config('business.location');

    // Request new values
    $name = $this->ask('Business Name', $currentName);
    $phone = $this->ask('Business Phone', $currentPhone);
    $location = $this->ask('Business Location', $currentLocation);
    $description = $this->ask('Short Business Description', config('business.description'));
    $businessType = $this->choice('Business Type', ['hotel', 'restaurant', 'hotel_restaurant'], 'hotel_restaurant');
    $facebookHandle = $this->ask('Facebook Handle (optional)', config('business.social_media.facebook'));
    $instagramHandle = $this->ask('Instagram Handle (optional)', config('business.social_media.instagram'));

    // Create environment variable updates
    $envUpdates = [
        'BUSINESS_NAME' => $name,
        'BUSINESS_PHONE' => $phone,
        'BUSINESS_LOCATION' => $location,
        'BUSINESS_TYPE' => $businessType,
        'BUSINESS_DESCRIPTION' => $description,
        'BUSINESS_FACEBOOK' => $facebookHandle,
        'BUSINESS_INSTAGRAM' => $instagramHandle,
    ];

    // Update the .env file
    $this->updateEnvFile($envUpdates);

    $this->info('Business information updated successfully!');
    $this->info('Please restart your application for the changes to take effect.');
}
```

## Method: updateEnvFile
### Purpose
The `updateEnvFile` method handles the process of updating the `.env` file with new business information values.

### Parameters
- **array $updates**: An associative array where the keys are environment variable names and the values are the new values to be set in the `.env` file.

### Return Values
- This method does not return any values.

### Functionality
1. It checks for the existence of the `.env` file in the base path of the application.
2. Retrieves the current content of the `.env` file.
3. Iterates through the `$updates` array:
   - Escapes any quotes in the values for proper formatting.
   - Checks if a key already exists in the file:
     - If it does, updates the corresponding entry.
     - If not, appends the new key-value pair at the end of the file.
4. Writes the modified content back to the `.env` file.

### Code
```php
protected function updateEnvFile(array $updates)
{
    $envFilePath = base_path('.env');

    if (!File::exists($envFilePath)) {
        $this->error('.env file not found!');
        return;
    }

    $envContents = File::get($envFilePath);

    foreach ($updates as $key => $value) {
        // Escape any quotes in the value
        $value = str_replace('"', '\"', $value);

        // Check if the key exists in the .env file
        if (preg_match("/^{$key}=/m", $envContents)) {
            // Update existing key
            $envContents = preg_replace("/^{$key}=.*/m", "{$key}=\"{$value}\"", $envContents);
        } else {
            // Add new key
            $envContents .= PHP_EOL . "{$key}=\"{$value}\"";
        }
    }

    File::put($envFilePath, $envContents);
}
```

## Conclusion
The `UpdateBusinessSettings` command is a vital part of managing business settings within a Laravel application, providing a user-friendly interface for updating configuration values that influence social media and other external representations of the business. By using this command, developers can ensure that business information remains up-to-date without needing direct access to the `.env` file. The methods defined in this class enhance the maintainability and usability of business-related configurations in the application.