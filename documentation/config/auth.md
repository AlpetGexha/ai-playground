# Documentation: auth.php

Original file: `config/auth.php`

# auth.php Configuration File Documentation

## Table of Contents
- [Introduction](#introduction)
- [Authentication Defaults](#authentication-defaults)
- [Authentication Guards](#authentication-guards)
- [User Providers](#user-providers)
- [Resetting Passwords](#resetting-passwords)
- [Password Confirmation Timeout](#password-confirmation-timeout)

## Introduction
The `auth.php` configuration file in a Laravel application manages the authentication settings required to handle user authentication and password resets effectively. This file defines the default guards, providers, and settings used by Laravel for authenticating users and handling password-related functionalities.

## Authentication Defaults
```php
'defaults' => [
    'guard' => env('AUTH_GUARD', 'web'),
    'passwords' => env('AUTH_PASSWORD_BROKER', 'users'),
],
```
### Purpose
The `defaults` section establishes the baseline configuration for the authentication system.

### Parameters
- **guard**: This parameter specifies the default authentication guard. It retrieves its value from the environment variable `AUTH_GUARD`, defaulting to `'web'` if the variable is not set.
- **passwords**: This parameter indicates the default password reset broker, sourced from the environment variable `AUTH_PASSWORD_BROKER`, defaulting to `'users'`.

## Authentication Guards
```php
'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],
],
```
### Purpose
The `guards` section defines the various authentication mechanisms (guards) that can be used in the application.

### Parameters
- **web**: The default guard used for web applications.
  - **driver**: Specifies the mechanism used for managing authentication sessions. In this case, it uses the `session` driver.
  - **provider**: Points to the user provider; here, it refers to `users`.

### Functionality
Guards manage the state of authentication and how users are authenticated based on a specific context (such as web or API). The default implementation uses session-based authentication and the Eloquent user provider.

## User Providers
```php
'providers' => [
    'users' => [
        'driver' => 'eloquent',
        'model' => env('AUTH_MODEL', App\Models\User::class),
    ],
    // 'users' => [
    //     'driver' => 'database',
    //     'table' => 'users',
    // ],
],
```
### Purpose
The `providers` section is responsible for defining how users are retrieved from the database or storage systems.

### Parameters
- **users**: A user provider that indicates how user records are fetched.
  - **driver**: Specifies the underlying implementation; in this case, it uses the `eloquent` driver to interact with a model.
  - **model**: Defines which model to utilize for user authentication, sourced from the `AUTH_MODEL` environment variable, defaulting to `App\Models\User::class`.

### Functionality
User providers dictate how user data is retrieved, whether through Eloquent models or a database query. Multiple providers can be added if the application requires different authentication contexts, such as retrieving users from different tables.

## Resetting Passwords
```php
'passwords' => [
    'users' => [
        'provider' => 'users',
        'table' => env('AUTH_PASSWORD_RESET_TOKEN_TABLE', 'password_reset_tokens'),
        'expire' => 60,
        'throttle' => 60,
    ],
],
```
### Purpose
The `passwords` section configures the password reset functionality within the application.

### Parameters
- **users**: Configuration for the user password reset settings.
  - **provider**: The user provider utilized when resetting passwords.
  - **table**: Specifies the table name for storing password reset tokens, defaulting to `password_reset_tokens`.
  - **expire**: Defines the expiry time (in minutes) for the password reset token; here, it is set to `60` minutes.
  - **throttle**: Indicates the time (in seconds) a user must wait before generating additional password reset tokens, set to `60` seconds.

### Functionality
This section manages the password reset process, including the storage of tokens and their lifetime, thus enhancing security by ensuring tokens only remain valid for a limited duration.

## Password Confirmation Timeout
```php
'password_timeout' => env('AUTH_PASSWORD_TIMEOUT', 10800),
```
### Purpose
This setting controls the timeout for password confirmation screens.

### Parameters
- **password_timeout**: Sets the duration (in seconds) before the password confirmation window expires. Default is set to `10800` seconds (or 3 hours).

### Functionality
When users are asked to confirm their password, this timeout dictates how long they have to provide the correct password before being required to re-enter it. This adds an additional layer of security to sensitive operations.

---

With this documentation, developers can effectively understand the purpose of each configuration in the `auth.php` file and the role it plays in maintaining a secure and efficient authentication system within a Laravel application.