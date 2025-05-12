# Documentation: EmailVerificationPromptController.php

Original file: `app/Http\Controllers\Auth\EmailVerificationPromptController.php`

# EmailVerificationPromptController Documentation

## Table of Contents
- [Introduction](#introduction)
- [Methods](#methods)
  - [__invoke(Request $request)](#invoke-request)
- [Routes Handled](#routes-handled)

## Introduction
The `EmailVerificationPromptController` is a crucial component of the authentication flow in a Laravel application. Its primary role is to manage the user experience concerning email verification, ensuring that users are prompted to verify their email addresses when necessary. This controller leverages the Inertia.js framework to render views, providing a smooth single-page application (SPA) experience. The controller checks if a user has verified their email upon access, redirecting verified users to their dashboard while presenting an email verification prompt to those who have not.

## Methods

### __invoke(Request $request)
```php
public function __invoke(Request $request): Response|RedirectResponse
```

- **Purpose**: 
  The `__invoke` method serves as the main entry point for the controller, handling the logic to determine if a user should be redirected to their dashboard or presented with the email verification page.

- **Parameters**:
  - `Request $request`: An instance of the HTTP request containing user data and session information.

- **Return Value**:
  - Returns either an `Inertia\Response` object to render the email verification page or a `RedirectResponse` object to redirect the user to the intended dashboard.

- **Functionality**:
  1. The method first checks if the currently authenticated user has verified their email by calling the `hasVerifiedEmail()` method on the `user` object retrieved from the request.
  2. If the email is verified, the user is redirected to the intended route, typically the dashboard.
  3. If the email is not verified, the method returns an Inertia view for the email verification page, passing along the current status from the session, which can include messages indicating the verification status or instructions.

```php
return $request->user()->hasVerifiedEmail()
                ? redirect()->intended(route('dashboard', absolute: false))
                : Inertia::render('auth/verify-email', ['status' => $request->session()->get('status')]);
```

### Important Notes:
- The use of Inertia allows for smooth transitions and state management within a single-page application context.
- The method leverages Laravel's built-in session handling to provide contextual feedback to users regarding their email verification status.

## Routes Handled
The `EmailVerificationPromptController` is typically associated with the route that displays the email verification prompt. This can be defined in the `web.php` routes file:

```php
Route::get('/verify-email', EmailVerificationPromptController::class)->name('verification.notice');
```

This route allows users to access the email verification prompt via the `/verify-email` URI while making use of the controller's `__invoke` method.

By effectively controlling access and guiding users through the email verification process, the `EmailVerificationPromptController` ensures a secure authentication workflow within the application.