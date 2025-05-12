# Documentation: services.php

Original file: `config/services.php`

# services.php Documentation

## Table of Contents
- [Introduction](#introduction)
- [Configuration Options](#configuration-options)
  - [Postmark](#postmark)
  - [SES (Amazon Simple Email Service)](#ses-amazon-simple-email-service)
  - [Resend](#resend)
  - [Slack](#slack)
  - [Gemini](#gemini)
  - [OpenAI](#openai)

## Introduction

The `services.php` file is a key configuration file in a Laravel application that serves to store credentials for various third-party services. This file centralizes service configuration, making it easier for developers to manage integrations with services such as Mailgun, Postmark, Amazon Web Services (AWS), and others. By utilizing environment variables, sensitive data is kept secure and outside of the codebase, following best practices for managing credentials.

## Configuration Options

Below is a detailed explanation of each third-party service configuration available in the `services.php` file.

### Postmark

```php
'postmark' => [
    'token' => env('POSTMARK_TOKEN'),
],
```

- **Purpose**: Configures the integration with the Postmark service for sending emails.
- **Parameters**:
  - `token`: The API token for authenticating requests with Postmark, retrieved from the environment variable `POSTMARK_TOKEN`.
- **Return Values**: Returns a configuration array that includes the token for Postmark.

### SES (Amazon Simple Email Service)

```php
'ses' => [
    'key' => env('AWS_ACCESS_KEY_ID'),
    'secret' => env('AWS_SECRET_ACCESS_KEY'),
    'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
],
```

- **Purpose**: Holds the configuration details needed to send emails via Amazon SES.
- **Parameters**:
  - `key`: AWS Access Key ID, fetched from the environment variable `AWS_ACCESS_KEY_ID`.
  - `secret`: AWS Secret Access Key, fetched from `AWS_SECRET_ACCESS_KEY`.
  - `region`: AWS region for SES, with a default value of `us-east-1` if not specified in the environment.
- **Return Values**: Returns an array of SES credentials and settings.

### Resend

```php
'resend' => [
    'key' => env('RESEND_KEY'),
],
```

- **Purpose**: Configures the connection to the Resend service, which is used for email delivery.
- **Parameters**:
  - `key`: The API key for authorization, stored in the `RESEND_KEY` environment variable.
- **Return Values**: Returns the Resend API key as part of a configuration array.

### Slack

```php
'slack' => [
    'notifications' => [
        'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
        'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
    ],
],
```

- **Purpose**: Contains configurations for sending notifications to a Slack channel.
- **Parameters**:
  - `bot_user_oauth_token`: The OAuth token for the Slack bot user, retrieved from `SLACK_BOT_USER_OAUTH_TOKEN`.
  - `channel`: The default Slack channel where notifications will be sent, from `SLACK_BOT_USER_DEFAULT_CHANNEL`.
- **Return Values**: Returns an array of Slack notification settings.

### Gemini

```php
'gemini' => [
    'key' => env('GEMINI_API_KEY'),
    'model' => env('GEMINI_MODEL', 'gemini-1.5-turbo'),
],
```

- **Purpose**: Configures access to the Gemini service for processing and generating language-based tasks.
- **Parameters**:
  - `key`: The API key for Gemini, fetched from the environment variable `GEMINI_API_KEY`.
  - `model`: The model to be used with the Gemini service, defaulting to `gemini-1.5-turbo` if not otherwise specified.
- **Return Values**: Returns the Gemini API key and model configuration.

### OpenAI

```php
'openai' => [
    'key' => env('OPENAI_API_KEY'),
    'model' => env('OPENAI_MODEL', 'gpt-3.5-turbo'),
]
```

- **Purpose**: Holds the configuration settings necessary for integrating with OpenAI's API.
- **Parameters**:
  - `key`: The API key to authenticate against OpenAI's services, drawn from `OPENAI_API_KEY`.
  - `model`: Specifies the OpenAI model to be used, defaulting to `gpt-3.5-turbo`.
- **Return Values**: Returns the OpenAI API key and the required model settings.

## Conclusion

The `services.php` file is fundamental for setting up and managing external API integrations in a Laravel application. Each configuration option is designed to securely store essential credentials that enable seamless communication with third-party platforms. By leveraging environment variables, Laravel ensures that sensitive information remains protected, while still allowing developers to maintain a clear and organized codebase. Adjustments to configurations can easily be made in the `.env` file, promoting flexibility and adaptability.