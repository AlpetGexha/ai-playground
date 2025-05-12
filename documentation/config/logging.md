# Documentation: logging.php

Original file: `config/logging.php`

# logging.php Documentation

## Table of Contents
- [Introduction](#introduction)
- [Default Log Channel](#default-log-channel)
- [Deprecations Log Channel](#deprecations-log-channel)
- [Log Channels](#log-channels)
  - [Stack Channel](#stack-channel)
  - [Single Channel](#single-channel)
  - [Daily Channel](#daily-channel)
  - [Slack Channel](#slack-channel)
  - [Papertrail Channel](#papertrail-channel)
  - [Stderr Channel](#stderr-channel)
  - [Syslog Channel](#syslog-channel)
  - [Errorlog Channel](#errorlog-channel)
  - [Null Channel](#null-channel)
  - [Emergency Log Channel](#emergency-log-channel)

## Introduction
The `logging.php` file in Laravel serves as the configuration file for logging within the application. It defines how log messages should be captured and where they should be stored. Using the Monolog library, this file allows for various logging channels to be configured, providing essential information needed for debugging, monitoring, and maintaining applications. Each configuration can be tailored to the specific needs of the environment the application is running in.

## Default Log Channel

```php
'default' => env('LOG_CHANNEL', 'stack'),
```

### Purpose
The `default` channel determines which logging channel should be used to log messages unless otherwise specified.

### Functionality
- Fetches the channel name from the environment using the `LOG_CHANNEL` key.
- If the key is not defined, it defaults to 'stack'.
- It must match one of the channels configured in the list below.

## Deprecations Log Channel

```php
'deprecations' => [
    'channel' => env('LOG_DEPRECATIONS_CHANNEL', 'null'),
    'trace' => env('LOG_DEPRECATIONS_TRACE', false),
],
```

### Purpose
This section controls the logging for deprecated functionality in PHP and libraries, aiding developers in preparing for upcoming major versions.

### Parameters
- `channel`: Name of the channel used to log deprecations (default is 'null').
- `trace`: Boolean that specifies whether a stack trace should be logged (default is `false`).

## Log Channels

```php
'channels' => [
    // ... channel configurations
],
```

### Overview
The `channels` array facilitates configuration of various logging channels, offering options for different logging mechanisms within the application. Each channel can be customized to fit specific logging needs.

### Stack Channel

```php
'stack' => [
    'driver' => 'stack',
    'channels' => explode(',', env('LOG_STACK', 'single')),
    'ignore_exceptions' => false,
],
```

#### Purpose
The stack channel allows logging to multiple channels simultaneously.

#### Parameters
- `driver`: Must be set to 'stack'.
- `channels`: A comma-separated string of channel names that will be logged (configured via `LOG_STACK`).
- `ignore_exceptions`: If set to `true`, exceptions thrown by the channels will be ignored.

### Single Channel

```php
'single' => [
    'driver' => 'single',
    'path' => storage_path('logs/laravel.log'),
    'level' => env('LOG_LEVEL', 'debug'),
    'replace_placeholders' => true,
],
```

#### Purpose
The single channel logs all messages to a single file.

#### Parameters
- `driver`: Set to 'single'.
- `path`: Path to the log file. Defaults to the Laravel log directory.
- `level`: Minimum severity level for messages to be logged (defaults to 'debug').
- `replace_placeholders`: If enabled, placeholders in log messages will be replaced.

### Daily Channel

```php
'daily' => [
    'driver' => 'daily',
    'path' => storage_path('logs/laravel.log'),
    'level' => env('LOG_LEVEL', 'debug'),
    'days' => env('LOG_DAILY_DAYS', 14),
    'replace_placeholders' => true,
],
```

#### Purpose
The daily channel creates a new log file for each day.

#### Parameters
- `driver`: Set to 'daily'.
- `path`: Path to the log file (same as single).
- `level`: Logging level, as with the single channel.
- `days`: Specifies how many days to retain log files (default is 14).
- `replace_placeholders`: Same behavior as in the single channel.

### Slack Channel

```php
'slack' => [
    'driver' => 'slack',
    'url' => env('LOG_SLACK_WEBHOOK_URL'),
    'username' => env('LOG_SLACK_USERNAME', 'Laravel Log'),
    'emoji' => env('LOG_SLACK_EMOJI', ':boom:'),
    'level' => env('LOG_LEVEL', 'critical'),
    'replace_placeholders' => true,
],
```

#### Purpose
This channel sends log messages to a specified Slack channel.

#### Parameters
- `driver`: Set to 'slack'.
- `url`: Incoming webhook URL for Slack..
- `username`: Username the log message will appear as.
- `emoji`: Emoji to be used in the Slack message.
- `level`: Minimum message severity level to be sent to Slack (defaults to 'critical').
- `replace_placeholders`: Enables placeholder replacement.

### Papertrail Channel

```php
'papertrail' => [
    'driver' => 'monolog',
    'level' => env('LOG_LEVEL', 'debug'),
    'handler' => env('LOG_PAPERTRAIL_HANDLER', SyslogUdpHandler::class),
    'handler_with' => [
        'host' => env('PAPERTRAIL_URL'),
        'port' => env('PAPERTRAIL_PORT'),
        'connectionString' => 'tls://'.env('PAPERTRAIL_URL').':'.env('PAPERTRAIL_PORT'),
    ],
    'processors' => [PsrLogMessageProcessor::class],
],
```

#### Purpose
This channel sends log messages to Papertrail, a cloud-hosted logging service.

#### Parameters
- `driver`: Set to 'monolog'.
- `level`: Sets the minimum severity level for messages.
- `handler`: The log handler to be used, in this case, the SyslogUdpHandler from Monolog.
- `handler_with`: Contains configuration parameters such as `host` and `port`.
- `processors`: Set to use the PsrLogMessageProcessor for processing messages.

### Stderr Channel

```php
'stderr' => [
    'driver' => 'monolog',
    'level' => env('LOG_LEVEL', 'debug'),
    'handler' => StreamHandler::class,
    'formatter' => env('LOG_STDERR_FORMATTER'),
    'with' => [
        'stream' => 'php://stderr',
    ],
    'processors' => [PsrLogMessageProcessor::class],
],
```

#### Purpose
Logs messages to the standard error output.

#### Parameters
- `driver`: Using Monolog for logging.
- `level`: Sets the minimum severity level.
- `handler`: Uses StreamHandler to direct output.
- `formatter