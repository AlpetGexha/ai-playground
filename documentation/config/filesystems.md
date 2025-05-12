# Documentation: filesystems.php

Original file: `config/filesystems.php`

# filesystems.php Documentation

## Table of Contents
- [Introduction](#introduction)
- [Default Filesystem Disk](#default-filesystem-disk)
- [Filesystem Disks](#filesystem-disks)
  - [Local Disk](#local-disk)
  - [Public Disk](#public-disk)
  - [S3 Disk](#s3-disk)
- [Symbolic Links](#symbolic-links)

## Introduction

The `filesystems.php` configuration file is an integral part of Laravel applications, where it defines the file storage configurations used by the framework. This file allows developers to specify the default filesystem disk for file operations and configure various filesystem disks that can be utilized for storing files locally or in the cloud. It supports multiple storage methods including local file storage, FTP, SFTP, and Amazon S3 storage options. By managing these settings, developers can tailor the file storage to the specific requirements of their applications.

## Default Filesystem Disk

```php
'default' => env('FILESYSTEM_DISK', 'local'),
```

### Purpose
The `default` key establishes which filesystem to use by default for file operations. This setting significantly influences how files are stored, retrieved, or deleted across the application.

### Parameters
- **FILESYSTEM_DISK (Environment Variable)**: The name of the default disk to be used, set in the `.env` file.
- **'local' (Fallback)**: The fallback value if the environment variable is not defined.

### Functionality
The framework will use the specified disk whenever file-related operations are performed if it's not explicitly stated otherwise.

## Filesystem Disks

The `disks` array allows for the configuration of multiple filesystem disks. The Laravel framework supports various drivers for file storage, and you may set up multiple disks with the same driver if necessary.

### Local Disk

```php
'local' => [
    'driver' => 'local',
    'root' => storage_path('app/private'),
    'serve' => true,
    'throw' => false,
    'report' => false,
],
```

#### Purpose
The local disk is used for file storage on the local server.

#### Parameters
- **driver**: Specifies the storage driver (e.g., 'local').
- **root**: Sets the root path for the disk, defining the location where files are stored.
- **serve**: Determines if the files should be served publicly.
- **throw**: Controls whether exceptions are thrown on errors.
- **report**: Enables logging of disk-related errors.

#### Functionality
Files are stored in the directory specified by the `root` parameter. The application can utilize this disk to read/write files, governed by its settings regarding error handling.

### Public Disk

```php
'public' => [
    'driver' => 'local',
    'root' => storage_path('app/public'),
    'url' => env('APP_URL').'/storage',
    'visibility' => 'public',
    'throw' => false,
    'report' => false,
],
```

#### Purpose
The public disk is designated for files that need to be accessible via the web.

#### Parameters
- **driver**: Indicates the storage method (also 'local').
- **root**: Defines the file storage location.
- **url**: The URL used to access the files stored in this disk.
- **visibility**: Setting to 'public' allows files to be publicly accessible.
- **throw**: Same behavior as in other configurations regarding error handling.
- **report**: Same as above regarding logging.

#### Functionality
Files stored on this disk are publicly accessible and can be served via the defined URL. This is useful for user-uploaded content or any data that should be retrieved by users without authentication.

### S3 Disk

```php
's3' => [
    'driver' => 's3',
    'key' => env('AWS_ACCESS_KEY_ID'),
    'secret' => env('AWS_SECRET_ACCESS_KEY'),
    'region' => env('AWS_DEFAULT_REGION'),
    'bucket' => env('AWS_BUCKET'),
    'url' => env('AWS_URL'),
    'endpoint' => env('AWS_ENDPOINT'),
    'use_path_style_endpoint' => env('AWS_USE_PATH_STYLE_ENDPOINT', false),
    'throw' => false,
    'report' => false,
],
```

#### Purpose
This disk is configured to interact with Amazon S3, a cloud-based storage solution.

#### Parameters
- **driver**: This specifies 's3' as the storage method.
- **key**: The AWS access key ID, retrieved from environment variables.
- **secret**: The AWS secret access key, also retrieved from environment variables.
- **region**: Defines the AWS region where your S3 bucket is located.
- **bucket**: The name of the S3 bucket to store files.
- **url**: The URL to access the S3 bucket.
- **endpoint**: Optional endpoint for custom domains.
- **use_path_style_endpoint**: Boolean to indicate usage of path-style URLs if using a custom endpoint.
- **throw**: Controls exception handling behavior during file operations.
- **report**: Determines if file operation errors should be logged.

#### Functionality
This configuration allows the application to upload, manage, and retrieve files directly from Amazon S3, enabling robust cloud storage capabilities.

## Symbolic Links

```php
'links' => [
    public_path('storage') => storage_path('app/public'),
],
```

### Purpose
This section defines symbolic links created by the Artisan command `storage:link`, facilitating easy access to public files.

### Parameters
- **Key**: Path where the symbolic link will be created.
- **Value**: Target directory that the symbolic link points to.

### Functionality
By executing `php artisan storage:link`, the application creates a symbolic link from the specified public path to the storage path. This means files stored in `app/public` can be accessed via the `/storage` URL route, simplifying file access in public views.

---

This documentation serves as a comprehensive guide to understanding the configuration file `filesystems.php`, covering its purpose, structure, and functionality within a Laravel application. Developers can use this document to configure their file storage settings effectively.