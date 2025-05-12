# Documentation: docudoodle.php

Original file: `config/docudoodle.php`

# docudoodle.php Documentation

## Table of Contents
- [Introduction](#introduction)
- [Configuration Settings](#configuration-settings)
  - [OpenAI API Key](#openai-api-key)
  - [Claude API Key](#claude-api-key)
  - [Default Model](#default-model)
  - [Maximum Tokens](#maximum-tokens)
  - [Default Extensions](#default-extensions)
  - [Default Skip Directories](#default-skip-directories)
  - [Ollama Settings](#ollama-settings)
  - [Gemini API Key](#gemini-api-key)
  - [Azure OpenAI Settings](#azure-openai-settings)
  - [Default API Provider](#default-api-provider)
  - [Cache Settings](#cache-settings)

## Introduction

The `docudoodle.php` file is a configuration file used in a Laravel-based PHP application that interacts with various AI APIs, including OpenAI, Claude, Gemini, and Azure OpenAI. It centralizes the configuration settings required for authenticating and utilizing these APIs to generate documentation from source code files. By using environment variables, it ensures that sensitive information, such as API keys, can be securely handled.

## Configuration Settings

The following configuration settings are defined in the `docudoodle.php` file:

### OpenAI API Key

```php
'openai_api_key' => env('OPENAI_API_KEY', ''),
```

- **Purpose**: Stores the API key used to authenticate requests to the OpenAI API.
- **Default Value**: An empty string if the environment variable `OPENAI_API_KEY` is not set.
- **Location**: Obtainable from [OpenAI API Keys](https://platform.openai.com/account/api-keys).

### Claude API Key

```php
'claude_api_key' => env('CLAUDE_API_KEY', ''),
```

- **Purpose**: Stores the API key for authentication with the Claude API.
- **Default Value**: An empty string if the environment variable `CLAUDE_API_KEY` is not set.

### Default Model

```php
'default_model' => env('DOCUDOODLE_MODEL', 'gpt-4o-mini'),
```

- **Purpose**: Specifies the default AI model to be used for generating documentation.
- **Default Value**: `gpt-4o-mini` if the environment variable `DOCUDOODLE_MODEL` is not set.

### Maximum Tokens

```php
'max_tokens' => env('DOCUDOODLE_MAX_TOKENS', 10000),
```

- **Purpose**: Sets the maximum number of tokens that can be processed in API calls.
- **Default Value**: 10,000 tokens if the environment variable `DOCUDOODLE_MAX_TOKENS` is not set.

### Default Extensions

```php
'default_extensions' => ['php', 'yaml', 'yml'],
```

- **Purpose**: Lists the default file extensions to be processed for documentation generation.
- **Default Value**: Includes PHP and YAML file types, specifically `php`, `yaml`, and `yml`.

### Default Skip Directories

```php
'default_skip_dirs' => ['vendor/', 'node_modules/', 'tests/', 'cache/'],
```

- **Purpose**: Defines a list of directories that should be skipped when searching for files to process.
- **Default Value**: Directories include `vendor/`, `node_modules/`, `tests/`, and `cache/`.

### Ollama Settings

```php
'ollama_host' => env('OLLAMA_HOST', 'localhost'),
'ollama_port' => env('OLLAMA_PORT', '11434'),
```

- **Purpose**: Configures options for the Ollama API, which runs locally.
- **Parameters**: 
  - **host**: The hostname where the Ollama API is running (default is `localhost`).
  - **port**: The port number that Ollama listens on (default is `11434`).

### Gemini API Key

```php
'gemini_api_key' => env('GEMINI_API_KEY', ''),
```

- **Purpose**: Stores the API key required for authentication with the Gemini API.
- **Default Value**: An empty string if the environment variable `GEMINI_API_KEY` is not set.

### Azure OpenAI Settings

```php
'azure_endpoint' => env('AZURE_OPENAI_ENDPOINT', ''),
'azure_api_key' => env('AZURE_OPENAI_API_KEY', ''),
'azure_deployment' => env('AZURE_OPENAI_DEPLOYMENT', ''),
'azure_api_version' => env('AZURE_OPENAI_API_VERSION', '2023-05-15'),
```

- **Purpose**: Configures the settings necessary for integration with Azure OpenAI.
- **Parameters**:
  - **endpoint**: The endpoint URL for the Azure OpenAI resource.
  - **api_key**: Azure OpenAI API key for authentication.
  - **deployment**: The deployment ID of the Azure OpenAI service to use.
  - **api_version**: The Azure OpenAI API version to use (defaults to `2023-05-15`).

### Default API Provider

```php
'default_api_provider' => env('DOCUDOODLE_API_PROVIDER', 'openai'),
```

- **Purpose**: Specifies the default API provider for documentation generation.
- **Supported Values**: `'openai'`, `'ollama'`, `'claude'`, `'gemini'`, `'azure'`.
- **Default Value**: Defaults to `openai` if the environment variable `DOCUDOODLE_API_PROVIDER` is not set.

### Cache Settings

```php
'use_cache' => env('DOCUDOODLE_USE_CACHE', true),
'cache_file_path' => env('DOCUDOODLE_CACHE_PATH', null),
'bypass_cache' => env('DOCUDOODLE_BYPASS_CACHE', false),
```

- **Purpose**: Configures caching behavior for the documentation generation process.
- **Parameters**:
  - **use_cache**: Enables or disables caching of unchanged files (default: `true`).
  - **cache_file_path**: The absolute path to the cache file. If not specified, defaults to `.docudoodle_cache.json` in the output directory.
  - **bypass_cache**: If set to true, forces the regeneration of all documents regardless of changes (default: `false`).

This comprehensive documentation is designed to help developers understand the importance of each configuration setting in `docudoodle.php`, its potential impact on functionality, and how to customize it for their specific needs while maintaining best practices in API interactions.