# Documentation: RoastController.php

Original file: `app/Http\Controllers\AI\RoastController.php`

# RoastController Documentation

## Table of Contents
- [Introduction](#introduction)
- [Methods](#methods)
  - [index](#index)
  - [store](#store)
  - [show](#show)
- [Routes Handled](#routes-handled)

## Introduction
The `RoastController` is part of a Laravel application designed to handle user interactions related to generating humorous roasts using AI technology. This controller enables users to input a topic and receive a generated audio roast of the topic characterized by a sharp and humorous tone. The controller utilizes the `ChatAI` service to facilitate mock and sarcastic comebacks while ensuring that the generated content is both entertaining and appropriate. The document outlines the methods available within this controller, their functionalities, parameters, and the overall structure of the code.

## Methods

### index
```php
public function index()
```
#### Purpose
The `index` method renders the initial page where users can submit topics for roasting.

#### Parameters
- None

#### Return Value
- Returns an Inertia render view for the 'Roast/Index' page.

#### Functionality
When invoked, this method simply returns a rendered Inertia view named 'Roast/Index'. This view typically contains the form that users will interact with to submit their roast topics.

---

### store
```php
public function store(Request $request)
```
#### Purpose
The `store` method processes the roast generation request from the user.

#### Parameters
- `Request $request`: The incoming request containing the data provided by the user.

#### Return Value
- On success: A JSON response including:
  - `success` (bool): Indicates if the roast generation was successful.
  - `message` (string): A message describing the result of the operation.
  - `file_url` (string): URL of the generated audio file.
  - `topic` (string): The topic submitted by the user.

- On failure: A JSON response with an error message and a 500 status code.

#### Functionality
1. **Validation**: Validates the user input to ensure:
   - `topic`: Must be a string with a minimum length of 3 and a maximum length of 500 characters.
   - `voice`: Optional; if provided, must be one of the allowed voice options.

2. **Voice Selection**: Determines which voice to use for the roast. If no voice is specified, it defaults to 'nova'.

3. **AI Interaction**: Initializes a `ChatAI` instance and sets a system message instructing the AI on the tone and style of the roast to generate.

4. **Roast Generation**: Sends a prompt to the ChatAI service to generate the roast audio based on the user's topic. 

5. **File Management**:
   - Generates a unique filename for the audio roast.
   - Checks and creates the necessary directories if they do not exist.
   - Saves the generated audio file to the server.

6. **Response Handling**: Returns a JSON response indicating the result of the roast generation attempt. If an error occurs during any of the above steps, a JSON response is returned with the error message.

---

### show
```php
public function show(Request $request, $filename)
```
#### Purpose
The `show` method displays the result page after a roast has been generated.

#### Parameters
- `Request $request`: The incoming request for displaying the roast result.
- `string $filename`: The name of the generated roast audio file.

#### Return Value
- Returns an Inertia render view for the 'Roast/Show' page along with the roast audio file URL and the roast topic.

#### Functionality
This method retrieves and sends the necessary data to the 'Roast/Show' Inertia view. It includes the URL of the generated audio file, the roast topic, and a default message that states "BOOM. You just got roasted!" This page serves to entertain the users with their personalized roast audio.

---

## Routes Handled
The `RoastController` handles the following routes (assuming the default convention in Laravel):

| Method  | URI                       | Action           |
|---------|---------------------------|------------------|
| GET     | `/roast`                  | `index`          |
| POST    | `/roast`                  | `store`          |
| GET     | `/roast/{filename}`       | `show`           |

In the above table:
- The `GET /roast` route retrieves the roast form.
- The `POST /roast` route processes the form submission for roast generation.
- The `GET /roast/{filename}` route displays the generated roast audio. 

This documentation provides a comprehensive overview of the capabilities and functions of the `RoastController`, enabling developers to understand the flow and structure of roast generation within the application.