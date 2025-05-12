# Documentation: database.php

Original file: `config/database.php`

# `database.php` Configuration File Documentation

## Table of Contents
- [Introduction](#introduction)
- [Configuration Overview](#configuration-overview)
  - [Default Database Connection](#default-database-connection)
  - [Database Connection Configurations](#database-connection-configurations)
    - [SQLite Connection](#sqlite-connection)
    - [MySQL Connection](#mysql-connection)
    - [MariaDB Connection](#mariadb-connection)
    - [PostgreSQL Connection](#pgsql-connection)
    - [SQL Server Connection](#sqlsrv-connection)
  - [Migration Repository Table](#migration-repository-table)
  - [Redis Database Configuration](#redis-database-configuration)
    - [Redis Default Configuration](#redis-default-configuration)
    - [Redis Cache Configuration](#redis-cache-configuration)

## Introduction
The `database.php` configuration file is a crucial component of a Laravel application that defines database connection settings. This file allows developers to specify how the application interacts with one or multiple databases, including setting parameters for different database systems. It aids in defining default connection attributes, as well as migration tables used for tracking database schema changes.

## Configuration Overview

### Default Database Connection
The default database connection is specified using the `default` key. It determines which database connection will be used automatically unless another one is indicated when executing queries.

```php
'default' => env('DB_CONNECTION', 'sqlite'),
```

- **Parameter**: Uses the environment variable `DB_CONNECTION`, which specifies the connection type (e.g., `mysql`, `pgsql`, etc.). If not set, it defaults to `sqlite`.

### Database Connection Configurations
The `connections` section contains an array of configurations for various database types supported by Laravel. The parameters common across all connections include the driver type, host, port, database name, username, password, and other settings.

#### SQLite Connection
```php
'sqlite' => [
    'driver' => 'sqlite',
    'url' => env('DB_URL'),
    'database' => env('DB_DATABASE', database_path('database.sqlite')),
    'prefix' => '',
    'foreign_key_constraints' => env('DB_FOREIGN_KEYS', true),
    'busy_timeout' => null,
    'journal_mode' => null,
    'synchronous' => null,
],
```
- **Driver**: Specifies to use SQLite.
- **Parameters**:
  - `url`: Optional URL for connecting to the database.
  - `database`: The path to the SQLite database file. Defaults to `database.sqlite` in the application’s database directory.
  - `foreign_key_constraints`: Enables foreign key constraints.
  
#### MySQL Connection
```php
'mysql' => [
    'driver' => 'mysql',
    'url' => env('DB_URL'),
    'host' => env('DB_HOST', '127.0.0.1'),
    'port' => env('DB_PORT', '3306'),
    'database' => env('DB_DATABASE', 'laravel'),
    'username' => env('DB_USERNAME', 'root'),
    'password' => env('DB_PASSWORD', ''),
    'unix_socket' => env('DB_SOCKET', ''),
    'charset' => env('DB_CHARSET', 'utf8mb4'),
    'collation' => env('DB_COLLATION', 'utf8mb4_unicode_ci'),
    'prefix' => '',
    'prefix_indexes' => true,
    'strict' => true,
    'engine' => null,
    'options' => extension_loaded('pdo_mysql') ? array_filter([
        PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
    ]) : [],
],
```
- **Driver**: Specifies to use MySQL.
- **Parameters**:
  - `host`: Hostname of the MySQL server.
  - `port`: Port number for MySQL connection, typically `3306`.
  - `username` and `password`: Credentials for accessing the database.
  - `charset`: Character set for database strings, defaults to `utf8mb4`.
  - `options`: Additional PDO options can be set here.

#### MariaDB Connection
The configuration for MariaDB is very similar to MySQL.

```php
'mariadb' => [
    'driver' => 'mariadb',
    ... // same properties as mysql
],
```
- **Driver**: Specifies to use MariaDB, offering similar configuration options as MySQL.

#### PostgreSQL Connection
```php
'pgsql' => [
    'driver' => 'pgsql',
    ...
    'search_path' => 'public',
    'sslmode' => 'prefer',
],
```
- **Driver**: Specifies to use PostgreSQL.
- **Parameters**:
  - `search_path`: Specifies the schema search path.
  - `sslmode`: Configures SSL mode for connections.

#### SQL Server Connection
```php
'sqlsrv' => [
    'driver' => 'sqlsrv',
    ...
],
```
- **Driver**: Specifies to use SQL Server.
- **Note**: Some fields like `encrypt` and `trust_server_certificate` are commented out, indicating optional settings for secure connections.

### Migration Repository Table
```php
'migrations' => [
    'table' => 'migrations',
    'update_date_on_publish' => true,
],
```
This section defines how migrations are tracked:
- **table**: The name of the table that keeps records of all migrations, defaulting to `migrations`.
- **update_date_on_publish**: If set to `true`, it updates the migration timestamp upon publishing.

### Redis Database Configuration
The Redis configuration allows for setting up connections to Redis, a popular in-memory key-value store.

```php
'redis' => [
    'client' => env('REDIS_CLIENT', 'phpredis'),
    ...
],
```
- **client**: Which Redis client to use, defaults to `phpredis`.

#### Redis Default Configuration
```php
'default' => [
    'url' => env('REDIS_URL'),
    'host' => env('REDIS_HOST', '127.0.0.1'),
    ...
],
```
- Configuration for the default connection, including `url`, `host`, `username`, `password`, `port`, and database index.

#### Redis Cache Configuration
```php
'cache' => [
    'url' => env('REDIS_URL'),
    'host' => env('REDIS_HOST', '127.0.0.1'),
    ...
],
```
- Similar to the default configuration but sets up a connection specifically for caching purposes (default database index typically set to `1`).

## Conclusion
The `database.php` configuration file is integral to managing database connections within a Laravel application. It provides developers with flexibility by allowing easy switching between different databases and configuring parameters according to specific needs or environments. The emphasis on environment variables enhances security and adaptability across different deployment scenarios. Proper understanding of this configuration lays the groundwork for effective database interaction and management within Laravel applications.