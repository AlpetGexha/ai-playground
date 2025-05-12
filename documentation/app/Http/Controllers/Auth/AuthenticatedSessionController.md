# Documentation: AuthenticatedSessionController.php

Original file: `app/Http\Controllers\Auth\AuthenticatedSessionController.php`

# AuthenticatedSessionController Documentation

## Table of Contents
- [Introduction](#introduction)
- [Methods](#methods)
  - [create(Request $request): Response](#create)
  - [store(LoginRequest $request): RedirectResponse](#store)
  - [destroy(Request $request): RedirectResponse](#destroy)
- [Routes Handled](#routes-handled)

## Introduction
The `AuthenticatedSessionController` is a controller class in a Laravel application that manages user authentication sessions. It handles the display of the login page, processes user login requests, and manages user logouts. This controller utilizes Inertia.js for rendering the login view and interacts with Laravel's built-in authentication features to ensure secure login and logout processes. 

It acts as a bridge between the user's requests (login, logout) and the underlying authentication logic of the application.

## Methods

### create(Request $request): Response
This method renders the login page.

#### Parameters
- `Request $request`: The incoming HTTP request instance used to retrieve session data.

#### Return Value
- `Response`: An Inertia response which renders the login view.

#### Functionality
The `create` method checks if the password reset route is defined and passes this information along with any session status (if available) to the view. This information is used in the login view to provide users with options to reset their passwords if necessary.

```php
public function create(Request $request): Response
{
    return Inertia::render('auth/login', [
        'canResetPassword' => Route::has('password.request'),
        'status' => $request->session()->get('status'),
    ]);
}
```

### store(LoginRequest $request): RedirectResponse
This method is responsible for handling incoming authentication requests.

#### Parameters
- `LoginRequest $request`: An instance of a custom request that validates the login data.

#### Return Value
- `RedirectResponse`: A redirect response that sends the user to the intended URL or the dashboard.

#### Functionality
The `store` method utilizes the `LoginRequest` to validate the user's credentials. Upon successful authentication, it regenerates the session to prevent session fixation attacks. Finally, it redirects the user to the intended route, which is typically the dashboard if no intended URL is found.

```php
public function store(LoginRequest $request): RedirectResponse
{
    $request->authenticate();

    $request->session()->regenerate();

    return redirect()->intended(route('dashboard', absolute: false));
}
```

### destroy(Request $request): RedirectResponse
This method handles user logout.

#### Parameters
- `Request $request`: The incoming HTTP request instance.

#### Return Value
- `RedirectResponse`: A redirect response that sends the user back to the home page.

#### Functionality
The `destroy` method logs out the user by calling Laravel's authentication guard to invalidate the session. It also performs further housekeeping by invalidating the session and regenerating the CSRF token to enhance security. Once completed, the user is redirected to the home page.

```php
public function destroy(Request $request): RedirectResponse
{
    Auth::guard('web')->logout();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return redirect('/');
}
```

## Routes Handled
The `AuthenticatedSessionController` typically handles the following routes in the application:

- **GET /login**: Displays the login page by invoking the `create` method.
- **POST /login**: Authenticates the user by invoking the `store` method.
- **POST /logout**: Logs out the user and redirects to the home page by invoking the `destroy` method.

These routes are defined within the `web.php` file of the Laravel application, and they're associated with the respective controller methods for efficient handling of authentication-related requests. 

This documentation aims to provide developers with a clear understanding of the `AuthenticatedSessionController` functionality and its significance within the Laravel application for managing user authentication sessions.