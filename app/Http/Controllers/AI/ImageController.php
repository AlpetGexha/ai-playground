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
            'prompt' => 'required|string|min:3|max:4000',
            'model' => 'nullable|string|in:dall-e-2,dall-e-3,gpt-image-1',
            'n' => 'nullable|integer|min:1|max:10',
            'quality' => 'nullable|string|in:auto,standard,hd,high,medium,low',
            'size' => 'nullable|string',
            'style' => 'nullable|string|in:vivid,natural',
            'response_format' => 'nullable|string|in:url,b64_json',
            'background' => 'nullable|string|in:auto,transparent,opaque',
            'moderation' => 'nullable|string|in:auto,low',
            'output_format' => 'nullable|string|in:png,jpeg,webp',
            'output_compression' => 'nullable|integer|min:0|max:100',
        ]);

        try {
            // Base prompt
            $basePrompt = $request->prompt;

            // If using dall-e-3 and no model-specific options are chosen, enhance the prompt
            if (($request->model === 'dall-e-3' || $request->model === null) &&
                !$request->has('background') && !$request->has('moderation') &&
                !$request->has('output_format') && !$request->has('output_compression')) {
                $prompt = "Create a detailed, high-quality image of: {$basePrompt}. Make it visually stunning with good lighting and composition.";
            } else {
                $prompt = $basePrompt;
            }

            // Build OpenAI parameters
            $params = [
                'prompt' => $prompt,
                'model' => $request->model ?? 'dall-e-3',
            ];

            // Add optional parameters if they were provided
            if ($request->has('n') && ($params['model'] !== 'dall-e-3' || $request->n == 1)) {
                $params['n'] = (int)$request->n;
            }

            if ($request->has('quality')) {
                // Handle different quality options based on model
                $quality = $request->quality;
                if ($params['model'] === 'dall-e-3' && in_array($quality, ['hd', 'standard'])) {
                    $params['quality'] = $quality;
                } elseif ($params['model'] === 'gpt-image-1' && in_array($quality, ['high', 'medium', 'low'])) {
                    $params['quality'] = $quality;
                } elseif ($quality === 'auto') {
                    $params['quality'] = $quality;
                }
            }

            if ($request->has('size')) {
                $size = $request->size;
                // Validate size based on model
                $validSizes = [
                    'dall-e-2' => ['256x256', '512x512', '1024x1024'],
                    'dall-e-3' => ['1024x1024', '1792x1024', '1024x1792'],
                    'gpt-image-1' => ['1024x1024', '1536x1024', '1024x1536', 'auto']
                ];

                $model = $params['model'];
                if (isset($validSizes[$model]) && in_array($size, $validSizes[$model])) {
                    $params['size'] = $size;
                } elseif ($size === 'auto' && $model === 'gpt-image-1') {
                    $params['size'] = 'auto';
                }
            }

            if ($request->has('style') && $params['model'] === 'dall-e-3') {
                $params['style'] = $request->style;
            }

            if ($request->has('response_format') && in_array($params['model'], ['dall-e-2', 'dall-e-3'])) {
                $params['response_format'] = $request->response_format;
            }

            // gpt-image-1 specific options
            if ($params['model'] === 'gpt-image-1') {
                if ($request->has('background')) {
                    $params['background'] = $request->background;
                }

                if ($request->has('moderation')) {
                    $params['moderation'] = $request->moderation;
                }

                if ($request->has('output_format')) {
                    $params['output_format'] = $request->output_format;
                }

                if ($request->has('output_compression') &&
                    in_array($request->output_format ?? 'png', ['webp', 'jpeg'])) {
                    $params['output_compression'] = (int)$request->output_compression;
                }
            }

            $response = OpenAI::images()->create($params);

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
