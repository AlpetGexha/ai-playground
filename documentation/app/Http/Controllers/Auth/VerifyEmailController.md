# Documentation: VerifyEmailController.php

Original file: `app/Http\Controllers\Auth\VerifyEmailController.php`

# VerifyEmailController Documentation

## Table of Contents
- [Introduction](#introduction)
- [__invoke Method](#invoke-method)
- [Routes](#routes)

## Introduction
The `VerifyEmailController` is part of the authentication system in a Laravel application responsible for handling email verification. This controller defines the behavior for marking a user's email address as verified and triggering events associated with that process. When a user clicks on the email verification link, this controller processes the request and, if necessary, changes the verification status of the user's email. This helps ensure that users are interacting with the application using verified email addresses, promoting security and reliability.

## __invoke Method

### Purpose
The `__invoke` method serves as the main entry point for handling email verification requests. It processes incoming requests that contain email verification tokens and manages user email verification status.

### Parameters
- `EmailVerificationRequest $request`: An instance of the `EmailVerificationRequest` class that encapsulates the incoming request data, including the user's information and the verification token.

### Return Values
- `RedirectResponse`: Returns an instance of `RedirectResponse`, which directs the user to a location (typically the dashboard) after processing the verification request.

### Functionality
The `__invoke` method follows these key steps:

1. **Check if Email is Already Verified**: 
   - It first checks whether the authenticated user has already verified their email address using the `hasVerifiedEmail()` method.
   - If verified, the user is redirected to the dashboard with a query parameter indicating successful verification.

2. **Mark Email as Verified**: 
   - If the email is not verified, it attempts to mark the email as verified by calling the `markEmailAsVerified()` method on the user instance.
   - If successful, it retrieves the user instance into a variable `$user`.

3. **Trigger Verified Event**: 
   - Upon successful verification, it triggers the `Verified` event to notify the application and any listeners that the user's email has been verified. This is useful for logging, analytics, or notifying services.

4. **Redirect to Dashboard**: 
   - Finally, the method redirects the user to the dashboard, appending the verified query parameter to the URL to indicate that the email was successfully verified.

### Code Block
```php
public function __invoke(EmailVerificationRequest $request): RedirectResponse
{
    if ($request->user()->hasVerifiedEmail()) {
        return redirect()->intended(route('dashboard', absolute: false) . '?verified=1');
    }

    if ($request->user()->markEmailAsVerified()) {
        /** @var \Illuminate\Contracts\Auth\MustVerifyEmail $user */
        $user = $request->user();

        event(new Verified($user));
    }

    return redirect()->intended(route('dashboard', absolute: false) . '?verified=1');
}
```

## Routes
The `VerifyEmailController` typically handles routes related to email verification in the application. The routes are generally defined in the `routes/web.php` or `routes/api.php` file using built-in Laravel functionality. Here is a standard route definition for email verification:

```php
Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
    ->name('verification.verify');
```

### Route Details
- **URI**: `/email/verify/{id}/{hash}`
- **Method**: GET
- **Controller**: `VerifyEmailController`
- **Method**: `__invoke`
- **Parameters**:
  - `{id}`: The ID of the user whose email is being verified.
  - `{hash}`: A hash used to verify the authenticity of the request.
- **Name**: `verification.verify`

This route listens for GET requests at the specified URI and invokes the `__invoke` method of the `VerifyEmailController`, facilitating the email verification process.

This documentation provides clarity on how the `VerifyEmailController` operates within the Laravel application and serves as a reference for any developer looking to understand, implement, or modify the email verification feature.