# Documentation: auth.php

Original file: `routes/auth.php`

# auth.php Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Routes Overview](#routes-overview)
   - [Guest Routes](#guest-routes)
   - [Authenticated Routes](#authenticated-routes)
3. [Controllers Handled by This File](#controllers-handled-by-this-file)
   - [RegisteredUserController](#registeredusercontroller)
   - [AuthenticatedSessionController](#authenticatedsessioncontroller)
   - [PasswordResetLinkController](#passwordresetlinkcontroller)
   - [NewPasswordController](#newpasswordcontroller)
   - [EmailVerificationPromptController](#emailverificationpromptcontroller)
   - [VerifyEmailController](#verifyemailcontroller)
   - [EmailVerificationNotificationController](#emailverificationnotificationcontroller)
   - [ConfirmablePasswordController](#confirmablepasswordcontroller)
4. [Middleware](#middleware)

## Introduction
The `auth.php` file is a crucial component of a Laravel application that manages authentication routes. It defines the endpoints for user registration, login, password reset, email verification, and session management. By organizing these routes within appropriate middleware groups, the file ensures that only guests (unauthenticated users) can access registration and login functions, while authenticated users have access to email verification, password confirmation, and logout functionalities.

## Routes Overview

### Guest Routes
These routes are accessible only by unauthenticated users. They provide functionalities for user registration, login, and password management.

| Method | URI                    | Action                                         | Name                   |
|--------|-----------------------|------------------------------------------------|------------------------|
| GET    | `register`            | Displays the registration form.                | `register`             |
| POST   | `register`            | Stores new user data after registration.       |                        |
| GET    | `login`               | Displays the login form.                       | `login`                |
| POST   | `login`               | Authenticates user credentials.                |                        |
| GET    | `forgot-password`     | Displays the password reset request form.      | `password.request`     |
| POST   | `forgot-password`     | Sends a password reset link to the email.     | `password.email`       |
| GET    | `reset-password/{token}` | Displays the password reset form.           | `password.reset`       |
| POST   | `reset-password`      | Updates the user's password.                   | `password.store`       |

### Authenticated Routes
These routes are accessible only by authenticated users. They handle email verification, password confirmation, and session termination.

| Method | URI                                           | Action                                         | Name                        |
|--------|----------------------------------------------|------------------------------------------------|-----------------------------|
| GET    | `verify-email`                               | Prompts the user to verify their email.        | `verification.notice`       |
| GET    | `verify-email/{id}/{hash}`                  | Handles email verification via a signed URL.   | `verification.verify`       |
| POST   | `email/verification-notification`            | Sends a new email verification notification.    | `verification.send`         |
| GET    | `confirm-password`                           | Displays the password confirmation form.       | `password.confirm`          |
| POST   | `confirm-password`                           | Confirms the user's password.                  |                             |
| POST   | `logout`                                    | Logs the user out of the application.          | `logout`                    |

## Controllers Handled by This File

### RegisteredUserController
- **Handles:** User registration.
- **Methods:**
  - `create()`: Displays the registration form.
  - `store()`: Validates and stores new user credentials.

### AuthenticatedSessionController
- **Handles:** User login and logout.
- **Methods:**
  - `create()`: Displays the login form.
  - `store()`: Authenticates the user and creates a session.
  - `destroy()`: Logs the user out and invalidates the session.

### PasswordResetLinkController
- **Handles:** Password reset link request.
- **Methods:**
  - `create()`: Displays the request form for password reset.
  - `store()`: Sends a password reset link to the specified email.

### NewPasswordController
- **Handles:** Password reset functionality.
- **Methods:**
  - `create()`: Displays the reset password form.
  - `store()`: Updates the user's password with the new one.

### EmailVerificationPromptController
- **Handles:** Email verification prompt for authenticated users.
- **Methods:**
  - `__invoke()`: Handles displaying the email verification notice to the user.

### VerifyEmailController
- **Handles:** Email verification process.
- **Methods:**
  - `__invoke()`: Verifies the email based on the signed URL.

### EmailVerificationNotificationController
- **Handles:** Resending email verification notifications.
- **Methods:**
  - `store()`: Sends a notification to the user for email verification.

### ConfirmablePasswordController
- **Handles:** User password confirmation when performing sensitive actions.
- **Methods:**
  - `show()`: Displays the password confirmation form.
  - `store()`: Confirms the password before allowing access to the requested action.

## Middleware
- **guest**: This middleware ensures that routes under this group are accessible only by unauthenticated users, providing a secure interface for registration and login functionalities.
- **auth**: This middleware ensures that routes under this group are accessible only by authenticated users, protecting features like email verification, password confirmation, and session management.

---

This documentation should help developers understand the purpose and functionality of the `auth.php` file within the Laravel application while providing detailed information on each route and its associated controller actions.