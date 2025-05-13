<?php

namespace App\Console\Commands;

use App\Services\SocialMediaOptimizationService;
use Illuminate\Console\Command;

class SocialMediaOptimizerV2 extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'agent:social-optimize
                            {--monitor : Enable monitoring of agent activity}
                            {--compact : Run in compact mode with fewer tokens}
                            {--target=8 : Target score to achieve (1-10)}
                            {--attempts=3 : Maximum optimization attempts}
                            {--cache : Use cached results when possible}
                            {--save : Save results to a file}
                            {--markdown : Save results as beautiful markdown}
                            {--filename= : Custom filename for saved results}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Optimize social media content for multiple platforms (version 2)';

    /**
     * The optimization service.
     */
    protected $service;

    /**
     * Create a new command instance.
     */
    public function __construct(SocialMediaOptimizationService $service)
    {
        parent::__construct();
        $this->service = $service;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Configure the service with command options
        $this->service->setOptions([
            'compact' => $this->option('compact'),
            'cache' => $this->option('cache'),
            'target' => $this->option('target'),
            'attempts' => $this->option('attempts')
        ]);

        // Add monitoring if requested
        if ($this->option('monitor')) {
            $this->info("Monitoring enabled for agent activity");
            try {
                $this->service->enableMonitoring();
                $this->warn("Monitoring is currently disabled due to pending package configuration");
            } catch (\Exception $e) {
                $this->error("Error setting up monitoring: " . $e->getMessage());
            }
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

        // Use the service to optimize content for all platforms
        $this->info('Optimizing content for all platforms...');

        try {
            // Get optimized content from service
            $results = $this->service->optimizeContent($content, $businessType, $contentType);

            // Display Facebook results
            $this->info('Facebook Optimized Content:');
            $this->line($results['facebook']['content']);
            $this->newLine();
            $this->info("Facebook Content Analysis (Score: {$results['facebook']['score']}/10)");
            if ($results['facebook']['initialScore'] != $results['facebook']['score']) {
                $this->info("Score improved from {$results['facebook']['initialScore']} to {$results['facebook']['score']} in {$results['facebook']['attempts']} attempts.");
            }
            $this->newLine();

            // Display Instagram results
            $this->info('Instagram Optimized Content:');
            $this->line($results['instagram']['content']);
            $this->newLine();
            $this->info("Instagram Content Analysis (Score: {$results['instagram']['score']}/10)");
            if ($results['instagram']['initialScore'] != $results['instagram']['score']) {
                $this->info("Score improved from {$results['instagram']['initialScore']} to {$results['instagram']['score']} in {$results['instagram']['attempts']} attempts.");
            }
            $this->newLine();

            // Display comparison
            $this->info('Platform Comparison:');
            $this->line($results['comparison']);
            $this->newLine();

            // Save results to a file if requested
            if ($this->option('save')) {
                try {
                    $filename = $this->option('filename');

                    // Check if markdown format is requested
                    if ($this->option('markdown')) {
                        $filePath = $this->service->saveResultsAsMarkdown($results, $filename);
                        $this->info("Results have been saved as beautiful markdown to: $filePath");
                    } else {
                        $filePath = $this->service->saveResultsToFile($results, $filename);
                        $this->info("Results have been saved to: $filePath");
                    }
                    $this->newLine();
                } catch (\Exception $e) {
                    $this->error("Error saving results to file: " . $e->getMessage());
                    // Continue execution even if saving fails
                }
            }

        } catch (\Exception $e) {
            $this->error('Error optimizing content: ' . $e->getMessage());
            return 1;
        }

        $this->info("Thanks for using the Social Media Optimizer!");
        return 0;
    }
}
