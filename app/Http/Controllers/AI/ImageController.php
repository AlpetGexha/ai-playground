<?php

namespace App\Http\Controllers\AI;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use OpenAI\Laravel\Facades\OpenAI;

class ImageController extends Controller
{
    public function index()
    {
        return Inertia::render('Image/Index');
    }

    public function gallery()
    {
        $imageFiles = File::files(public_path('images'));
        $images = [];

        foreach ($imageFiles as $file) {
            $filename = pathinfo($file, PATHINFO_FILENAME);
            $extension = pathinfo($file, PATHINFO_EXTENSION);

            // Skip if not an image file
            if (!in_array(strtolower($extension), ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
                continue;
            }

            // Extract timestamp and prompt from filename
            $parts = explode('-', $filename, 2);
            $timestamp = $parts[0] ?? '';
            $promptSlug = $parts[1] ?? '';

            // Convert timestamp to readable date
            $date = date('M j, Y g:i A', (int)$timestamp);

            // Clean up the prompt slug
            $prompt = str_replace('-', ' ', $promptSlug);
            $prompt = ucfirst(trim($prompt));

            $images[] = [
                'id' => $filename,
                'url' => asset('images/' . $filename . '.' . $extension),
                'prompt' => $prompt,
                'date' => $date,
                'timestamp' => $timestamp,
            ];
        }

        // Sort images by timestamp (most recent first)
        usort($images, function($a, $b) {
            return $b['timestamp'] - $a['timestamp'];
        });

        return Inertia::render('Image/Gallery', [
            'images' => $images
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'prompt' => 'required|string|min:3|max:1000',
        ]);

        try {
            // Enhance the prompt for better results
            $prompt = "Create a detailed, high-quality image of: {$request->prompt}. Make it visually stunning with good lighting and composition.";

            $response = OpenAI::images()->create([
                'prompt' => $prompt,
                'model' => 'dall-e-3',
                // 'n' => 1,
                // 'size' => '1024x1024',
                // 'quality' => 'standard',
                // 'style' => 'vivid'
            ]);

            $url = $response->data[0]->url;

            // Download and save the image locally
            $sanitizedPrompt = preg_replace('/[^a-z0-9]+/', '-', strtolower(substr($request->prompt, 0, 30)));
            $imageName = time() . '-' . $sanitizedPrompt . '.png';
            $imagePath = 'images/' . $imageName;

            try {
                if (!file_exists(public_path('images'))) {
                    mkdir(public_path('images'), 0755, true);
                }

                // Get image content with a timeout
                $imageContent = file_get_contents($url, false, stream_context_create([
                    'http' => [
                        'timeout' => 120,
                    ]
                ]));

                if ($imageContent !== false) {
                    file_put_contents(public_path($imagePath), $imageContent);
                    return asset($imagePath) . '?t=' . time();
                } else {
                    // If we can't download the image, return original URL
                    return $url;
                }
            } catch (\Exception $e) {
                // Fallback to original URL if saving fails
                return $url;
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to generate image: ' . $e->getMessage()
            ], 500);
        }
    }
}
