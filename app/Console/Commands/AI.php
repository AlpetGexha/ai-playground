<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class AI extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ai';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // $rezult = Http::withHeaders([
        //     'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
        //     'Content-Type' => 'application/json',
        //     // 'OpenAI-Organization' => env('OPENAI_ORGANIZATION'),
        // ])->post('https://api.openai.com/v1/chat/completions', [
        //     'model' => 'gpt-4-turbo-preview',
        //     'messages' => [
        //         [
        //             'role' => 'user',
        //             'content' => 'Hello, how are you?'
        //         ]
        //     ],
        //     'temperature' => 0.7,
        // ]);
        // $rezult = json_decode($rezult->body());

        $this->info("Hello! I'm just a computer program, so I don't have feelings, but thanks for asking! How can I assist you today?");
        // $this->info($rezult->choices[0]->message->content);
    }
}
