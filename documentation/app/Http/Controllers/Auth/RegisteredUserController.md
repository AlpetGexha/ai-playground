# Documentation: RegisteredUserController.php

Original file: `app/Http\Controllers\Auth\RegisteredUserController.php`

# RegisteredUserController Documentation

## Table of Contents
- [Introduction](#introduction)
- [Methods](#methods)
  - [create](#create)
  - [store](#store)
- [Routes](#routes)
- [Model Relationships](#model-relationships)

## Introduction
The `RegisteredUserController` class is responsible for managing user registration within a Laravel application. This controller handles the display of the registration form and processes incoming registration requests. It ensures that user input is validated, creates new user records, triggers events, and facilitates authentication post-registration. This file plays a key role in the Auth module of the application, integrating Laravel's built-in user management functionalities with custom application logic.

## Methods

### create
```php
public function create(): Response
```
#### Purpose
The `create` method is responsible for displaying the user registration page.

#### Parameters
- None

#### Return Values
- Returns an `Inertia\Response` object which renders the registration view.

#### Functionality
This method uses Inertia.js to render the registration page located at `auth/register`. It does not accept any parameters and relies on the Inertia library to provide a smooth single-page application experience. 

### store
```php
public function store(Request $request): RedirectResponse
```
#### Purpose
The `store` method handles the incoming registration requests from users, validates the input data, creates a new user, and logs them in.

#### Parameters
- `Request $request`: Incoming HTTP request containing user input data.

#### Return Values
- Returns a `RedirectResponse` that redirects the user to the dashboard upon successful registration.

#### Functionality
1. **Validation**: The method first validates the incoming request data.
   - It checks that the 'name' field is required and is a string with a maximum length of 255 characters.
   - The 'email' field must be required, lowercase, valid email format, unique in the `users` table, and not exceeding 255 characters.
   - The 'password' field must be required, confirmed (match confirmation field), and conform to the default password rules set by Laravel.
   
   If validation fails, a `ValidationException` is thrown.

2. **User Creation**: If validation passes, a new user record is created. The password is hashed using Laravel's `Hash::make` function to ensure security.

3. **Event Dispatch**: After creating the user, the `Registered` event is fired, allowing any listeners to react to the new user registration (e.g., sending welcome emails).

4. **Authentication**: The newly created user is then logged in automatically using the `Auth::login` method.

5. **Redirect**: Finally, the user is redirected to the dashboard route using the `to_route` helper function.

## Routes
The `RegisteredUserController` typically handles the following routes in a Laravel application:

- **GET /register**: 
  - Maps to the `create` method to display the registration form.
  
- **POST /register**: 
  - Maps to the `store` method to handle form submissions for user registration.

## Model Relationships
The `RegisteredUserController` interacts with the `User` model, which represents the users of the application. Important attributes for the `User` model include:

| Attribute | Type      | Description                           |
|-----------|-----------|---------------------------------------|
| name      | string    | The full name of the user            |
| email     | string    | The email address of the user        |
| password  | string    | The hashed password for authentication |

### Relationships
The `User` model may have various relationships depending on your application's requirements, such as:
- **Posts**: A one-to-many relationship where a user can have multiple posts.
- **Roles**: A many-to-many relationship where users can have multiple roles assigned.

This relationship documentation may vary based on the actual implementation within the application code.

---

This comprehensive documentation serves as a guide for developers to understand the `RegisteredUserController` class, its functions, and its interactions with the user model, thus enabling smooth onboarding and seamless contributions to the PHP codebase.