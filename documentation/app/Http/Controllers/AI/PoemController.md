# Documentation: PoemController.php

Original file: `app/Http\Controllers\AI\PoemController.php`

# PoemController Documentation

## Table of Contents
- [Introduction](#introduction)
- [Methods](#methods)
  - [index](#index)
  - [generate](#generate)
  - [modify](#modify)
  - [createPrompt](#createprompt)
- [Routes](#routes)

## Introduction
The `PoemController` class is part of the AI functionality within the Laravel application. This controller is responsible for managing the interactions related to poem generation and modification based on user input. It renders views and handles requests to generate new poems, modify existing ones, and present them to users while utilizing the `ChatAI` service for the natural language processing capabilities.

## Methods

### index

#### Purpose
Displays the main page for the poem generator, providing users with the interface to enter their prompts and view generated poems.

#### Parameters
- `Request $request`: The incoming HTTP request containing any relevant data (although not used in this method).

#### Return Values
- Returns an Inertia.js response that renders the `Poem/Index` view.

#### Functionality
This method serves as the entry point for the poem generator interface. It utilizes Inertia.js to render the frontend page, allowing users to interact with the poem generation system.

```php
public function index(Request $request)
{
    return Inertia::render('Poem/Index');
}
```

---

### generate

#### Purpose
Generates a new poem based on a user-provided prompt.

#### Parameters
- `Request $request`: The incoming HTTP request containing the user's prompt.

#### Return Values
- Returns an Inertia.js response that renders the `Poem/Index` view with the generated poem and the original prompt.

#### Functionality
1. Validates the incoming request to ensure the prompt is a string between 5 and 1000 characters.
2. Creates an enhanced prompt using the `createPrompt` method.
3. Uses the `ChatAI` service to generate a poem based on the crafted prompt.
4. Renders the poem on the `Poem/Index` page along with the user’s original prompt.

```php
public function generate(Request $request)
{
    $validated = $request->validate([
        'prompt' => 'required|string|min:5|max:1000',
    ]);

    $chat = new ChatAI();
    $prompt = $this->createPrompt($validated['prompt']);
    $poem = $chat->send($prompt);

    return Inertia::render('Poem/Index', [
        'poem' => $poem,
        'prompt' => $validated['prompt']
    ]);
}
```

---

### modify

#### Purpose
Modifies an existing poem based on user-specific instructions.

#### Parameters
- `Request $request`: The incoming HTTP request containing the original poem, prompt, and user instruction.

#### Return Values
- Returns an Inertia.js response that renders the `Poem/Index` view with the modified poem and the original prompt.

#### Functionality
1. Validates the request to check that the prompt, existing poem, and modification instructions are provided with specified character limits.
2. Sets a context using the `ChatAI` service that instructs the AI on its role in modifying the poem.
3. Sends the original poem to the `ChatAI` service alongside the user’s instructions.
4. Receives and renders the modified poem back on the `Poem/Index` page.

```php
public function modify(Request $request)
{
    $validated = $request->validate([
        'prompt' => 'required|string|min:5|max:1000',
        'poem' => 'required|string',
        'instruction' => 'required|string|min:5|max:500',
    ]);

    $chat = new ChatAI();
    $chat->systemMessage('You are a creative poet who produces well-formatted, beautiful poems. You will be given a poem to modify according to the user\'s instructions.');
    $chat->send("Here is the original poem that was based on this prompt: \"{$validated['prompt']}\"\n\nPoem:\n{$validated['poem']}");

    $modifiedPoem = $chat->reply("Please modify this poem according to these instructions: {$validated['instruction']}");

    return Inertia::render('Poem/Index', [
        'poem' => $modifiedPoem,
        'prompt' => $validated['prompt']
    ]);
}
```

---

### createPrompt

#### Purpose
Creates an enhanced prompt from the user's input to guide the AI in generating a high-quality poem.

#### Parameters
- `string $userPrompt`: The user-provided prompt that serves as the basis for the poem.

#### Return Values
- Returns a string that formats the prompt into a detailed request for poetic generation.

#### Functionality
This private method enriches the original user prompt by constructing a more detailed instruction for the poem creation process. It considers various poetic devices and structures, aiming to enhance the quality of the output from the `ChatAI`.

```php
private function createPrompt(string $userPrompt): string
{
    return "Create a beautiful, well-formatted poem based on this request: \"{$userPrompt}\".
            Use appropriate stanzas, line breaks, and poetic devices to elevate the quality.
            The poem should have a coherent structure and flow. If appropriate for the request,
            consider using metaphors, similes, imagery, and other literary devices to make
            the poem more expressive and impactful.";
}
```

---

## Routes
The `PoemController` handles the following routes within the Laravel application:

| HTTP Method | Route                  | Method      | Description                                 |
|-------------|------------------------|-------------|---------------------------------------------|
| GET         | /poem                  | index       | Display the poem generator page.           |
| POST        | /poem/generate         | generate    | Generate a poem based on user prompt.      |
| POST        | /poem/modify           | modify      | Modify an existing poem based on instructions.|

This documentation provides a comprehensive understanding of the `PoemController`, its methods, and how it integrates with the overall architecture of the Laravel application for generating and modifying poetry through AI.