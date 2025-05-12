# Documentation: inertia.php

Original file: `config/inertia.php`

# inertia.php Configuration Documentation

## Table of Contents
- [Introduction](#introduction)
- [Server Side Rendering Configuration](#server-side-rendering-configuration)
- [Testing Configuration](#testing-configuration)

## Introduction
The `inertia.php` configuration file is integral to setting up Inertia.js within a Laravel application. It provides options for both server-side rendering (SSR) and testing configurations. This file helps developers streamline the initial request handling by pre-rendering pages on the server, enhancing performance and user experience. Additionally, the testing section allows for the verification of Inertia components within specified paths, ensuring robust testing practices.

## Server Side Rendering Configuration
```php
'ssr' => [
    'enabled' => true,
    'url' => 'http://127.0.0.1:13714',
    // 'bundle' => base_path('bootstrap/ssr/ssr.mjs'),
],
```

### Purpose
The server-side rendering configuration allows developers to enable or disable SSR in their application, specify the SSR service URL, and define the bundle for SSR functionality.

### Parameters
- **enabled**: A boolean value (default: `true`). When set to `true`, Inertia will utilize server-side rendering for initial page requests.
- **url**: A string URL (default: `http://127.0.0.1:13714`). This URL points to the SSR service that will handle the rendering of pages.
- **bundle**: (optional) A string path to the SSR bundle, which is commented out in the example. This should point to the JavaScript file responsible for rendering.

### Functionality
When SSR is enabled, Inertia intercepts requests to the application, rendering pages server-side before sending the HTML to the client. This results in faster page loads and improved SEO capabilities since the initial HTML is already rendered when the client requests the page.

## Testing Configuration
```php
'testing' => [
    'ensure_pages_exist' => true,
    'page_paths' => [
        resource_path('js/pages'),
    ],
    'page_extensions' => [
        'js',
        'jsx',
        'svelte',
        'ts',
        'tsx',
        'vue',
    ],
],
```

### Purpose
The testing configuration is designed to support unit testing for Inertia components. It provides options to check if required page components exist and directs tests to the appropriate file paths.

### Parameters
- **ensure_pages_exist**: A boolean value (default: `true`). If set to `true`, tests will verify that all specified page components exist within the defined paths.
- **page_paths**: An array of strings. This defines the directory paths where Inertia components are located (default: `resource_path('js/pages')`).
- **page_extensions**: An array of strings. This specifies the allowable file extensions for page components, supporting various formats like JavaScript, TypeScript, and Svelte.

### Functionality
The testing configuration allows for the use of the `assertInertia` assertion to validate the existence of Inertia components in tests. The defined paths and extensions guide the testing framework in locating relevant files, ensuring that the application is correctly structured and that components are available for rendering.

## Conclusion
The `inertia.php` configuration file plays a critical role in optimizing both the rendering of pages and the testing of components within a Laravel application using Inertia.js. By properly configuring SSR and testing parameters, developers can significantly enhance user experience and maintain application integrity through comprehensive testing practices.