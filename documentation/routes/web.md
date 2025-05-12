# Documentation: web.php

Original file: `routes/web.php`

# web.php Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Routes](#routes)
   - [Poem Routes](#poem-routes)
   - [Roast Routes](#roast-routes)
   - [Image Generation Routes](#image-generation-routes)
   - [Spam Detector Comments Routes](#spam-detector-comments-routes)
   - [Love Letter Routes](#love-letter-routes)
3. [Middleware](#middleware)
4. [Included Files](#included-files)

## Introduction
The `web.php` file in a Laravel application is responsible for defining the web routes of the application. This particular codebase is focused on an AI-oriented application that allows users to interact with different functionalities such as poem generation, image creation, roasting, spam detection, and composing love letters. The routes direct HTTP requests to the appropriate controller methods that handle the specific logic required for each feature. This enables a clean separation of concerns, making the application easier to maintain and extend.

## Routes

### Poem Routes
The following routes are defined for handling poems:

| Method | Route                    | Controller Method        | Name                          |
|--------|--------------------------|---------------------------|-------------------------------|
| GET    | `/poem`                 | index                     | `poem.index`                 |
| POST   | `/poem/generate`        | generate                  | `poem.generate`              |
| POST   | `/poem/modify`          | modify                    | `poem.modify`                |

- **Purpose**: These routes manage the creation, modification, and viewing of poems.
- **Controller**: `PoemController` handles the logic for these routes.

#### Route Details
1. **GET `/poem`**: Displays the poem creation interface.
2. **POST `/poem/generate`**: Accepts user input to generate a poem based on specified parameters and returns the generated poem.
3. **POST `/poem/modify`**: Allows users to modify existing poems based on input.

### Roast Routes
The following routes are defined for handling roast generation:

| Method | Route                    | Controller Method        | Name                          |
|--------|--------------------------|---------------------------|-------------------------------|
| GET    | `/roastt`               | index                     | `roast.index`                |
| POST   | `/roastt`               | store                     | `roast.store`                |
| GET    | `/roast/{filename}`     | show                      | `roast.show`                 |

- **Purpose**: These routes facilitate the generation and display of roasts for users.
- **Controller**: `RoastController` manages the functionality.

#### Route Details
1. **GET `/roastt`**: Provides the interface for creating a roast.
2. **POST `/roastt`**: Handles the storage of the generated roast.
3. **GET `/roast/{filename}`**: Displays a specific roast by filename.

### Image Generation Routes
The following routes are defined for handling image generation:

| Method | Route                    | Controller Method        | Name                          |
|--------|--------------------------|---------------------------|-------------------------------|
| GET    | `/image`                | index                     | `image.index`                |
| POST   | `/image`                | store                     | `image.store`                |
| GET    | `/image/gallery`        | gallery                   | `image.gallery`              |

- **Purpose**: These routes allow users to create and view generated images.
- **Controller**: `ImageController` is responsible for this functionality.

#### Route Details
1. **GET `/image`**: Displays the image creation interface.
2. **POST `/image`**: Accepts user inputs to generate an image and save it.
3. **GET `/image/gallery`**: Displays a gallery of previously generated images.

### Spam Detector Comments Routes
The following routes are defined for handling the spam detection on comments:

| Method | Route                    | Controller Method        | Name                          |
|--------|--------------------------|---------------------------|-------------------------------|
| GET    | `/comment`              | index                     | `comments.index`             |
| POST   | `/comment`              | store                     | `comment.store`              |

- **Purpose**: To manage spam detection for user comments.
- **Controller**: `SpamDetecter` handles these operations.

#### Route Details
1. **GET `/comment`**: Displays the comment input form.
2. **POST `/comment`**: Checks the submitted comment for spam and stores it if it's not flagged.

### Love Letter Routes
The following routes are defined for handling love letter generation:

| Method | Route                    | Controller Method        | Name                          |
|--------|--------------------------|---------------------------|-------------------------------|
| GET    | `/love`                 | index                     | `loveletter.index`           |
| POST   | `/love`                 | generate                  | `loveletter.generate`        |

- **Purpose**: These routes facilitate the creation of love letters.
- **Controller**: `LoveLetterController` manages this functionality.

#### Route Details
1. **GET `/love`**: Displays the love letter creation interface.
2. **POST `/love`**: Accepts inputs to generate a customized love letter.

## Middleware
The file includes middleware for route group management related to user authentication and verification. The `auth` and `verified` middleware ensure that users can access certain routes only if they are logged in and their emails are verified.

- **Route**: 
  - **GET `dashboard`**: Provides access to a user dashboard, rendered using Inertia.

## Included Files
At the end of the `web.php` file, other routes are included to maintain organized routing structures. The paths included are:

- **settings.php**: Additional settings related routes.
- **auth.php**: Routes regarding authentication.

These files are essential for organizing complex applications, ensuring that the critical route definitions remain manageable and modular.