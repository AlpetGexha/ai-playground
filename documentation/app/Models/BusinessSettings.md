# Documentation: BusinessSettings.php

Original file: `app/Models\BusinessSettings.php`

# BusinessSettings Documentation

## Table of Contents
- [Introduction](#introduction)
- [Class Attributes](#class-attributes)
- [Methods](#methods)
  - [current()](#current)

## Introduction

The `BusinessSettings.php` file is a model in the Laravel application that represents the business settings of an organization. This model leverages Eloquent ORM, which is part of the Laravel framework, to facilitate database interactions. It is primarily responsible for storing and managing configuration details such as the business name, type, contact information, and social media links. 

This model plays a crucial role in ensuring that all business-related settings are centralized, making it easier for the application to retrieve and manipulate settings dynamically. Notably, it includes a mechanism to ensure that default settings are created when no settings exist in the database.

## Class Attributes

The `BusinessSettings` model contains the following attributes which are mass assignable:

| Attribute           | Type   | Description                                              |
|---------------------|--------|----------------------------------------------------------|
| `business_name`     | string | The name of the business.                                |
| `business_type`     | string | The type of business (options: hotel, restaurant, both).|
| `phone`             | string | The contact phone number of the business.               |
| `address`           | string | The physical address of the business.                   |
| `email`             | string | The contact email address of the business.              |
| `website`           | string | The official website URL of the business.               |
| `social_facebook`   | string | The Facebook link of the business.                       |
| `social_instagram`  | string | The Instagram link of the business.                      |
| `social_twitter`    | string | The Twitter link of the business.                        |
| `social_linkedin`   | string | The LinkedIn link of the business.                       |
| `logo_path`         | string | The file path to the business logo.                      |
| `description`       | string | A brief description of the business.                    |
| `slogan`            | string | The slogan or tagline of the business.                   |
| `opening_hours`     | string | The operational hours of the business.                  |

## Methods

### current()

```php
public static function current()
```

#### Purpose
The `current` method is designed to retrieve the current business settings record. If no record exists, it will automatically create a new default set of business settings.

#### Parameters
- None

#### Return Value
- Returns an instance of `\App\Models\BusinessSettings`.

#### Functionality
1. The method attempts to fetch the first record from the `BusinessSettings` table using Eloquent's `first()` method.
2. If no record is found (i.e., when the business settings haven't been configured), it creates a new entry with default values:
   - `business_name`: `'Hotel Driada'`
   - `business_type`: `'both'`
   - `phone`: `'+383 44 567 631'`
   - `address`: `'Pika e Zez, Gjakove'`
   - `email`: `'info@hoteldriada.com'`
   - `description`: A premium hotel and restaurant offering exceptional service and dining experiences.
3. The method then returns either the existing or newly created `BusinessSettings` instance.

This method ensures that there is always a set of business settings available for subsequent operations and enhances usability by preventing null references.

---

This documentation provides a comprehensive overview of the `BusinessSettings` model, its attributes, and its methods. Understanding this file is crucial for developers working with business configuration data within the Laravel application, as it centralizes all related information and provides mechanisms to manage it efficiently.