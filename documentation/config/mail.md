# Documentation: mail.php

Original file: `config/mail.php`

# mail.php Documentation

## Table of Contents
- [Introduction](#introduction)
- [Default Mailer Configuration](#default-mailer-configuration)
- [Mailer Configurations](#mailer-configurations)
  - [SMTP Mailer](#smtp-mailer)
  - [SES Mailer](#ses-mailer)
  - [Postmark Mailer](#postmark-mailer)
  - [Resend Mailer](#resend-mailer)
  - [Sendmail Mailer](#sendmail-mailer)
  - [Log Mailer](#log-mailer)
  - [Array Mailer](#array-mailer)
  - [Failover Mailer](#failover-mailer)
  - [Roundrobin Mailer](#roundrobin-mailer)
- [Global "From" Address](#global-from-address)
- [Conclusion](#conclusion)

## Introduction
The `mail.php` configuration file is an integral part of a Laravel application, responsible for defining the settings related to email sending functionalities. It allows developers to configure various mail transports (or mailers) that the application can utilize to send email messages. The file establishes essential default values, transport mechanisms, and global sender details that facilitate seamless email communication within the application.

## Default Mailer Configuration
```php
'default' => env('MAIL_MAILER', 'log'),
```
The `default` configuration key defines which mailer should be used by the application if another mailer is not explicitly specified when sending an email. This value relies on an environment variable (`MAIL_MAILER`) with a fallback to `'log'`, which logs emails instead of sending them.

## Mailer Configurations
The following section details the available mailers configured in the application.

### SMTP Mailer
```php
'smtp' => [
    'transport' => 'smtp',
    'scheme' => env('MAIL_SCHEME'),
    'url' => env('MAIL_URL'),
    'host' => env('MAIL_HOST', '127.0.0.1'),
    'port' => env('MAIL_PORT', 2525),
    'username' => env('MAIL_USERNAME'),
    'password' => env('MAIL_PASSWORD'),
    'timeout' => null,
    'local_domain' => env('MAIL_EHLO_DOMAIN', parse_url(env('APP_URL', 'http://localhost'), PHP_URL_HOST)),
],
```
- **Purpose**: Configures the SMTP mailer for sending emails.
- **Parameters**:
  - `transport`: Specifies the transport method as 'smtp'.
  - `scheme`: The scheme to use (e.g., smtp, ssl, etc.) from the environment variable.
  - `url`: The URL to connect to the SMTP server.
  - `host`: The server's host address, defaulting to `127.0.0.1`.
  - `port`: Port to connect to the SMTP server, default is `2525`.
  - `username`: Username for SMTP authentication.
  - `password`: Password for SMTP authentication.
  - `timeout`: Timeout duration for the connection (null means no timeout).
  - `local_domain`: Local domain used in EHLO smtp command.

### SES Mailer
```php
'ses' => [
    'transport' => 'ses',
],
```
- **Purpose**: Configures Amazon SES (Simple Email Service) as the transport method.
- **Parameters**: 
  - `transport`: The transport method used, which is 'ses'.

### Postmark Mailer
```php
'postmark' => [
    'transport' => 'postmark',
    // 'message_stream_id' => env('POSTMARK_MESSAGE_STREAM_ID'),
    // 'client' => [
    //     'timeout' => 5,
    // ],
],
```
- **Purpose**: Configures Postmark as the mail transport.
- **Parameters**:
  - `transport`: Indicates 'postmark'.
  - Additional settings for message stream ID and client timeout can be uncommented and configured.

### Resend Mailer
```php
'resend' => [
    'transport' => 'resend',
],
```
- **Purpose**: Configures the Resend service as the mail transport.
- **Parameters**:
  - `transport`: Defines the transport as 'resend'.

### Sendmail Mailer
```php
'sendmail' => [
    'transport' => 'sendmail',
    'path' => env('MAIL_SENDMAIL_PATH', '/usr/sbin/sendmail -bs -i'),
],
```
- **Purpose**: Configures the Sendmail transport for sending emails directly.
- **Parameters**:
  - `transport`: Set to 'sendmail'.
  - `path`: Specifies the sendmail path; defaults to `/usr/sbin/sendmail -bs -i`.

### Log Mailer
```php
'log' => [
    'transport' => 'log',
    'channel' => env('MAIL_LOG_CHANNEL'),
],
```
- **Purpose**: Configures the logging of emails instead of sending them.
- **Parameters**: 
  - `transport`: Value is 'log'.
  - `channel`: Specifies the logging channel to use for storing email logs.

### Array Mailer
```php
'array' => [
    'transport' => 'array',
],
```
- **Purpose**: Configures the Array mail transport, useful for testing purposes.
- **Parameters**:
  - `transport`: Set to 'array'.

### Failover Mailer
```php
'failover' => [
    'transport' => 'failover',
    'mailers' => [
        'smtp',
        'log',
    ],
],
```
- **Purpose**: Configures a failover mechanism that switches to a backup mailer if the primary fails.
- **Parameters**:
  - `transport`: Defines the type as 'failover'.
  - `mailers`: An array of mailers (`smtp`, `log`) that will be attempted in order.

### Roundrobin Mailer
```php
'roundrobin' => [
    'transport' => 'roundrobin',
    'mailers' => [
        'ses',
        'postmark',
    ],
],
```
- **Purpose**: Configures a round-robin mechanism to distribute email sending across multiple mailers.
- **Parameters**:
  - `transport`: Set as 'roundrobin'.
  - `mailers`: An array with available mailers (`ses`, `postmark`).

## Global "From" Address
```php
'from' => [
    'address' => env('MAIL_FROM_ADDRESS', 'hello@example.com'),
    'name' => env('MAIL_FROM_NAME', 'Example'),
],
```
- **Purpose**: Defines the global 'from' address for all outgoing emails.
- **Parameters**:
  - `address`: The email address from which emails will be sent, defaulting to `hello@example.com`.
  - `name`: The name that will be displayed as the sender, defaulting to 'Example'.

## Conclusion
The `mail.php` configuration file is crucial for managing how emails are sent from a Laravel application. It provides a flexible, declarative approach to setting up