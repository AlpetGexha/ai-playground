# Documentation: cache.php

Original file: `config/cache.php`

# cache.php Documentation

## Table of Contents
- [Introduction](#introduction)
- [Default Cache Store](#default-cache-store)
- [Cache Stores](#cache-stores)
  - [Array Store](#array-store)
  - [Database Store](#database-store)
  - [File Store](#file-store)
  - [Memcached Store](#memcached-store)
  - [Redis Store](#redis-store)
  - [DynamoDB Store](#dynamodb-store)
  - [Octane Store](#octane-store)
- [Cache Key Prefix](#cache-key-prefix)

## Introduction

The `cache.php` configuration file is an integral part of the Laravel framework, defining how caching is handled throughout the application. It specifies the default cache store to be used and allows for the configuration of various caching mechanisms through different storage backends. This configuration enhances application performance by minimizing the need to fetch data from expensive data sources repeatedly.

## Default Cache Store

The default cache store is defined as follows:

```php
'default' => env('CACHE_STORE', 'database'),
```

### Purpose

The `default` key sets the cache store that Laravel will use unless specified otherwise in a cache operation. The value is dynamically set via the environment variable `CACHE_STORE`, with a fallback to `database`.

### Parameters

- **Environment Variable**: `CACHE_STORE` - The name of the cache store as defined in the `stores` key.
- **Default Value**: `'database'` - If the environment variable is not set, the application will default to using the database cache store.

## Cache Stores

The `stores` array defines multiple cache stores, each with its own configuration and driver.

```php
'stores' => [
    // ...
],
```

### Array Store

```php
'array' => [
    'driver' => 'array',
    'serialize' => false,
],
```

#### Purpose

The Array store is an in-memory cache that does not persist across requests.

#### Parameters

- **driver**: Must be set to `array`.
- **serialize**: When set to `false`, cache values will be stored as they are, without serialization.

### Database Store

```php
'database' => [
    'driver' => 'database',
    'connection' => env('DB_CACHE_CONNECTION'),
    'table' => env('DB_CACHE_TABLE', 'cache'),
    'lock_connection' => env('DB_CACHE_LOCK_CONNECTION'),
    'lock_table' => env('DB_CACHE_LOCK_TABLE'),
],
```

#### Purpose

This allows for caching through a database table, which requires schema management.

#### Parameters

- **driver**: Must be set to `database`.
- **connection**: Specifies the database connection, obtained from the environment variable `DB_CACHE_CONNECTION`.
- **table**: The name of the table that will store cached entries, with a default of `cache`.
- **lock_connection**: Connection used for locks; defined via `DB_CACHE_LOCK_CONNECTION`.
- **lock_table**: The table used for cache locks, optional.

### File Store

```php
'file' => [
    'driver' => 'file',
    'path' => storage_path('framework/cache/data'),
    'lock_path' => storage_path('framework/cache/data'),
],
```

#### Purpose

Caches data on the filesystem, providing an effective mechanism for local development.

#### Parameters

- **driver**: Must be set to `file`.
- **path**: The directory where cache files will be stored.
- **lock_path**: Directory for lock files to prevent simultaneous writes.

### Memcached Store

```php
'memcached' => [
    'driver' => 'memcached',
    'persistent_id' => env('MEMCACHED_PERSISTENT_ID'),
    'sasl' => [
        env('MEMCACHED_USERNAME'),
        env('MEMCACHED_PASSWORD'),
    ],
    'options' => [
        // Memcached::OPT_CONNECT_TIMEOUT => 2000,
    ],
    'servers' => [
        [
            'host' => env('MEMCACHED_HOST', '127.0.0.1'),
            'port' => env('MEMCACHED_PORT', 11211),
            'weight' => 100,
        ],
    ],
],
```

#### Purpose

Utilizes Memcached service for caching, providing a faster memory-based caching option.

#### Parameters

- **driver**: Must be set to `memcached`.
- **persistent_id**: The ID of the persistent connection.
- **sasl**: Optional array of SASL authentication credentials.
- **options**: Additional options for Memcached.
- **servers**: List of servers for Memcached, specifying host, port, and weight.

### Redis Store

```php
'redis' => [
    'driver' => 'redis',
    'connection' => env('REDIS_CACHE_CONNECTION', 'cache'),
    'lock_connection' => env('REDIS_CACHE_LOCK_CONNECTION', 'default'),
],
```

#### Purpose

Uses Redis as a cache backend, ideal for applications requiring high throughput and scalability.

#### Parameters

- **driver**: Must be set to `redis`.
- **connection**: Connection name for Redis as defined in the Redis configuration.
- **lock_connection**: Connection name used for cache locking.

### DynamoDB Store

```php
'dynamodb' => [
    'driver' => 'dynamodb',
    'key' => env('AWS_ACCESS_KEY_ID'),
    'secret' => env('AWS_SECRET_ACCESS_KEY'),
    'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    'table' => env('DYNAMODB_CACHE_TABLE', 'cache'),
    'endpoint' => env('DYNAMODB_ENDPOINT'),
],
```

#### Purpose

Integrates with AWS DynamoDB as a caching mechanism, suitable for serverless applications.

#### Parameters

- **driver**: Must be set to `dynamodb`.
- **key**: AWS access key.
- **secret**: AWS secret key.
- **region**: AWS region for DynamoDB.
- **table**: DynamoDB table name for storing cache entries.
- **endpoint**: Endpoint for the DynamoDB service.

### Octane Store

```php
'octane' => [
    'driver' => 'octane',
],
```

#### Purpose

Uses the Octane server's caching features for optimal performance.

#### Parameters

- **driver**: Must be set to `octane`.

## Cache Key Prefix

```php
'prefix' => env('CACHE_PREFIX', Str::slug(env('APP_NAME', 'laravel'), '_').'_cache_'),
```

#### Purpose

Prevents cache key collisions between different applications that may share the same cache store.

#### Parameters

- **Environment Variable**: `CACHE_PREFIX` - Prefix for cache keys to avoid conflicts.
- **Default Value**: A slug of the application name followed by `_cache_`, ensuring uniqueness.

## Conclusion

The `cache.php` configuration file is critical for defining caching strategies in Laravel applications. By utilizing this file, developers can optimize data retrieval, improve application performance, and manage caching strategies using various storage backends. This documentation serves as a guide to understanding and utilizing the caching configuration effectively