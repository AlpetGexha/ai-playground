<?php

namespace App\Services;

use OpenAI\Laravel\Facades\OpenAI;

class ChatAI
{
    protected  array $messages = [];
    protected string $systemMessage = '';
    protected string $model = 'gpt-3.5-turbo';

    public function __construct()
    {
        $this->systemMessage = $this->defaultSystemMessage();
    }

    public function model(string $model): self
    {
        $this->model = $model;

        return $this;
    }

    public function defaultSystemMessage(): string
    {
        return "You are a creative and emotionally expressive AI poet. You craft original poems in various styles, tones, and formats based on the users request. Your language is vivid, evocative, and rhythmically pleasing. Always respect the chosen theme, emotion, and form, and avoid clichés unless requested.";
    }

    public function getSystemMessage(): string
    {
        return $this->systemMessage;
    }

    public function systemMessage(string $message): self
    {
        $this->systemMessage = $message;

        return $this;
    }

    public function send(string $message, bool $speech = false, array $options = []): ?string
    {
        if ($this->systemMessage) {
            $this->messages[] = ['role' => 'system', 'content' => $this->systemMessage];
            $this->systemMessage = '';
        }

        $this->messages[] = [
            'role' => 'assistant',
            'content' => $message
        ];

        $options = array_merge([
            'model' => $this->model,
            'messages' => $this->messages,
        ], $options);

        // Extract voice for speech if specified
        $voice = $options['voice'] ?? 'nova';
        unset($options['voice']); // Remove from chat options

        // Send the messages to OpenAI API and get the response
        $fullResponse = OpenAI::chat()->create($options);

        $response = $fullResponse['choices'][0]['message']['content'] ?? null;

        if ($response) {
            $this->messages[] = [
                'role' => 'user',
                'content' => $response
            ];
        }

        return $speech ? $this->speech($response, $voice) : $response;
    }

    public function speech(string $message, string $voice = 'nova'): string
    {
        return OpenAI::audio()->speech([
            'model' => 'tts-1',
            'input' => $message,
            'voice' => $voice,
        ]);
    }

    public function reply(string $message): ?string
    {
        return $this->send($message);
    }

    public function messages()
    {
        return $this->messages;
    }

    protected function addMessage(string $message, string $role = 'user'): self
    {
        $this->messages[] = [
            'role'    => $role,
            'content' => $message
        ];

        return $this;
    }

    public function visualize(string $description, array $options = []): string
    {
        $this->addMessage($description);

        $description = collect($this->messages)->where('role', 'user')->pluck('content')->implode(' ');

        $options = array_merge([
            'prompt' => $description,
            'model' => 'dall-e-3'
        ], $options);

        $url = OpenAI::images()->create($options)->data[0]->url;

        $this->addMessage($url, 'assistant');

        return $url;
    }

    public function completions($message, array $options = [])
    {
        $this->addMessage($message);

        $options = array_merge([
            'model' => 'gpt-4o-mini',
            'messages' => $this->messages,
        ], $options);

        $fullResponse = OpenAI::completions()->create($options);

        $response = $fullResponse['choices'][0]['message']['content'] ?? null;

        if ($response) {
            $this->messages[] = [
                'role' => 'user',
                'content' => $response
            ];
        }

        return $response;
    }
}
