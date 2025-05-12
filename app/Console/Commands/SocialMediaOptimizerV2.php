<?php

namespace App\Console\Commands;

use App\Agents\SocialMediaController;
use App\Agents\FacebookAgent;
use App\Agents\InstagramAgent;
use App\Agents\AnalyticsAgent;
use App\Agents\ContentOptimizer;
use NeuronAI\Chat\Messages\UserMessage;
use Illuminate\Console\Command;
use NeuronAI\Observability\AgentMonitoring;

class SocialMediaOptimizerV2 extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'social:optimize:v2 
                            {--monitor : Enable monitoring of agent activity}
                            {--compact : Run in compact mode with fewer tokens}
                            {--target=8 : Target score to achieve (1-10)}
                            {--attempts=3 : Maximum optimization attempts}
                            {--cache : Use cached results when possible}';

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
        
        // Setup cache for analytics results if caching is enabled
        $useCache = $this->option('cache');
        $analyticsCache = [];

        // Add monitoring if requested (temporarily disabled until Inspector package is properly set up)
        if ($this->option('monitor')) {
            $this->info("Monitoring enabled for agent activity");
            try {
                // Monitoring setup requires the Inspector package - uncomment this when properly configured
                // For now, we'll just log that it's enabled but not actually use it
                // $inspector = new \Inspector\Laravel\Inspector(config('services.inspector.ingestion_key'));
                // $agent->observe(new AgentMonitoring($inspector));
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

        // Function to extract score and analysis from analytics JSON response
        $extractAnalytics = function($text) {
            try {
                // Try to decode the JSON response
                $jsonData = json_decode($text, true);
                
                if (json_last_error() === JSON_ERROR_NONE && isset($jsonData['engagementAnalysis'])) {
                    // Successfully decoded JSON
                    return [
                        'score' => (int)($jsonData['engagementAnalysis']['engagementScore'] ?? 0),
                        'analysis' => $jsonData,
                        'isJson' => true
                    ];
                }
                
                // Fallback to regex pattern matching if JSON parsing fails
                if (preg_match('/[Ss]core:?\s*(\d+)(?:\s*\/\s*|\s+out\s+of\s+)10/', $text, $matches)) {
                    return [
                        'score' => (int)$matches[1],
                        'analysis' => $text,
                        'isJson' => false
                    ];
                }
                if (preg_match('/rating of (\d+)(?:\s*\/\s*|\s+out\s+of\s+)10/', $text, $matches)) {
                    return [
                        'score' => (int)$matches[1],
                        'analysis' => $text,
                        'isJson' => false
                    ];
                }
                if (preg_match('/(\d+)(?:\s*\/\s*|\s+out\s+of\s+)10/', $text, $matches)) {
                    return [
                        'score' => (int)$matches[1],
                        'analysis' => $text,
                        'isJson' => false
                    ];
                }
                
                // Default if no score found
                return [
                    'score' => 0,
                    'analysis' => $text,
                    'isJson' => false
                ];
            } catch (\Exception $e) {
                return [
                    'score' => 0,
                    'analysis' => $text,
                    'isJson' => false,
                    'error' => $e->getMessage()
                ];
            }
        };
        
        // Analyze Facebook content performance
        $this->info('Analyzing Facebook content performance...');
        try {                // Use the Analytics agent to analyze Facebook content
            $analyticsAgent = new \App\Agents\AnalyticsAgent();
            $prompt = $this->option('compact') 
                ? "Analyze this Facebook content (be extremely brief): $facebookResult" 
                : "Analyze this Facebook content for engagement potential: $facebookResult";
            
            // Check cache first if enabled
            $cacheKey = md5($facebookResult . '_facebook');
            if ($useCache && isset($analyticsCache[$cacheKey])) {
                $this->info("Using cached Facebook analytics result");
                $facebookAnalysisResult = $analyticsCache[$cacheKey];
            } else {
                $analyticsMessage = new UserMessage($prompt);
                $analyticsResponse = $analyticsAgent->stream($analyticsMessage);
                
                $facebookAnalysisResult = '';
                foreach ($analyticsResponse as $text) {
                    $facebookAnalysisResult .= $text;
                }
                
                // Store in cache if enabled
                if ($useCache) {
                    $analyticsCache[$cacheKey] = $facebookAnalysisResult;
                }
            }
            
            $facebookAnalytics = $extractAnalytics($facebookAnalysisResult);
            $facebookScore = $facebookAnalytics['score'];
            $this->info("Facebook Content Analysis (Score: $facebookScore/10):");
            $this->line($facebookAnalysisResult);
            $this->newLine();
            
            // Define maximum score threshold and max optimization attempts
            $maxScore = 10;
            $targetScore = $this->option('target'); // Target score to achieve from command options
            $maxAttempts = $this->option('attempts');  // Maximum number of optimization attempts from command options
            $attempts = 0;
            $prevScore = $facebookScore;
            $currentContent = $facebookResult;
            $currentAnalysis = $facebookAnalysisResult;
            $isCompactMode = $this->option('compact');
            
            // Continue optimizing until we reach target score or max attempts
            while ($prevScore < $targetScore && $attempts < $maxAttempts) {
                $attempts++;
                $this->info("Facebook optimization attempt #$attempts (Current score: $prevScore/10)");
                
                // Use ContentOptimizer to improve the content
                $contentOptimizer = new \App\Agents\ContentOptimizer();
                $optimizerMessage = new UserMessage("Improve this Facebook content based on the following analytics feedback to achieve a score of at least $targetScore/10:\n\nCurrent content: $currentContent\n\nAnalytics feedback: $currentAnalysis");
                $optimizerResponse = $contentOptimizer->stream($optimizerMessage);
                
                $improvedContent = '';
                foreach ($optimizerResponse as $text) {
                    $improvedContent .= $text;
                }
                
                $this->info("Improved Facebook Content (Attempt #$attempts):");
                $this->line($improvedContent);
                $this->newLine();
                
                // Re-analyze the improved content
                $this->info("Re-analyzing improved Facebook content (Attempt #$attempts)...");
                $prompt = $isCompactMode
                    ? "Analyze this Facebook content (be extremely brief): $improvedContent" 
                    : "Analyze this Facebook content for engagement potential: $improvedContent";
                $analyticsMessage = new UserMessage($prompt);
                $analyticsResponse = $analyticsAgent->stream($analyticsMessage);
                
                $newAnalysisResult = '';
                foreach ($analyticsResponse as $text) {
                    $newAnalysisResult .= $text;
                }
                
                $newAnalytics = $extractAnalytics($newAnalysisResult);
                $newScore = $newAnalytics['score'];
                $this->info("Improved Facebook Content Analysis (Score: $newScore/10):");
                $this->line($newAnalysisResult);
                $this->newLine();
                
                // If score improved, update the current content and continue
                if ($newScore > $prevScore) {
                    $this->info("Score improved from $prevScore to $newScore!");
                    $currentContent = $improvedContent;
                    $currentAnalysis = $newAnalysisResult;
                    $prevScore = $newScore;
                } else {
                    $this->warn("No improvement in score ($newScore <= $prevScore). Stopping optimization.");
                    break;
                }
                
                // If we've reached target score, we can stop
                if ($newScore >= $targetScore) {
                    $this->info("Target score of $targetScore/10 reached! Optimization complete.");
                    break;
                }
            }
            
            // Update the final Facebook result
            $facebookResult = $currentContent;
            $facebookScore = $prevScore;
            $this->info("Final Facebook optimization score: $facebookScore/10");
            $this->newLine();
        } catch (\Exception $e) {
            $this->error('Error analyzing Facebook content: ' . $e->getMessage());
        }
        
        // Analyze Instagram content performance
        $this->info('Analyzing Instagram content performance...');
        try {
            // Use the Analytics agent to analyze Instagram content
            $analyticsAgent = new \App\Agents\AnalyticsAgent();
            $prompt = $this->option('compact') 
                ? "Analyze this Instagram content (be extremely brief): $instagramResult" 
                : "Analyze this Instagram content for engagement potential: $instagramResult";
            $analyticsMessage = new UserMessage($prompt);
            $analyticsResponse = $analyticsAgent->stream($analyticsMessage);

            $instagramAnalysisResult = '';
            foreach ($analyticsResponse as $text) {
                $instagramAnalysisResult .= $text;
            }
            
            $instagramAnalytics = $extractAnalytics($instagramAnalysisResult);
            $instagramScore = $instagramAnalytics['score'];
            $this->info("Instagram Content Analysis (Score: $instagramScore/10):");
            $this->line($instagramAnalysisResult);
            $this->newLine();
            
            // Define maximum score threshold and max optimization attempts for Instagram
            $maxScore = 10;
            $targetScore = $this->option('target'); // Target score to achieve from command options
            $maxAttempts = $this->option('attempts');  // Maximum number of optimization attempts from command options
            $attempts = 0;
            $prevScore = $instagramScore;
            $currentContent = $instagramResult;
            $currentAnalysis = $instagramAnalysisResult;
            
            // Continue optimizing until we reach target score or max attempts
            while ($prevScore < $targetScore && $attempts < $maxAttempts) {
                $attempts++;
                $this->info("Instagram optimization attempt #$attempts (Current score: $prevScore/10)");
                
                // Use ContentOptimizer to improve the content
                $contentOptimizer = new \App\Agents\ContentOptimizer();
                $optimizerMessage = new UserMessage("Improve this Instagram content based on the following analytics feedback to achieve a score of at least $targetScore/10:\n\nCurrent content: $currentContent\n\nAnalytics feedback: $currentAnalysis");
                $optimizerResponse = $contentOptimizer->stream($optimizerMessage);
                
                $improvedContent = '';
                foreach ($optimizerResponse as $text) {
                    $improvedContent .= $text;
                }
                
                $this->info("Improved Instagram Content (Attempt #$attempts):");
                $this->line($improvedContent);
                $this->newLine();
                
                // Re-analyze the improved content
                $this->info("Re-analyzing improved Instagram content (Attempt #$attempts)...");
                $prompt = $this->option('compact')
                    ? "Analyze this Instagram content (be extremely brief): $improvedContent" 
                    : "Analyze this Instagram content for engagement potential: $improvedContent";
                $analyticsMessage = new UserMessage($prompt);
                $analyticsResponse = $analyticsAgent->stream($analyticsMessage);
                
                $newAnalysisResult = '';
                foreach ($analyticsResponse as $text) {
                    $newAnalysisResult .= $text;
                }
                
                $newAnalytics = $extractAnalytics($newAnalysisResult);
                $newScore = $newAnalytics['score'];
                $this->info("Improved Instagram Content Analysis (Score: $newScore/10):");
                $this->line($newAnalysisResult);
                $this->newLine();
                
                // If score improved, update the current content and continue
                if ($newScore > $prevScore) {
                    $this->info("Score improved from $prevScore to $newScore!");
                    $currentContent = $improvedContent;
                    $currentAnalysis = $newAnalysisResult;
                    $prevScore = $newScore;
                } else {
                    $this->warn("No improvement in score ($newScore <= $prevScore). Stopping optimization.");
                    break;
                }
                
                // If we've reached target score, we can stop
                if ($newScore >= $targetScore) {
                    $this->info("Target score of $targetScore/10 reached! Optimization complete.");
                    break;
                }
            }
            
            // Update the final Instagram result
            $instagramResult = $currentContent;
            $instagramScore = $prevScore;
            $this->info("Final Instagram optimization score: $instagramScore/10");
            $this->newLine();
        } catch (\Exception $e) {
            $this->error('Error analyzing Instagram content: ' . $e->getMessage());
        }

        // Final comparative analysis
        $this->info('Performing final comparison of optimized content...');
        try {
            // Use the Analytics agent directly
            $analyticsAgent = new \App\Agents\AnalyticsAgent();
            $prompt = $this->option('compact')
                ? "Compare Facebook and Instagram content briefly (under 50 words):\n\nFacebook: $facebookResult\n\nInstagram: $instagramResult" 
                : "Compare and analyze the engagement potential of the following optimized content for both Facebook and Instagram platforms:\n\nFacebook: $facebookResult\n\nInstagram: $instagramResult";
            $analyticsMessage = new UserMessage($prompt);
            $analyticsResponse = $analyticsAgent->stream($analyticsMessage);

            $finalAnalyticsResult = '';
            foreach ($analyticsResponse as $text) {
                $finalAnalyticsResult .= $text;
            }

            $this->info('Final Content Analysis:');
            $this->line($finalAnalyticsResult);
            $this->newLine();
        } catch (\Exception $e) {
            $this->error('Error in final analysis: ' . $e->getMessage());
        }

        $this->info("Thanks for using the Social Media Optimizer!");
    }
}
