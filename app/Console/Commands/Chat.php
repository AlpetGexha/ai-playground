<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class Chat extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'agent:r-chat';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Open AI Chat Command';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $question = $this->ask('What is your question?');

        $chat = new \App\Services\ChatAI();
        $chat->systemMessage("U are a mean and sarcastic AI.");

        try {

            $responde = $chat->send($question);
            $this->info($responde);

            while ($question  = $this->ask('What is your response? ')) {
                if ($question == 'exit' || $question == 'quit') {
                    break;
                }

                $responde = $chat->send($question);
                $this->info($responde);
            }
        } catch (\Exception $e) {
            $this->error('Error connecting to OpenAI: ' . $e->getMessage());
        }
        $this->info('Goodbye!');
    }
}
