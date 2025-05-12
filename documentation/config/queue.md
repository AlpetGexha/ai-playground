# Documentation: queue.php

Original file: `config/queue.php`

# queue.php Documentation

## Table of Contents
- [Introduction](#introduction)
- [Default Queue Connection](#default-queue-connection)
- [Queue Connections](#queue-connections)
  - [Sync Connection](#sync-connection)
  - [Database Connection](#database-connection)
  - [Beanstalkd Connection](#beanstalkd-connection)
  - [SQS Connection](#sqs-connection)
  - [Redis Connection](#redis-connection)
- [Job Batching](#job-batching)
- [Failed Queue Jobs](#failed-queue-jobs)

## Introduction
The `queue.php` configuration file in a Laravel application is responsible for defining the queue connections and settings that the application will utilize to process queued jobs. Queues allow for deferred execution of tasks, enabling the application to run processes in the background, thus improving user experience and application's responsiveness. Laravel provides several built-in drivers for handling queues, and this file facilitates the configuration of those options.

## Default Queue Connection
```php
'default' => env('QUEUE_CONNECTION', 'database'),
```
The default queue connection for the application is set using the environment variable `QUEUE_CONNECTION`. If the variable is not defined, it defaults to using the `database` connection. This connection is the primary channel through which jobs are processed.

## Queue Connections
The queue connections section allows for detailed configuration of the different queue backends available. Each connection specifies several parameters relevant to the specific driver it employs.

### Sync Connection
```php
'sync' => [
    'driver' => 'sync',
],
```
- **Purpose**: The sync driver executes jobs immediately in the current process without queuing.
- **Parameters**: 
  - `driver`: A string value set to `sync`.
- **Return Value**: N/A since the jobs are executed immediately.

### Database Connection
```php
'database' => [
    'driver' => 'database',
    'connection' => env('DB_QUEUE_CONNECTION'),
    'table' => env('DB_QUEUE_TABLE', 'jobs'),
    'queue' => env('DB_QUEUE', 'default'),
    'retry_after' => (int) env('DB_QUEUE_RETRY_AFTER', 90),
    'after_commit' => false,
],
```
- **Purpose**: Utilizes a relational database to store job information.
- **Parameters**:
  - `driver`: Specifies the driver to be used, in this case, `database`.
  - `connection`: (Optional) Specifies the database connection to use from the environment variable `DB_QUEUE_CONNECTION`.
  - `table`: (Optional) The table name where jobs will be stored, defaults to `jobs`.
  - `queue`: (Optional) Name of the queue, defaults to `default`.
  - `retry_after`: (Optional) Number of seconds to wait before retrying a failed job, defaults to 90 seconds.
  - `after_commit`: (Optional) Determines if the job should be inserted after a database transaction is committed (default is false).
- **Return Value**: N/A.

### Beanstalkd Connection
```php
'beanstalkd' => [
    'driver' => 'beanstalkd',
    'host' => env('BEANSTALKD_QUEUE_HOST', 'localhost'),
    'queue' => env('BEANSTALKD_QUEUE', 'default'),
    'retry_after' => (int) env('BEANSTALKD_QUEUE_RETRY_AFTER', 90),
    'block_for' => 0,
    'after_commit' => false,
],
```
- **Purpose**: This configuration enables the use of Beanstalkd, a simple, fast work queue.
- **Parameters**:
  - `driver`: Set to `beanstalkd`.
  - `host`: (Optional) Host where the Beanstalkd server is running, defaults to `localhost`.
  - `queue`: (Optional) The name of the queue to use, defaults to `default`.
  - `retry_after`: (Optional) Seconds to wait before retrying to process a failed job, defaults to 90 seconds.
  - `block_for`: (Optional) Number of seconds to wait for a job to become available, defaults to 0.
  - `after_commit`: (Optional) Controls job insertion after a DB transaction (default is false).
- **Return Value**: N/A.

### SQS Connection
```php
'sqs' => [
    'driver' => 'sqs',
    'key' => env('AWS_ACCESS_KEY_ID'),
    'secret' => env('AWS_SECRET_ACCESS_KEY'),
    'prefix' => env('SQS_PREFIX', 'https://sqs.us-east-1.amazonaws.com/your-account-id'),
    'queue' => env('SQS_QUEUE', 'default'),
    'suffix' => env('SQS_SUFFIX'),
    'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    'after_commit' => false,
],
```
- **Purpose**: Configures the application to use Amazon Simple Queue Service (SQS) to manage its job queues.
- **Parameters**:
  - `driver`: Set to `sqs`.
  - `key`: (Mandatory) AWS access key for authentication.
  - `secret`: (Mandatory) AWS secret access key for authentication.
  - `prefix`: (Optional) URL prefix for the SQS queues.
  - `queue`: (Optional) The name of the SQS queue, defaults to `default`.
  - `suffix`: (Optional) Suffix for the queue URL.
  - `region`: (Optional) AWS region where the queue is located, defaults to `us-east-1`.
  - `after_commit`: (Optional) Controls job insertion after a DB transaction (default is false).
- **Return Value**: N/A.

### Redis Connection
```php
'redis' => [
    'driver' => 'redis',
    'connection' => env('REDIS_QUEUE_CONNECTION', 'default'),
    'queue' => env('REDIS_QUEUE', 'default'),
    'retry_after' => (int) env('REDIS_QUEUE_RETRY_AFTER', 90),
    'block_for' => null,
    'after_commit' => false,
],
```
- **Purpose**: Provides configuration for using Redis as the backend for job queues.
- **Parameters**:
  - `driver`: Set to `redis`.
  - `connection`: (Optional) Specifies the Redis connection name, defaults to `default`.
  - `queue`: (Optional) The name of the Redis queue, defaults to `default`.
  - `retry_after`: (Optional) Time in seconds to wait after a job fails, defaults to 90 seconds.
  - `block_for`: (Optional) Number of seconds to block while waiting for a job, defaults to `null`.
  - `after_commit`: (Optional) Controls job insertion after a DB transaction (default is false).
- **Return Value**: N/A.

## Job Batching
```php
'batching' => [
    'database' => env('DB_CONNECTION', 'sqlite'),
    'table' => 'job_batches',
],
```
- **Purpose**: