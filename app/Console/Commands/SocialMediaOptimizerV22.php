<?php

namespace App\Console\Commands;

use App\Agents\SocialMediaController;
use NeuronAI\Chat\Messages\UserMessage;
use Illuminate\Console\Command;
use NeuronAI\Observability\AgentMonitoring;
use Inspector\Configuration;
use Inspector\Inspector;

class SocialMediaOptimizerV22 extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'social:optimize {--monitor : Enable monitoring of agent activity} {--direct : Skip the interactive mode and directly optimize content}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Optimize social media content for multiple platforms';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Initialize agent
        $agent = SocialMediaController::make();

        // Add monitoring if requested
        if ($this->option('monitor')) {
            $this->info("Monitoring enabled for agent activity");
            $inspector = new Inspector(
                new Configuration(config('services.inspector.ingestion_key'))
            );
            $agent->observe(new AgentMonitoring($inspector));
        }

        $this->info("=== Social Media Content Optimizer ===");
        $this->info("This tool will help you optimize content for multiple social media platforms.");
        $this->info("Currently supporting: Facebook, Instagram");

        // Display business info
        $businessName = config('business.name');
        $businessLocation = config('business.location');
        $businessPhone = config('business.phone');

        $this->newLine();
        $this->info("Business Information:");
        $this->line("Name: $businessName");
        $this->line("Location: $businessLocation");
        $this->line("Phone: $businessPhone");
        $this->newLine();

        if ($this->option('direct')) {
            $this->directMode($agent);
            return;
        }

        // Introduction
        $this->info("Agent Introduction:");
        $response = $agent->stream(new UserMessage("Hi, I run a hotel and restaurant business. Explain how you can help me optimize my social media content."));

        foreach ($response as $text) {
            $this->output->write($text);
        }
        $this->newLine(2);

        // Get content information
        $businessType = $this->choice(
            'What type of content are you creating?',
            ['hotel', 'restaurant', 'both'],
            2
        );

        $contentType = $this->choice(
            'What type of post are you creating?',
            ['promotion', 'announcement', 'event', 'general update', 'special offer'],
            0
        );

        $content = $this->ask('Enter your base content that you want to optimize');
        if (empty($content)) {
            $this->error('Content cannot be empty.');
            return;
        }

        // Process with the agent
        $this->info('Processing your content for optimization...');
        $prompt = "I need to create a {$contentType} post for my {$businessType} business. Here's my base content: {$content}. Please optimize it for both Facebook and Instagram, ensuring it performs well on each platform. Make sure to use the create_facebook_post tool with content parameter for Facebook and create_instagram_post tool with content parameter for Instagram.";

        $this->info('Agent Response:');
        $response = $agent->stream(new UserMessage($prompt));

        foreach ($response as $text) {
            $this->output->write($text);
        }
        $this->newLine(2);

        // Interactive follow-up
        $this->info('You can ask follow-up questions or type "exit" to quit.');

        do {
            $input = $this->ask('You');

            if (empty($input) || strtolower($input) === 'exit') {
                break;
            }

            $this->info('Agent:');
            $response = $agent->stream(new UserMessage($input));

            foreach ($response as $text) {
                $this->output->write($text);
            }
            $this->newLine(2);
        } while (true);

        $this->info("Thanks for using the Social Media Optimizer!");
    }

    /**
     * Direct mode for immediate content optimization
     */
    protected function directMode($agent)
    {
        $this->info("Direct Mode: Immediately optimize content for all platforms");

        // Get minimal information needed
        $content = $this->ask('Enter your base content that you want to optimize');
        if (empty($content)) {
            $this->error('Content cannot be empty.');
            return;
        }

        $businessType = $this->choice(
            'Business focus',
            ['hotel', 'restaurant', 'both'],
            2
        );

        // Process with the agent - with explicit instructions to use tools properly
        $prompt = "I need to create a post for my {$businessType} business. Content: \"{$content}\".
        1. Use the create_facebook_post tool with parameters content=\"{$content}\" and business_type=\"{$businessType}\".
        2. Use the create_instagram_post tool with parameters content=\"{$content}\" and business_type=\"{$businessType}\".
        3. Present both optimized versions.";

        $this->info('Processing...');
        $response = $agent->stream(new UserMessage($prompt));

        foreach ($response as $text) {
            $this->output->write($text);
        }
        $this->newLine(2);
    }
}
