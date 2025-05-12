# Documentation: EmailVerificationNotificationController.php

Original file: `app/Http\Controllers\Auth\EmailVerificationNotificationController.php`

# EmailVerificationNotificationController Documentation

## Table of Contents
- [Introduction](#introduction)
- [Method: store](#store)

## Introduction
The `EmailVerificationNotificationController` class is a part of the authentication system in the Laravel application designed to manage the process of sending email verification notifications to users. It handles the request to resend verification emails if the user's email address has not yet been verified. This functionality is important for maintaining secure user account creation and for ensuring that users have access to their accounts only after they have confirmed their email addresses.

## Method: store

### Purpose
The `store` method is responsible for sending a new email verification notification to the authenticated user. If the user's email has already been verified, it redirects them to the dashboard.

### Parameters
- **Request $request**: An instance of the `Request` class which contains the user's request data, including authentication and session data.

### Return Value
- **RedirectResponse**: The method returns an instance of `RedirectResponse` which represents a response that redirects the user's browser to a different URL. 

### Functionality
1. **Email Verification Check**: The method begins by checking whether the authenticated user has already verified their email by calling the `hasVerifiedEmail()` method on the user object.
   
2. **Redirection**: 
   - If the user has verified their email, it redirects them to the intended route specified by the 'dashboard'. The function `redirect()->intended()` is used to redirect the user to their original destination after successful login, or to the 'dashboard' route if there is no intended destination.
   
   ```php
   return redirect()->intended(route('dashboard', absolute: false));
   ```

3. **Sending Verification Notification**: 
   - If the user has not verified their email, the method proceeds to send a new email verification notification using the `sendEmailVerificationNotification()` method on the user object.
   
   ```php
   $request->user()->sendEmailVerificationNotification();
   ```

4. **Response with Status Message**: 
   - After sending the email notification, it returns back to the previous page, with a session message indicating that the verification link has been sent. This is accomplished using the `back()` function along with the `with()` method to attach the session message.
   
   ```php
   return back()->with('status', 'verification-link-sent');
   ```

### Example Usage
To use the `store` method, a user would typically send a POST request to the route associated with this controller, which is responsible for processing email verification requests. A common convention in Laravel would automatically set this up:

```php
Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])->name('verification.send');
```

### Summary
The `EmailVerificationNotificationController` class serves a critical function in user account management by ensuring that users can easily resend verification emails. The `store` method first checks for existing verification, sends an email if necessary, and provides user feedback through session-based messages, all while maintaining a clean and efficient flow. This implementation aligns with Laravel's design philosophy, enhancing the user experience and security of the application.