<?php

namespace App\Console\Commands;

use App\Agents\SocialMediaController;
use NeuronAI\Chat\Messages\UserMessage;
use Illuminate\Console\Command;
use NeuronAI\Observability\AgentMonitoring;
use Inspector\Configuration;
use Inspector\Inspector;

class SocialMediaOptimizerV2 extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'social:optimize:v2 {--monitor : Enable monitoring of agent activity}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Optimize social media content for multiple platforms (version 2)';

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

        // Get the business information from config
        $businessName = config('business.name');
        $businessLocation = config('business.location');
        $businessPhone = config('business.phone');

        $this->info("=== Social Media Content Optimizer ===");
        $this->info("This tool will help you optimize content for multiple social media platforms.");
        $this->info("Currently supporting: Facebook, Instagram");

        $this->newLine();
        $this->info("Business Information:");
        $this->line("Name: $businessName");
        $this->line("Location: $businessLocation");
        $this->line("Phone: $businessPhone");
        $this->newLine();

        // Get content information directly
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
            return 1;
        }

        // Process content for Facebook
        $this->info('Optimizing for Facebook...');
        try {
            // Use the Facebook agent directly for more control
            $facebookAgent = new \App\Agents\FacebookAgent();
            $facebookMessage = new UserMessage("Optimize this content for Facebook: $content. Business type: $businessType. Content type: $contentType");
            $facebookResponse = $facebookAgent->stream($facebookMessage);

            $facebookResult = '';
            foreach ($facebookResponse as $text) {
                $facebookResult .= $text;
            }

            $this->info('Facebook Optimized Content:');
            $this->line($facebookResult);
            $this->newLine();
        } catch (\Exception $e) {
            $this->error('Error optimizing for Facebook: ' . $e->getMessage());
        }

        // Process content for Instagram
        $this->info('Optimizing for Instagram...');
        try {
            // Use the Instagram agent directly
            $instagramAgent = new \App\Agents\InstagramAgent();
            $instagramMessage = new UserMessage("Optimize this content for Instagram: $content. Business type: $businessType. Content type: $contentType");
            $instagramResponse = $instagramAgent->stream($instagramMessage);

            $instagramResult = '';
            foreach ($instagramResponse as $text) {
                $instagramResult .= $text;
            }

            $this->info('Instagram Optimized Content:');
            $this->line($instagramResult);
            $this->newLine();
        } catch (\Exception $e) {
            $this->error('Error optimizing for Instagram: ' . $e->getMessage());
        }

        // Analyze content performance
        $this->info('Analyzing content performance...');
        try {
            // Use the Analytics agent directly
            $analyticsAgent = new \App\Agents\AnalyticsAgent();
            $analyticsMessage = new UserMessage("Compare and analyze the engagement potential of the following content for both Facebook and Instagram platforms: $content");
            $analyticsResponse = $analyticsAgent->stream($analyticsMessage);

            $analyticsResult = '';
            foreach ($analyticsResponse as $text) {
                $analyticsResult .= $text;
            }

            $this->info('Content Analysis:');
            $this->line($analyticsResult);
            $this->newLine();
        } catch (\Exception $e) {
            $this->error('Error analyzing content: ' . $e->getMessage());
        }

        $this->info("Thanks for using the Social Media Optimizer!");
    }
}
