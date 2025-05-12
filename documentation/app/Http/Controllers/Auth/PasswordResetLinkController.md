# Documentation: PasswordResetLinkController.php

Original file: `app/Http\Controllers\Auth\PasswordResetLinkController.php`

# PasswordResetLinkController Documentation

## Table of Contents
- [Introduction](#introduction)
- [Methods](#methods)
  - [create(Request $request): Response](#createrequest-request-response)
  - [store(Request $request): RedirectResponse](#storerrequest-request-redirectresponse)
- [Routes](#routes)

## Introduction
The `PasswordResetLinkController` is responsible for managing the password reset link requests within the authentication layer of a Laravel application. This controller provides functionalities for displaying the password reset link request form and handling the submission of that form. It ensures that users can recover their accounts by initiating a password reset process if they have forgotten their password.

## Methods

### create(Request $request): Response
This method displays the password reset link request page.

#### Parameters
- `Request $request`: An instance of the HTTP request, which can be used to access input data and session data.

#### Return Values
- `Response`: Returns an Inertia response rendering the password reset view.

#### Functionality
The `create` method retrieves any session status that may indicate the result of previous actions (e.g., success messages) and renders the `auth/forgot-password` view via Inertia. This allows for a clean and reactive front-end experience while handling user authentication.

```php
public function create(Request $request): Response
{
    return Inertia::render('auth/forgot-password', [
        'status' => $request->session()->get('status'),
    ]);
}
```

### store(Request $request): RedirectResponse
This method handles the incoming password reset link request.

#### Parameters
- `Request $request`: An instance of the HTTP request containing the email to which the reset link should be sent.

#### Return Values
- `RedirectResponse`: Redirects the user back to the previous page with a status message indicating whether the request was successful.

#### Functionality
The `store` method first validates the incoming request to ensure that an email address is provided and is formatted correctly. If validation passes, it utilizes the `Password` facade to send a password reset link to the specified email address. Regardless of whether the email exists in the database or not, it returns a response back to the user stating that a reset link will be sent if the account exists, maintaining the security of the application.

```php
public function store(Request $request): RedirectResponse
{
    $request->validate([
        'email' => 'required|email',
    ]);

    Password::sendResetLink(
        $request->only('email')
    );

    return back()->with('status', __('A reset link will be sent if the account exists.'));
}
```

## Routes
The methods within the `PasswordResetLinkController` are typically accessed through the following routes:

```php
Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
    ->name('password.request');

Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
    ->name('password.email');
```

- **GET /forgot-password**: Displays the password reset request form handled by the `create` method.
- **POST /forgot-password**: Handles the password reset link request submitted by the user, processed by the `store` method. 

This controller is a vital part of the authentication workflow, allowing users to recover access to their accounts securely.