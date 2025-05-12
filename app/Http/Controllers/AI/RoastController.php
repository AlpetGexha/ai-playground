<?php

namespace App\Http\Controllers\AI;

use App\Http\Controllers\Controller;
use App\Services\ChatAI;
use Faker\Provider\ar_EG\Internet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoastController extends Controller
{
    /**
     * Handle the incoming request.
     */
    /**
     * Show the roast form page
     */
    public function index()
    {
        return Inertia::render('Roast/Index');
    }

    /**
     * Handle the roast generation request.
     */
    public function store(Request $request)
    {
        $request->validate([
            'topic' => 'required|string|min:3|max:500',
        ]);

        // TODO: Me mujt me ndru voicin e kti zotnis

        // Disable SSL verification in local environment to avoid certificate issues
        $chat = new ChatAI();
        $chat->systemMessage('You are a savage roast master with a sharp tongue and no filter. Your job is to roast the user\'s topic with brutal sarcasm and humor. You are not afraid to offend, and you take pride in your ability to make people laugh at their own expense. NO THEM NO MERCY.');
        $pormpt ="Roast the topic '{$request->topic}' with savage sarcasm, zero mercy, and maximum wit. Make it brutal, creative, and funny like you're the master of comebacks.";
// Roast my fake friend who ditched me and our BFF squad for some crusty new friends — right in front of my eyes. Act like you’ve been holding this roast in for months. Be sarcastic, disrespectful, and brutally hilarious. Drag them like it’s the season finale of a drama series.
        try {
            $mp3 = $chat->send(
                message: $pormpt,
                speech: true
            );

            $filename = time() . '-' . str()->random(7) . '.mp3';
            $path = 'roast/' . $filename;

            // Create directory if it doesn't exist
            if (!file_exists(public_path('roast'))) {
                mkdir(public_path('roast'), 0755, true);
            }

            file_put_contents(public_path($path), $mp3);

            return response()->json([
                'success' => true,
                'message' => 'Roast generated successfully!',
                'file_url' => asset($path),
                'topic' => $request->topic
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to generate roast: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the roast result page
     */
    public function show(Request $request, $filename)
    {
        return Inertia::render('Roast/Show', [
            'mp3' => 'roast/' . $filename,
            'topic' => $request->query('topic', 'Topic'),
            'flash' => "BOOM. You just got roasted!"
        ]);
    }
}
