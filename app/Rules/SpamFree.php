<?php

namespace App\Rules;

use App\Services\ChatAI;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class SpamFree implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $response = (new ChatAI())
            ->model('gpt-3.5-turbo-1106')
            ->systemMessage('You are a forum moderator who always responds using JSON.')
            ->send(
                <<<EOT
                Please inspect the following text and determine if it is spam.

                {$value}

                Expected Response Example:

                {"is_spam": true|false}
                EOT
            );

        if (json_decode($response)?->is_spam) {
            $fail("Spam was detected.");
        }
    }
}
