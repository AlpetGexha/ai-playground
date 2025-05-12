# Documentation: session.php

Original file: `config/session.php`

# session.php Documentation

## Table of Contents
- [Introduction](#introduction)
- [Configuration Options](#configuration-options)
    - [Default Session Driver](#default-session-driver)
    - [Session Lifetime](#session-lifetime)
    - [Session Encryption](#session-encryption)
    - [Session File Location](#session-file-location)
    - [Session Database Connection](#session-database-connection)
    - [Session Database Table](#session-database-table)
    - [Session Cache Store](#session-cache-store)
    - [Session Sweeping Lottery](#session-sweeping-lottery)
    - [Session Cookie Name](#session-cookie-name)
    - [Session Cookie Path](#session-cookie-path)
    - [Session Cookie Domain](#session-cookie-domain)
    - [HTTPS Only Cookies](#https-only-cookies)
    - [HTTP Access Only](#http-access-only)
    - [Same-Site Cookies](#same-site-cookies)
    - [Partitioned Cookies](#partitioned-cookies)

## Introduction
The `session.php` configuration file in a Laravel application defines various settings related to session management. It allows developers to configure the behavior of session handling across the application, including the storage method, lifetime, security settings, and more. This configuration is crucial for maintaining user states and secure data transactions during a user's interaction with the application.

## Configuration Options

### Default Session Driver
- **Purpose:** Specifies the default session driver to be used for storing session data.
- **Parameter:** 
  - `SESSION_DRIVER`: Environment variable that determines the session storage method.
- **Default Value:** 
  - `database`
- **Functionality:** Laravel supports multiple session drivers (`file`, `cookie`, `database`, `apc`, `memcached`, `redis`, `dynamodb`, `array`). By setting the appropriate driver, developers can choose the best storage solution for their application's needs.

### Session Lifetime
- **Purpose:** Sets the duration (in minutes) that a session can remain idle before it expires.
- **Parameter:** 
  - `SESSION_LIFETIME`: Environment variable that defines the session lifetime.
- **Default Value:** 
  - `120` minutes
- **Functionality:** If `expire_on_close` is set to true, sessions will expire once the user's browser is closed.

### Session Encryption
- **Purpose:** Determines whether session data should be encrypted before storage.
- **Parameter:** 
  - `SESSION_ENCRYPT`: Environment variable to enable or disable encryption.
- **Default Value:** 
  - `false`
- **Functionality:** Encrypted sessions improve security, especially for sensitive data.

### Session File Location
- **Purpose:** Defines the file storage location for sessions when using the `file` driver.
- **Default Value:** 
  - `storage_path('framework/sessions')`
- **Functionality:** Developers can specify alternate storage paths, which may be necessary in shared hosting environments or when integrating with containers.

### Session Database Connection
- **Purpose:** Specifies which database connection to use for storing sessions when using the `database` or `redis` drivers.
- **Parameter:** 
  - `SESSION_CONNECTION`: Environment variable that defines the database connection.
- **Default Value:** 
  - Not set (depends on the application configuration).
- **Functionality:** It allows flexibility on using different database connections defined in the database configuration.

### Session Database Table
- **Purpose:** Defines the table used for storing session data when using the `database` driver.
- **Parameter:** 
  - `SESSION_TABLE`: Environment variable to specify the session table.
- **Default Value:** 
  - `sessions`
- **Functionality:** Developers can change the default table if required, allowing them to manage sessions in a custom manner.

### Session Cache Store
- **Purpose:** Defines the cache store to be used for certain session drivers.
- **Parameter:** 
  - `SESSION_STORE`: Environment variable for the cache store.
- **Functionality:** Important for session drivers that rely on cache mechanisms (`apc`, `dynamodb`, `memcached`, `redis`).

### Session Sweeping Lottery
- **Purpose:** Provides the chance that session storage will be cleaned up to remove old sessions.
- **Default Value:** 
  - `[2, 100]`
- **Functionality:** Indicates that there is a 2% chance that a session sweep will occur on a given request, ensuring resource management.

### Session Cookie Name
- **Purpose:** Specifies the name of the session cookie created by the application.
- **Parameter:** 
  - `SESSION_COOKIE`: Environment variable that defines the session cookie name.
- **Default Value:** 
  - Uses `Str::slug(env('APP_NAME', 'laravel'), '_').'_session'`
- **Functionality:** This cookie holds the session identifier and is crucial for maintaining user sessions across requests.

### Session Cookie Path
- **Purpose:** Defines the path for which the session cookie is valid.
- **Parameter:** 
  - `SESSION_PATH`: Environment variable to specify the cookie path.
- **Default Value:** 
  - `/`
- **Functionality:** Typically, this should be set to the root directory of the application.

### Session Cookie Domain
- **Purpose:** Sets the domain(s) that can access the session cookie.
- **Parameter:** 
  - `SESSION_DOMAIN`: Environment variable for defining cookie domains.
- **Functionality:** By default, the cookie is available to the main domain and all subdomains, ensuring broad availability.

### HTTPS Only Cookies
- **Purpose:** Controls whether session cookies should only be transmitted over secure connections.
- **Parameter:** 
  - `SESSION_SECURE_COOKIE`: Environment variable to enable secure cookies.
- **Functionality:** If set to true, cookies will not be sent if the connection is not HTTPS, thereby enhancing security.

### HTTP Access Only
- **Purpose:** Prevents JavaScript from accessing session cookie values.
- **Parameter:** 
  - `SESSION_HTTP_ONLY`: Environment variable to control access.
- **Default Value:** 
  - `true`
- **Functionality:** This security feature helps mitigate attacks that attempt to capture cookies via client-side scripts.

### Same-Site Cookies
- **Purpose:** Determines how cookies behave in cross-site contexts.
- **Parameter:** 
  - `SESSION_SAME_SITE`: Environment variable to define Same-Site cookie behavior.
- **Default Value:** 
  - `lax`
- **Functionality:** Helps in mitigating CSRF attacks by controlling when cookies are sent with cross-site requests.

### Partitioned Cookies
- **Purpose:** Ties cookies to the top-level site in a cross-origin context to enhance security.
- **Parameter:** 
  - `SESSION_PARTITIONED_COOKIE`: Environment variable to set partitioned cookies.
- **Default Value:** 
  - `false`
- **Functionality:** Useful in scenarios where enhanced isolation is required between sites sharing the same top-level domain. 

This documentation file delineates the critical configuration settings for session management within Laravel applications, ensuring developers understand the implications and functionalities of each setting to cater to their application’s requirements effectively.