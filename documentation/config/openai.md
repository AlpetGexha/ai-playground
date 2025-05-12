# Documentation: openai.php

Original file: `config/openai.php`

# openai.php Configuration Documentation

## Table of Contents

- [Introduction](#introduction)
- [Configuration Options](#configuration-options)
  - [OpenAI API Key and Organization](#openai-api-key-and-organization)
  - [OpenAI API Project](#openai-api-project)
  - [OpenAI Base URL](#openai-base-url)
  - [Request Timeout](#request-timeout)

## Introduction

The `openai.php` configuration file is a part of the Laravel application that contains settings for integrating OpenAI's API. This file holds environment-specific configurations necessary to authenticate and interact with OpenAI's services. It is crucial for developers working on features that utilize OpenAI's machine learning models to reference this configuration, ensuring proper usage of API keys and endpoints.

## Configuration Options

This section describes the different configuration options defined in the `openai.php` file. Each configuration setting is fetched from the environment variables (commonly defined in the `.env` file) using the `env()` function.

### OpenAI API Key and Organization

```php
'api_key' => env('OPENAI_API_KEY'),
'organization' => env('OPENAI_ORGANIZATION'),
```

- **Purpose**: To authenticate requests made to the OpenAI API.
- **Parameters**:
  - `OPENAI_API_KEY`: This environment variable should contain your unique OpenAI API key, which is necessary for making authorized requests.
  - `OPENAI_ORGANIZATION`: This variable is used to specify the organization linked to your OpenAI account.
- **Returns**: Values from the environment which are used for authorizing requests.

### OpenAI API Project

```php
'project' => env('OPENAI_PROJECT'),
```

- **Purpose**: Optionally specify a project for requests, particularly useful when using legacy user API keys.
- **Parameters**:
  - `OPENAI_PROJECT`: This environment variable can be set if a project association is required. For newer API keys, this configuration is not mandatory.
- **Returns**: The project identifier from the environment variable.

### OpenAI Base URL

```php
'base_uri' => env('OPENAI_BASE_URL'),
```

- **Purpose**: To define the base URL for OpenAI's API endpoint.
- **Parameters**:
  - `OPENAI_BASE_URL`: This variable should define the URL to be used for API requests, especially relevant if you are using a custom endpoint.
- **Returns**: The base URI from the environment variable, which defaults to `api.openai.com/v1` if not specified.

### Request Timeout

```php
'request_timeout' => env('OPENAI_REQUEST_TIMEOUT', 30),
```

- **Purpose**: To specify the maximum duration (in seconds) to wait for a response from the API.
- **Parameters**:
  - `OPENAI_REQUEST_TIMEOUT`: Optional environment variable to set a custom timeout period for requests.
- **Returns**: The configured timeout value, defaulting to 30 seconds if not specified.

## Conclusion

The `openai.php` configuration file is integral for establishing a connection with OpenAI's API within a Laravel application. By properly setting the environment variables referenced within this file, developers can ensure smooth and secure interactions with OpenAI's powerful AI models. Understanding the purpose and configuration options detailed above will aid in correctly utilizing the OpenAI services in your Laravel projects.