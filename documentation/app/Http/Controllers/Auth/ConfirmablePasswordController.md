# Documentation: ConfirmablePasswordController.php

Original file: `app/Http\Controllers\Auth\ConfirmablePasswordController.php`

# ConfirmablePasswordController Documentation

## Table of Contents
- [Introduction](#introduction)
- [show() Method](#show-method)
- [store() Method](#store-method)
- [Routes](#routes)

## Introduction
The `ConfirmablePasswordController` is responsible for managing password confirmation processes within the Laravel application. This controller provides functionality for showing a password confirmation page and handling the confirmation logic when a user attempts to execute sensitive actions that require re-verification of their password. It integrates with the Laravel authentication system to ensure users are securely validated before proceeding.

## show() Method

### Purpose
The `show()` method displays the password confirmation page to the user. This page prompts the user to input their current password in order to verify their identity before performing sensitive operations.

### Parameters
- **None**

### Return Value
- **Response**: Returns an Inertia Response rendering the `auth/confirm-password` view.

### Functionality
The `show()` method utilizes the Inertia.js framework to render a frontend component for confirming the user's password. This component is designed to provide a seamless interface connection between the backend Laravel logic and the frontend user experience.

```php
public function show(): Response
{
    return Inertia::render('auth/confirm-password');
}
```

## store() Method

### Purpose
The `store()` method is responsible for validating the user's password confirmation request. If the password is confirmed as valid, the session is updated to indicate that the password has been confirmed, allowing the user to proceed to their intended destination.

### Parameters
- **Request $request**: The HTTP request containing the password input and associated user data.

### Return Value
- **RedirectResponse**: Redirects the user to the intended route, usually a dashboard or a critical section of the application.

### Functionality
1. **Validation**: 
   - The method utilizes Laravel's `Auth` facade to validate the user's email and password against the currently authenticated user.
   - If the validation fails, a `ValidationException` is thrown with a relevant error message.
   
2. **Session Storage**:
   - Upon successful validation, the method records a timestamp in the session (`auth.password_confirmed_at`) to indicate that the password confirmation was successful.
   
3. **Redirection**:
   - Finally, the user is redirected to their intended route (defaulting to a dashboard) if they successfully confirm their password.

```php
public function store(Request $request): RedirectResponse
{
    if (! Auth::guard('web')->validate([
        'email' => $request->user()->email,
        'password' => $request->password,
    ])) {
        throw ValidationException::withMessages([
            'password' => __('auth.password'),
        ]);
    }

    $request->session()->put('auth.password_confirmed_at', time());

    return redirect()->intended(route('dashboard', absolute: false));
}
```

## Routes
This controller handles the following routes:
- `GET /confirm-password`: Displays the password confirmation page (`show` method).
- `POST /confirm-password`: Processes the password confirmation (`store` method).

These routes should be defined in the web routes file, typically found at `routes/web.php`, using the following example:

```php
Route::middleware(['auth'])->group(function () {
    Route::get('/confirm-password', [ConfirmablePasswordController::class, 'show'])->name('password.confirm');
    Route::post('/confirm-password', [ConfirmablePasswordController::class, 'store']);
});
```

This approach ensures that only authenticated users can access the password confirmation functionality.