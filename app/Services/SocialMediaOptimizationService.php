<?php

namespace App\Services;

use App\Agents\SocialMediaController;
use App\Agents\FacebookAgent;
use App\Agents\InstagramAgent;
use App\Agents\AnalyticsAgent;
use App\Agents\ContentOptimizer;
use NeuronAI\Chat\Messages\UserMessage;
use NeuronAI\Observability\AgentMonitoring;

class SocialMediaOptimizationService
{
    /**
     * The social media controller agent
     */
    protected $agent;

    /**
     * Cache for analytics results
     */
    protected $analyticsCache = [];

    /**
     * Whether to use compact mode
     */
    protected $compactMode = false;

    /**
     * Whether to use caching
     */
    protected $useCache = false;

    /**
     * Target optimization score
     */
    protected $targetScore = 8;

    /**
     * Maximum optimization attempts
     */
    protected $maxAttempts = 3;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->agent = SocialMediaController::make();
    }

    /**
     * Set the optimization options
     */
    public function setOptions(array $options): self
    {
        $this->compactMode = $options['compact'] ?? false;
        $this->useCache = $options['cache'] ?? false;
        $this->targetScore = $options['target'] ?? 8;
        $this->maxAttempts = $options['attempts'] ?? 3;

        return $this;
    }

    /**
     * Enable monitoring
     */
    public function enableMonitoring($ingestionKey = null): self
    {
        try {
            if ($ingestionKey) {
                // Implement monitoring when configured
                // $inspector = new \Inspector\Laravel\Inspector($ingestionKey);
                // $this->agent->observe(new AgentMonitoring($inspector));
            }
        } catch (\Exception $e) {
            // Log error but continue
            \Log::error('Error setting up monitoring: ' . $e->getMessage());
        }

        return $this;
    }

    /**
     * Optimize social media content for all platforms
     */
    public function optimizeContent(string $content, string $businessType, string $contentType): array
    {
        $results = [];

        // Optimize for Facebook
        $results['facebook'] = $this->optimizeFacebookContent($content, $businessType, $contentType);

        // Optimize for Instagram
        $results['instagram'] = $this->optimizeInstagramContent($content, $businessType, $contentType);

        // Final comparative analysis
        $results['comparison'] = $this->generateComparison($results['facebook']['content'], $results['instagram']['content']);

        return $results;
    }

    /**
     * Optimize content for Facebook
     */
    protected function optimizeFacebookContent(string $content, string $businessType, string $contentType): array
    {
        try {
            // Use the Facebook agent to generate initial content
            $facebookAgent = new FacebookAgent();
            $facebookMessage = new UserMessage("Optimize this content for Facebook: $content. Business type: $businessType. Content type: $contentType");
            $facebookResult = $this->streamResponse($facebookAgent->stream($facebookMessage));

            // Analyze content and optimize in a loop
            $analytics = $this->analyzeContent('Facebook', $facebookResult);
            $optimizationResult = $this->optimizeContentWithFeedback(
                $facebookResult,
                $analytics['analysis'],
                $analytics['score'],
                'Facebook'
            );

            return [
                'content' => $optimizationResult['content'],
                'score' => $optimizationResult['score'],
                'initialContent' => $facebookResult,
                'initialScore' => $analytics['score'],
                'attempts' => $optimizationResult['attempts']
            ];
        } catch (\Exception $e) {
            \Log::error('Error optimizing for Facebook: ' . $e->getMessage());
            return [
                'content' => $content,
                'score' => 0,
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Optimize content for Instagram
     */
    protected function optimizeInstagramContent(string $content, string $businessType, string $contentType): array
    {
        try {
            // Use the Instagram agent to generate initial content
            $instagramAgent = new InstagramAgent();
            $instagramMessage = new UserMessage("Optimize this content for Instagram: $content. Business type: $businessType. Content type: $contentType");
            $instagramResult = $this->streamResponse($instagramAgent->stream($instagramMessage));

            // Analyze content and optimize in a loop
            $analytics = $this->analyzeContent('Instagram', $instagramResult);
            $optimizationResult = $this->optimizeContentWithFeedback(
                $instagramResult,
                $analytics['analysis'],
                $analytics['score'],
                'Instagram'
            );

            return [
                'content' => $optimizationResult['content'],
                'score' => $optimizationResult['score'],
                'initialContent' => $instagramResult,
                'initialScore' => $analytics['score'],
                'attempts' => $optimizationResult['attempts']
            ];
        } catch (\Exception $e) {
            \Log::error('Error optimizing for Instagram: ' . $e->getMessage());
            return [
                'content' => $content,
                'score' => 0,
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Generate comparison between optimized content
     */
    protected function generateComparison(string $facebookContent, string $instagramContent): string
    {
        try {
            $analyticsAgent = new AnalyticsAgent();
            $prompt = $this->compactMode
                ? "Compare Facebook and Instagram content briefly (under 50 words):\n\nFacebook: $facebookContent\n\nInstagram: $instagramContent"
                : "Compare and analyze the engagement potential of the following optimized content for both Facebook and Instagram platforms:\n\nFacebook: $facebookContent\n\nInstagram: $instagramContent";

            $analyticsMessage = new UserMessage($prompt);
            return $this->streamResponse($analyticsAgent->stream($analyticsMessage));
        } catch (\Exception $e) {
            \Log::error('Error in final analysis: ' . $e->getMessage());
            return "Error generating comparison: " . $e->getMessage();
        }
    }

    /**
     * Analyze content for a specific platform
     */
    protected function analyzeContent(string $platform, string $content): array
    {
        $analyticsAgent = new AnalyticsAgent();
        $cacheKey = md5($content . '_' . strtolower($platform));

        // Check cache first if enabled
        if ($this->useCache && isset($this->analyticsCache[$cacheKey])) {
            $analysisResult = $this->analyticsCache[$cacheKey];
        } else {
            $prompt = $this->compactMode
                ? "Analyze this {$platform} content (be extremely brief): $content"
                : "Analyze this {$platform} content for engagement potential: $content";

            $analyticsMessage = new UserMessage($prompt);
            $analysisResult = $this->streamResponse($analyticsAgent->stream($analyticsMessage));

            // Store in cache if enabled
            if ($this->useCache) {
                $this->analyticsCache[$cacheKey] = $analysisResult;
            }
        }

        $analytics = $this->extractAnalytics($analysisResult);
        return [
            'analysis' => $analysisResult,
            'score' => $analytics['score'],
            'isJson' => $analytics['isJson']
        ];
    }

    /**
     * Optimize content based on analytics feedback
     */
    protected function optimizeContentWithFeedback(string $content, string $analysis, int $initialScore, string $platform): array
    {
        $attempts = 0;
        $prevScore = $initialScore;
        $currentContent = $content;
        $currentAnalysis = $analysis;

        // Continue optimizing until we reach target score or max attempts
        while ($prevScore < $this->targetScore && $attempts < $this->maxAttempts) {
            $attempts++;

            // Use ContentOptimizer to improve the content
            $contentOptimizer = new ContentOptimizer();
            $optimizerMessage = new UserMessage(
                "Improve this {$platform} content based on the following analytics feedback to achieve a score of at least {$this->targetScore}/10:" .
                "\n\nCurrent content: $currentContent\n\nAnalytics feedback: $currentAnalysis"
            );

            $improvedContent = $this->streamResponse($contentOptimizer->stream($optimizerMessage));

            // Re-analyze the improved content
            $newAnalysis = $this->analyzeContent($platform, $improvedContent);
            $newScore = $newAnalysis['score'];

            // If score improved, update the current content and continue
            if ($newScore > $prevScore) {
                $currentContent = $improvedContent;
                $currentAnalysis = $newAnalysis['analysis'];
                $prevScore = $newScore;
            } else {
                // No improvement, stop optimization
                break;
            }

            // If we've reached target score, we can stop
            if ($newScore >= $this->targetScore) {
                break;
            }
        }

        return [
            'content' => $currentContent,
            'score' => $prevScore,
            'attempts' => $attempts
        ];
    }

    /**
     * Helper method to extract analytics data from response
     */
    protected function extractAnalytics(string $text): array
    {
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
    }

    /**
     * Helper method to stream agent responses
     */
    protected function streamResponse($responseStream): string
    {
        $result = '';
        foreach ($responseStream as $text) {
            $result .= $text;
        }
        return $result;
    }

    /**
     * Save optimization results to a file
     *
     * @param array $results The optimization results
     * @param string $filename Optional custom filename
     * @return string The path to the saved file
     */
    public function saveResultsToFile(array $results, string $filename = null): string
    {
        try {
            // Create a timestamp-based filename if none provided
            if (!$filename) {
                $timestamp = date('Y-m-d_H-i-s');
                $filename = "social_media_optimization_{$timestamp}.txt";
            }

            // Ensure storage directory exists
            $directory = public_path('app/social_media');
            if (!file_exists($directory)) {
                mkdir($directory, 0755, true);
            }

            $filePath = $directory . '/' . $filename;

            // Format the content
            $content = "=== SOCIAL MEDIA OPTIMIZATION RESULTS ===\n";
            $content .= "Generated on: " . date('Y-m-d H:i:s') . "\n\n";

            // Facebook results
            $content .= "=== FACEBOOK CONTENT ===\n";
            $content .= "Score: {$results['facebook']['score']}/10";
            if (isset($results['facebook']['initialScore'])) {
                $content .= " (Initial: {$results['facebook']['initialScore']}/10, Attempts: {$results['facebook']['attempts']})\n";
            } else {
                $content .= "\n";
            }
            $content .= "{$results['facebook']['content']}\n\n";

            // Instagram results
            $content .= "=== INSTAGRAM CONTENT ===\n";
            $content .= "Score: {$results['instagram']['score']}/10";
            if (isset($results['instagram']['initialScore'])) {
                $content .= " (Initial: {$results['instagram']['initialScore']}/10, Attempts: {$results['instagram']['attempts']})\n";
            } else {
                $content .= "\n";
            }
            $content .= "{$results['instagram']['content']}\n\n";

            // Comparison
            $content .= "=== PLATFORM COMPARISON ===\n";
            $content .= "{$results['comparison']}\n";

            // Write to file
            file_put_contents($filePath, $content);

            return $filePath;
        } catch (\Exception $e) {
            \Log::error('Error saving results to file: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Convert optimization results to beautiful markdown format
     *
     * @param array $results The optimization results
     * @return string The markdown formatted content
     */
    public function convertToMarkdown(array $results): string
    {
        try {
            // Use the MarkdownFormatterAgent to format the results
            $markdownAgent = new \App\Agents\MarkdownFormatterAgent();

            // Prepare input data for the agent
            $input = [
                'businessName' => config('business.name', 'Hotel Driada'),
                'generatedDate' => date('Y-m-d H:i:s'),
                'facebook' => [
                    'content' => $results['facebook']['content'],
                    'score' => $results['facebook']['score'],
                    'initialScore' => $results['facebook']['initialScore'] ?? $results['facebook']['score'],
                    'attempts' => $results['facebook']['attempts'] ?? 0
                ],
                'instagram' => [
                    'content' => $results['instagram']['content'],
                    'score' => $results['instagram']['score'],
                    'initialScore' => $results['instagram']['initialScore'] ?? $results['instagram']['score'],
                    'attempts' => $results['instagram']['attempts'] ?? 0
                ],
                'comparison' => $results['comparison']
            ];

            // Convert to JSON for the agent
            $jsonInput = json_encode($input, JSON_PRETTY_PRINT);

            $message = new UserMessage("Please format the following social media optimization results as beautiful markdown:\n\n$jsonInput");
            return $this->streamResponse($markdownAgent->stream($message));

        } catch (\Exception $e) {
            \Log::error('Error converting results to markdown: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Save optimization results as markdown file
     *
     * @param array $results The optimization results
     * @param string $filename Optional custom filename
     * @return string The path to the saved markdown file
     */
    public function saveResultsAsMarkdown(array $results, string $filename = null): string
    {
        try {
            // Create a timestamp-based filename if none provided
            if (!$filename) {
                $timestamp = date('Y-m-d_H-i-s');
                $filename = "social_media_optimization_{$timestamp}.md";
            }

            // Ensure filename has .md extension
            if (!str_ends_with(strtolower($filename), '.md')) {
                $filename .= '.md';
            }

            // Ensure storage directory exists
            $directory = public_path('app/social_media');
            if (!file_exists($directory)) {
                mkdir($directory, 0755, true);
            }

            $filePath = $directory . '/' . $filename;

            // Convert results to markdown
            $markdownContent = $this->convertToMarkdown($results);

            // Write to file
            file_put_contents($filePath, $markdownContent);

            return $filePath;
        } catch (\Exception $e) {
            \Log::error('Error saving results as markdown: ' . $e->getMessage());
            throw $e;
        }
    }
}
