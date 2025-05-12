# Documentation: HandleInertiaRequests.php

Original file: `app/Http\Middleware\HandleInertiaRequests.php`

# HandleInertiaRequests Documentation

## Table of Contents
- [Introduction](#introduction)
- [Class Overview](#class-overview)
    - [Properties](#properties)
- [Methods](#methods)
    - [version](#version)
    - [share](#share)

## Introduction
The `HandleInertiaRequests` class is a middleware component in a Laravel application designed for handling Inertia.js requests. Inertia.js is a framework for building single-page applications (SPAs) using classic server-side routing and controllers. This middleware manages the interaction between your Laravel back end and your Vue.js or React front end, facilitating shared data and state management.

## Class Overview
The `HandleInertiaRequests` class extends the `Middleware` class provided by the Inertia package. It is responsible for:

- Serving the initial root template for the application.
- Sharing default props with the Inertia application.
- Customizing asset versioning linked to application updates.

### Properties

| Property     | Type   | Description                                                                  |
|--------------|--------|------------------------------------------------------------------------------|
| `$rootView`  | string | The root template that is loaded on the first page visit. Default is 'app'.|

## Methods

### version
```php
public function version(Request $request): ?string
```

#### Purpose
The `version` method is responsible for determining the current asset version of your application. This is crucial for cache-busting in production environments, ensuring users always receive the latest versions of your assets.

#### Parameters
- `Request $request`: The HTTP request instance to provide context, such as the incoming request parameters.

#### Return Values
- Returns a string representing the asset version, or `null` if it cannot determine the version.

#### Functionality
This method calls the parent `version` method from the `Middleware` class and allows for additional customization if necessary. The default implementation usually manages versioning based on the last modified time of assets.

---

### share
```php
public function share(Request $request): array
```

#### Purpose
The `share` method defines global props that are shared by default across all Inertia responses. This method allows for easy access to frequently used data points within your application’s front end.

#### Parameters
- `Request $request`: The HTTP request instance which contains input data and user context.

#### Return Values
- Returns an associative array where keys are prop names and values are the data shared.

#### Functionality
1. **Inspiration Quotes**: Uses the `Inspiring` facade to retrieve a random quote and author, which is split and formatted.
2. **Default Shared Data**: Combines inherited shared data from the parent `share` method with custom data:
   - `name`: The application name fetched from the config.
   - `quote`: An associative array that includes a 'message' and 'author' from the random quote.
   - `auth`: An array containing the authenticated user, if any.
   - `ziggy`: A closure that returns route definitions and the current URL, enabling client-side navigation support.
   - `sidebarOpen`: Determines the initial state of a sidebar based on the presence and value of a cookie.
   
This method significantly enhances the user experience by providing consistent access to essential data, leading to smoother interactions within the app.

## Conclusion
The `HandleInertiaRequests` middleware is an integral part of the Laravel application when implementing Inertia.js functionality. By handling shared state and asset versioning, it bridges the back end and front end seamlessly, promoting a reactive and modern user interface. Understanding and customizing this middleware can significantly enhance application performance and user experience.