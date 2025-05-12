# Documentation: ProfileUpdateRequest.php

Original file: `app/Http\Requests\Settings\ProfileUpdateRequest.php`

# ProfileUpdateRequest Documentation

## Table of Contents
- [Introduction](#introduction)
- [Method: `rules`](#method-rules)

## Introduction
The `ProfileUpdateRequest.php` file is a part of the Laravel application located in `app\Http\Requests\Settings`. Its primary role is to handle and validate incoming requests for updating user profile settings. By extending the `FormRequest` class, this file encapsulates the validation logic required to ensure that user inputs are both valid and secure before they are processed further in the application.

This request class specifically defines the validation rules for two fields: `name` and `email`. It ensures that the user can only submit valid information, preventing errors and potential security issues from invalid data types or format.

## Method: `rules`

### Purpose
The `rules()` method is responsible for defining the validation rules that will be applied to the incoming request data when attempting to update a user's profile. 

### Parameters
The `rules()` method does not take parameters directly; it relies on the internal state of the request object.

### Return Values
- **Type**: `array<string, ValidationRule|array<mixed>|string>`
  - Returns an associative array where each key corresponds to a specific field name and the value is an array of validation rules that must be satisfied by the submitted data.

### Functionality
The `rules()` method implements the following functionality:
- It defines validation rules for the `name` and `email` fields:
    - **Name Validation**:
      - **`required`**: Ensures that the `name` field is not empty.
      - **`string`**: Validates that the input is of string type.
      - **`max:255`**: Restricts the maximum length of the `name` to 255 characters.
    
    - **Email Validation**:
      - **`required`**: Ensures that the `email` field must not be empty.
      - **`string`**: Validates that the input is a string.
      - **`lowercase`**: Enforces that the input string is in lowercase.
      - **`email`**: Confirms that the string is in a valid email format.
      - **`max:255`**: Restricts the maximum length of the `email` to 255 characters.
      - **`Rule::unique(User::class)->ignore($this->user()->id)`**: Ensures that the email must be unique in the `users` table, ignoring the currently authenticated user's email. This prevents validation errors for the user updating their own profile with their current email.

### Example Code

```php
public function rules(): array
{
    return [
        'name' => ['required', 'string', 'max:255'],
        
        'email' => [
            'required',
            'string',
            'lowercase',
            'email',
            'max:255',
            Rule::unique(User::class)->ignore($this->user()->id),
        ],
    ];
}
```

### Summary
The `rules()` method ensures that requests for updating a user's profile are validated against the set criteria, promoting data integrity and user experience. By implementing these validation checks, the application can handle user input safely and effectively, reducing the risk of malformed data being processed.