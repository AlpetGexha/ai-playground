<?php

namespace App\Console\Commands;

use App\Agents\YouTubeAgent;
use NeuronAI\Chat\Messages\UserMessage;
use Illuminate\Console\Command;
use NeuronAI\Observability\AgentMonitoring;
use Inspector\Configuration;
use Inspector\Inspector;

class agent extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'agent:youtube';

    /**
     * The console command description.
     *te
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $agent = YouTubeAgent::make();

        // Agent introduction
        $this->info("Agent Introduction:");
        $response = $agent->stream(new UserMessage("Hi, let me know who you are, and how you can help me."));

        foreach ($response as $text) {
            $this->output->write($text);
        }
        $this->newLine(2);

        // Interactive console
        do {
            $input = $this->ask('You');

            if (empty($input)) {
                break;
            }

            $this->info('Agent:');
            $response = $agent->stream(new UserMessage($input));

            foreach ($response as $text) {
                $this->output->write($text);
            }
            $this->newLine(2);
        } while (true);
    }
}
