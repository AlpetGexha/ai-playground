# Documentation: SpamFree.php

Original file: `app/Rules\SpamFree.php`

# SpamFree Documentation

## Table of Contents
- [Introduction](#introduction)
- [SpamFree Class](#spamfree-class)
  - [validate Method](#validate)

## Introduction
The `SpamFree.php` file defines the `SpamFree` class, which implements the `ValidationRule` interface provided by Laravel. This class is responsible for validating input text to determine whether it contains spam. It leverages an external AI service, specifically ChatGPT, to analyze the text and return a verdict. The class can be utilized within form validation or anywhere the validation of spam content is necessary, enhancing data integrity and user experience by preventing spam submissions.

## SpamFree Class

### Overview
The `SpamFree` class is located in the `App\Rules` namespace and serves as a custom validation rule within a Laravel application. By using this rule, developers can ensure that posts or comments submitted through forms are not spam by making a call to the ChatAI service.

### Methods

#### validate Method
```php
public function validate(string $attribute, mixed $value, Closure $fail): void
```

- **Purpose**: This method is invoked to validate the input against spam criteria by communicating with the ChatAI service.
  
- **Parameters**:
  - `string $attribute`: The name of the attribute being validated, e.g., 'comment' or 'post_content'.
  - `mixed $value`: The value of the attribute being validated. This is expected to be the text that will be analyzed for spam.
  - `Closure $fail`: A closure that is invoked when validation fails. It accepts a message string that will be returned to the user.

- **Return Value**: The method does not return a value. Instead, it either passes the validation or calls the `$fail` closure to indicate a failure.

- **Functionality**:
  1. The method creates an instance of the `ChatAI` service and sets the model type to `gpt-3.5-turbo-1106` used for the spam detection task.
  2. It sends a prompt to the AI which includes the text to be checked for spam. The prompt is crafted to instruct the AI to respond in JSON format and to determine if the provided content is spam.
  3. The expected AI response would be in the form of a JSON object that contains a single field, `is_spam`, which is a boolean indicating whether the content is spam.
  4. After receiving the response, it checks if `is_spam` is `true`. If so, it calls the `$fail` closure with the message "Spam was detected.", thus failing the validation.

By leveraging AI for spam detection, this method aims to provide a robust mechanism to prevent unwanted content submission in a structured and efficient manner.

## Example Usage
To utilize the `SpamFree` class within a form request, you can implement it as follows:

```php
use App\Rules\SpamFree;

$request->validate([
    'comment' => ['required', new SpamFree],
]);
```

## Conclusion
The `SpamFree` class represents a sophisticated approach to content validation through the incorporation of external AI services. It not only helps in maintaining the quality of the input data but also aligns with modern practices in utilizing artificial intelligence for real-world applications within PHP and Laravel ecosystems.