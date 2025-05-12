# Documentation: User.php

Original file: `app/Models\User.php`

# User Documentation

## Table of Contents
- [Introduction](#introduction)
- [Class Overview](#class-overview)
- [Properties](#properties)
  - [fillable](#fillable)
  - [hidden](#hidden)
- [Methods](#methods)
  - [casts](#casts)

## Introduction
This documentation covers the `User` model class located in `D:\xammp\htdocs\@laravel\fun-with-openai-laravel\app\Models\User.php`. The `User` class is part of a Laravel application, serving as the interface between the application and the user data stored in the database. This model handles user data management, including attributes for authentication and password security. It utilizes Laravel's built-in features for handling authentication, serialization, and mass assignments, ensuring efficiency and security throughout user operations.

## Class Overview
The `User` class extends the `Authenticatable` class provided by Laravel, integrated with features from `HasFactory` for model factories and `Notifiable` for notifications. This class is essential for user management. By using this model, developers can control user data processes seamlessly, leveraging Laravel's ORM capabilities.

## Properties

### fillable
```php
protected $fillable = [
    'name',
    'email',
    'password',
];
```
The `$fillable` property is an array specifying the attributes that can be mass-assigned. This helps in securing your model from mass-assignment vulnerabilities. When using methods like `create()` or `update()`, only the attributes defined in this array can be assigned.

**Attributes:**
- `name`: The name of the user.
- `email`: The user's email address for authentication.
- `password`: The user's password, which will be hashed before being stored.

### hidden
```php
protected $hidden = [
    'password',
    'remember_token',
];
```
The `$hidden` property specifies the attributes that should be concealed when the model is serialized. This generally pertains to sensitive data that should not be exposed, particularly when returning user information via API responses or views.

**Hidden Attributes:**
- `password`: The user’s password (which is always stored in a hashed format).
- `remember_token`: A token used for "remember me" functionality during authentication.

## Methods

### casts
```php
protected function casts(): array
{
    return [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
```
The `casts` method returns an array that defines the data types of certain attributes. This provides automatic casting of attributes when they are accessed or modified.

**Returns:**
- An array mapping attributes to their respective data types.

**Functionality:**
- `email_verified_at`: Automatically casts to a `DateTime` instance, allowing easy manipulation and formatting of the verification date.
- `password`: Ensures that the password is always treated as a hashed string, which is crucial for security and data integrity. 

By casting these attributes, Laravel handles the formatting and interoperability of the data, making it easier for developers to work with various data types in the application. 

---

This documentation serves as a foundational guide for developers interfacing with the `User` model within the Laravel application. Understanding these elements will assist in effectively managing user data operations while maintaining secure practices.