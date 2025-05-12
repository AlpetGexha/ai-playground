# Documentation: NewPasswordController.php

Original file: `app/Http\Controllers\Auth\NewPasswordController.php`

# NewPasswordController Documentation

## Table of Contents
- [Introduction](#introduction)
- [Methods](#methods)
  - [create](#create)
  - [store](#store)
- [Routes](#routes)

## Introduction
The `NewPasswordController` is a part of the authentication module within a Laravel application, specifically designed to handle the process of resetting a user's password. This controller provides the functionality to display the password reset page and process new password requests from users. It is responsible for validating the input, resetting the password, and returning appropriate responses. The controller leverages Laravel's built-in password reset features to streamline security and user experience.

## Methods

### create
```php
public function create(Request $request): Response
```
#### Purpose
The `create` method displays the password reset page where users can enter their new password.

#### Parameters
- **Request $request**: The incoming HTTP request, containing the email and token required for password reset.

#### Return Value
- **Response**: An Inertia response that renders the `auth/reset-password` view, along with the user's email and token.

#### Functionality
- This method accepts a `Request` object as input.
- It retrieves the email from the request and the password reset token from the route.
- The method returns an Inertia response that renders a password reset view, embedding the email and token as props for use in the frontend.

### store
```php
public function store(Request $request): RedirectResponse
```
#### Purpose
The `store` method processes the incoming request to update the user's password.

#### Parameters
- **Request $request**: The incoming HTTP request containing the token, email, new password, and password confirmation.

#### Return Value
- **RedirectResponse**: A redirect response to the login page upon successful password reset or throws a validation exception if the reset fails.

#### Functionality
1. **Validation**: 
   - The method begins by validating the incoming request to ensure that:
     - The token is present.
     - The email is valid and required.
     - The password meets the criteria (required, confirmed, and follows default password rules).
   - If validation fails, a validation exception is thrown.

2. **Password Reset Attempt**:
   - It calls the `Password::reset()` method, passing the required credentials including email, password, password confirmation, and token.
   - If the password reset is successful, the user is updated:
     - The password is hashed and saved in the database.
     - A new random `remember_token` is generated for the user.
     - The `PasswordReset` event is fired to notify any listeners of this change.

3. **Response Handling**:
   - If the password reset status is successful (`Password::PasswordReset`), it redirects the user to the login page with a success status message.
   - If the password reset fails, it throws a validation exception with an appropriate message indicating the error.

## Routes
This controller is typically associated with the following routes:
- `GET /password/reset` - Maps to the `create` method to show the reset password form.
- `POST /password/reset` - Maps to the `store` method to handle the form submission for resetting the password.

### Example Route Definition in `web.php`
```php
Route::get('/password/reset', [NewPasswordController::class, 'create'])->name('password.request');
Route::post('/password/reset', [NewPasswordController::class, 'store'])->name('password.update');
```

This documentation provides an overview of the `NewPasswordController`, outlining its purpose, the methods it offers, and the routes it handles within a Laravel application. It is useful for developers working with this codebase to understand how to efficiently manage password resets.