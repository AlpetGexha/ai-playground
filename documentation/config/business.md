# Documentation: business.php

Original file: `config/business.php`

# business.php Configuration File Documentation

## Table of Contents
- [Introduction](#introduction)
- [Configuration Settings](#configuration-settings)
  - [Business Information](#business-information)
  - [Social Media Links](#social-media-links)
  - [Business Type](#business-type)
  - [Description](#description)
  - [Specialties](#specialties)
  
## Introduction
The `business.php` configuration file is a foundational part of a Laravel application that encapsulates essential information about the business. This information is primarily leveraged by AI agents, particularly for social media optimization tasks. It provides key data points such as the business name, contact details, location, and specifics about the services offered, enabling smooth integration with various components of the application that might need access to this metadata.

## Configuration Settings

### Business Information
```php
'name' => env('BUSINESS_NAME', 'Hotel Driada'),
'phone' => env('BUSINESS_PHONE', '+383 44 567 631'),
'location' => env('BUSINESS_LOCATION', 'Pika e Zez, Gjakove'),
```
- **Purpose**: Contains the basic identification information of the business.
  
| Parameter | Description                           | Type   | Default Value              |
|-----------|---------------------------------------|--------|-----------------------------|
| `name`    | The official name of the business    | String | `Hotel Driada`            |
| `phone`   | Contact phone number                  | String | `+383 44 567 631`         |
| `location`| Physical address of the business      | String | `Pika e Zez, Gjakove`     |

### Social Media Links
```php
'social_media' => [
    'facebook' => env('BUSINESS_FACEBOOK', ''),
    'instagram' => env('BUSINESS_INSTAGRAM', ''),
],
```
- **Purpose**: Holds the social media handles for the business, which can be used for marketing and branding efforts.

| Parameter   | Description                      | Type   | Default Value |
|-------------|----------------------------------|--------|---------------|
| `facebook`  | Facebook page link               | String | `''`          |
| `instagram` | Instagram handle link             | String | `''`          |

### Business Type
```php
'business_type' => env('BUSINESS_TYPE', 'hotel_restaurant'), // hotel, restaurant, hotel_restaurant
```
- **Purpose**: Defines the type of business, which could affect certain business logic throughout the application.

| Parameter      | Description                          | Type   | Default Value        |
|----------------|--------------------------------------|--------|----------------------|
| `business_type`| The classification of the business   | String | `hotel_restaurant`   |

### Description
```php
'description' => env('BUSINESS_DESCRIPTION', 'A beautiful hotel and restaurant offering excellent accommodation and dining experience.'),
```
- **Purpose**: Provides a brief description of the business, which may be used in automated responses or promotional materials.

| Parameter   | Description                                | Type   | Default Value                                                   |
|-------------|--------------------------------------------|--------|---------------------------------------------------------------|
| `description`| A summary of what the business offers      | String | `A beautiful hotel and restaurant offering excellent accommodation and dining experience.` |

### Specialties
```php
'specialties' => [
    'hotel' => [
        'Comfortable rooms',
        'Excellent service',
        'Great location',
    ],
    'restaurant' => [
        'Local cuisine',
        'Fresh ingredients',
        'Cozy atmosphere',
    ],
],
```
- **Purpose**: Lists the specific specialties offered by the business in two categories: hotel and restaurant.

| Category     | Specialties                         |
|--------------|-------------------------------------|
| `hotel`      | - Comfortable rooms                 |
|              | - Excellent service                 |
|              | - Great location                    |
| `restaurant` | - Local cuisine                     |
|              | - Fresh ingredients                 |
|              | - Cozy atmosphere                   |

## Conclusion
This configuration file plays a crucial role in maintaining important business-specific settings for the Laravel application. By using environment variables, it allows for easy updates and secure management of sensitive information. Understanding how these parameters work together ensures that developers can customize and optimize the application to better serve business needs.