# Documentation: ChatAI.php

Original file: `app/Services\ChatAI.php`

# ChatAI Documentation

## Table of Contents
- [Introduction](#introduction)
- [Class Properties](#class-properties)
- [Methods](#methods)
  - [__construct](#__construct)
  - [model](#model)
  - [defaultSystemMessage](#defaultsystemmessage)
  - [getSystemMessage](#getsystemmessage)
  - [systemMessage](#systemmessage)
  - [send](#send)
  - [speech](#speech)
  - [reply](#reply)
  - [messages](#messages)
  - [addMessage](#addmessage)
  - [visualize](#visualize)
  - [completions](#completions)

## Introduction
The `ChatAI` class is part of the OpenAI Laravel integration services defined within the application. It serves as a bridge for interacting with OpenAI's GPT models to facilitate conversational interactions and creative output generation, specifically tailored for poetry and imagery. This class is equipped to handle message management for both sending and receiving responses, allowing for dynamic interactions depending on user inputs. The system leverages the OpenAI API for chat and audio functionalities, enabling a rich user experience in applications that require creative AI capabilities.

## Class Properties
| Property           | Type   | Description                                                                                          |
|--------------------|--------|------------------------------------------------------------------------------------------------------|
| `$messages`        | array  | Stores the conversation messages exchanged between the user and the AI assistant.                   |
| `$systemMessage`   | string | Holds the system's initial message that defines the AI's role and guidelines for interaction.       |
| `$model`           | string | Specifies which OpenAI model to use, defaulting to 'gpt-3.5-turbo'.                                 |

## Methods 

### __construct
```php
public function __construct()
```
#### Purpose
Initializes a new instance of the `ChatAI` class and sets the default system message.

#### Functionality
- Calls the `defaultSystemMessage` method to populate the `$systemMessage` property upon instantiation.

---

### model
```php
public function model(string $model): self
```
#### Purpose
Allows the user to specify which OpenAI model to use for interactions.

#### Parameters
- `string $model`: The name of the OpenAI model to be used, which can vary based on the context or application needs.

#### Return Value
- Returns the current instance of the class for method chaining.

---

### defaultSystemMessage
```php
public function defaultSystemMessage(): string
```
#### Purpose
Provides the default message that defines the creative role of the AI.

#### Return Value
- Returns a predefined string that describes the responsibilities and characteristics of the AI poet.

---

### getSystemMessage
```php
public function getSystemMessage(): string
```
#### Purpose
Retrieves the current system message.

#### Return Value
- Returns the current value of the `$systemMessage` property.

---

### systemMessage
```php
public function systemMessage(string $message): self
```
#### Purpose
Sets a custom system message for the AI.

#### Parameters
- `string $message`: The new system message to be set.

#### Return Value
- Returns the current instance of the class for method chaining.

---

### send
```php
public function send(string $message, bool $speech = false, array $options = []): ?string
```
#### Purpose
Sends a user message to the OpenAI API and retrieves the AI's response. 

#### Parameters
- `string $message`: The message content from the user.
- `bool $speech`: Indicates whether to convert the AI's response to speech. Defaults to `false`.
- `array $options`: Additional options for the OpenAI API request, such as configuration for voice.

#### Return Value
- Returns the AI's response message as a string or the audio representation if `$speech` is `true`; otherwise, returns `null` if no response is generated.

#### Functionality
- Adds the system and user messages to the conversation history.
- Merges any additional options provided for the API call.
- Retrieves the response from the OpenAI chat endpoint.
- Optionally converts the response to speech if requested.

---

### speech
```php
public function speech(string $message, string $voice = 'nova'): string
```
#### Purpose
Generates speech audio from the given message using OpenAI's text-to-speech services.

#### Parameters
- `string $message`: The text content to be converted into audio.
- `string $voice`: Specifies the voice to be used in the speech synthesis. Defaults to 'nova'.

#### Return Value
- Returns the audio representation of the message as a string.

---

### reply
```php
public function reply(string $message): ?string
```
#### Purpose
An alias for the `send` method to provide a simplified interface for sending user messages.

#### Parameters
- `string $message`: The message content from the user.

#### Return Value
- Returns the AI's response message as a string or `null` if no response is generated.

---

### messages
```php
public function messages()
```
#### Purpose
Retrieves the history of messages exchanged during the conversation.

#### Return Value
- Returns the array of messages stored in the `$messages` property.

---

### addMessage
```php
protected function addMessage(string $message, string $role = 'user'): self
```
#### Purpose
Adds a new message to the conversation history.

#### Parameters
- `string $message`: The content of the message to be added.
- `string $role`: Specifies the role of the sender ('user' or 'assistant'). Defaults to 'user'.

#### Return Value
- Returns the current instance of the class for method chaining.

---

### visualize
```php
public function visualize(string $description, array $options = []): string
```
#### Purpose
Generates an image based on the user-provided description using OpenAI's image generation capabilities.

#### Parameters
- `string $description`: The user-provided description to generate an image.
- `array $options`: Additional options for the image generation request.

#### Return Value
- Returns the URL of the generated image as a string.

#### Functionality
- Adds the user description to the message history and composes a prompt for image generation.
- Creates an image using OpenAI's image generation API.
- Updates the message history with the generated image URL.

---

### completions
```php
public function completions($message, array $options = [])
```
#### Purpose
Generates a completion response based on the provided message using a specified model.

#### Parameters
- `string $message`: The prompt or message to generate a completion for.
- `array $options`: Additional options for the completion request.

#### Return Value
- Returns the generated completion text as a string, or `null` if no response is generated.

#### Functionality
- Merges user-provided options with default settings for the completion request.
- Retrieves the completion results from the OpenAI API.
- Updates the message history with the generated completion.

---

This documentation aims to clarify the design and functionality within the `ChatAI` class, helping developers to understand and effectively utilize the class for creating engaging