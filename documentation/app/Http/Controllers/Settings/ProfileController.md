# Documentation: ProfileController.php

Original file: `app/Http\Controllers\Settings\ProfileController.php`

# ProfileController Documentation

## Table of Contents
- [Introduction](#introduction)
- [Methods](#methods)
  - [edit(Request $request): Response](#editrequest-request)
  - [update(ProfileUpdateRequest $request): RedirectResponse](#updateprofileupdaterequest-request)
  - [destroy(Request $request): RedirectResponse](#destroyrequest-request)
- [Routes Handled](#routes-handled)
- [Conclusion](#conclusion)

## Introduction
The `ProfileController` class is a part of the settings module in a Laravel application. It is responsible for handling the user's profile settings, which includes displaying the profile settings page, updating profile information, and deleting user accounts. By encapsulating these functionalities, the controller facilitates a clean interaction between the user interface and the underlying data model.

## Methods

### `edit(Request $request): Response`
This method displays the user's profile settings page.

#### Parameters
- `Request $request`: An instance of the request that contains the user's session data and authentication status.

#### Return Value
- `Response`: An Inertia response rendering the profile settings view.

#### Functionality
The `edit` method performs the following:
1. It checks if the authenticated user needs to verify their email by using the `MustVerifyEmail` contract.
2. It retrieves the `status` from the session which may contain feedback messages (e.g., success or error messages).
3. It renders the `settings/profile` Inertia view, passing it the verification requirement status and any status messages.

```php
public function edit(Request $request): Response
{
    return Inertia::render('settings/profile', [
        'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
        'status' => $request->session()->get('status'),
    ]);
}
```

### `update(ProfileUpdateRequest $request): RedirectResponse`
This method updates the user's profile settings.

#### Parameters
- `ProfileUpdateRequest $request`: A validated request object that contains the user's input data for profile updates.

#### Return Value
- `RedirectResponse`: A redirect response that leads the user back to the profile edit page.

#### Functionality
The `update` method executes the following steps:
1. It fills the authenticated user's model attributes with the validated data from the request.
2. If the user has changed their email address, it resets the `email_verified_at` timestamp to null, requiring verification of the new email.
3. The updated user model is then saved to the database.
4. Finally, the user is redirected back to the profile edit page.

```php
public function update(ProfileUpdateRequest $request): RedirectResponse
{
    $request->user()->fill($request->validated());

    if ($request->user()->isDirty('email')) {
        $request->user()->email_verified_at = null;
    }

    $request->user()->save();

    return to_route('profile.edit');
}
```

### `destroy(Request $request): RedirectResponse`
This method deletes the user's account.

#### Parameters
- `Request $request`: An instance of the request that contains the user's authentication information and session data.

#### Return Value
- `RedirectResponse`: A redirect response that brings the user back to the home page.

#### Functionality
The `destroy` method follows these steps:
1. It validates the request to ensure the user has provided their current password for confirmation.
2. The authenticated user is retrieved, and the user is logged out.
3. The user account is then permanently deleted from the database.
4. The user’s session is invalidated, and a new CSRF token is generated for security purposes.
5. Lastly, the method redirects the user to the home page.

```php
public function destroy(Request $request): RedirectResponse
{
    $request->validate([
        'password' => ['required', 'current_password'],
    ]);

    $user = $request->user();

    Auth::logout();

    $user->delete();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return redirect('/');
}
```

## Routes Handled
The `ProfileController` is typically mapped to web routes in Laravel, commonly using the following routes:
- `GET /settings/profile/edit` → `ProfileController@edit`
- `POST /settings/profile/update` → `ProfileController@update`
- `DELETE /settings/profile` → `ProfileController@destroy`

These routes manage the interactions for viewing, updating, and deleting user profile settings.

## Conclusion
The `ProfileController` plays a crucial role in managing user profile functionalities in the Laravel application. Its methods provide a structured approach to viewing, updating, and deleting user data while ensuring that necessary checks and balances (like email verification) are maintained. This comprehensive understanding of the controller aids developers in maintaining and extending the application while preserving data integrity and user experience.