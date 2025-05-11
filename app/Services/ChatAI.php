<?php

namespace App\Services;

use OpenAI\Laravel\Facades\OpenAI;

class ChatAI
{
    protected  array $messages = [];
    protected string $systemMessage = '';

    public function __construct()
    {
        $this->systemMessage = $this->systemPromt();
    }

    public function systemPromt(): string
    {
        return "You are a creative and emotionally expressive AI poet. You craft original poems in various styles, tones, and formats based on the users request. Your language is vivid, evocative, and rhythmically pleasing. Always respect the chosen theme, emotion, and form, and avoid clichés unless requested.";
    }

    public function getDefaultSystemMessage(): string
    {
        return $this->systemMessage;
    }

    public function systemMessage(string $message): self
    {
        $this->systemMessage = $message;

        return $this;
    }

    public function send(string $message, bool $speech = false): ?string
    {
        if ($this->systemMessage) {
            $this->messages[] = ['role' => 'system', 'content' => $this->systemMessage];
            $this->systemMessage = '';
        }

        $this->messages[] = [
            'role' => 'assistant',
            'content' => $message
        ];

        // Send the messages to OpenAI API and get the response
        $fullResponse = OpenAI::chat()->create([
            'model' => 'gpt-3.5-turbo',
            'messages' => $this->messages,
        ]);

        $response = $fullResponse['choices'][0]['message']['content'] ?? null;

        if ($response) {
            $this->messages[] = [
                'role' => 'user',
                'content' => $response
            ];
        }

        return $speech ? $this->speech($response) : $response;
    }

    public function speech(string $message): string
    {
        return OpenAI::audio()->speech([
            'model' => 'tts-1',
            'input' => $message,
            'voice' => 'nova', // alloy
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
}
