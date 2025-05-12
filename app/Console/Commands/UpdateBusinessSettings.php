<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class UpdateBusinessSettings extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'business:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update business information for social media optimization';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('=== Business Information Update ===');
        $this->info('This will update the business information used by the AI agents.');
        $this->newLine();

        // Get current values from config
        $currentName = config('business.name');
        $currentPhone = config('business.phone');
        $currentLocation = config('business.location');

        // Ask for new values
        $name = $this->ask('Business Name', $currentName);
        $phone = $this->ask('Business Phone', $currentPhone);
        $location = $this->ask('Business Location', $currentLocation);

        // Additional information
        $description = $this->ask('Short Business Description', config('business.description'));

        $businessType = $this->choice(
            'Business Type',
            ['hotel', 'restaurant', 'hotel_restaurant'],
            'hotel_restaurant'
        );

        $facebookHandle = $this->ask('Facebook Handle (optional)', config('business.social_media.facebook'));
        $instagramHandle = $this->ask('Instagram Handle (optional)', config('business.social_media.instagram'));

        // Create environment variable updates
        $envUpdates = [
            'BUSINESS_NAME' => $name,
            'BUSINESS_PHONE' => $phone,
            'BUSINESS_LOCATION' => $location,
            'BUSINESS_TYPE' => $businessType,
            'BUSINESS_DESCRIPTION' => $description,
            'BUSINESS_FACEBOOK' => $facebookHandle,
            'BUSINESS_INSTAGRAM' => $instagramHandle,
        ];

        // Update .env file
        $this->updateEnvFile($envUpdates);

        $this->info('Business information updated successfully!');
        $this->info('Please restart your application for the changes to take effect.');
    }

    /**
     * Update the .env file with new values
     */
    protected function updateEnvFile(array $updates)
    {
        $envFilePath = base_path('.env');

        if (!File::exists($envFilePath)) {
            $this->error('.env file not found!');
            return;
        }

        $envContents = File::get($envFilePath);

        foreach ($updates as $key => $value) {
            // Escape any quotes in the value
            $value = str_replace('"', '\"', $value);

            // Check if the key exists in the .env file
            if (preg_match("/^{$key}=/m", $envContents)) {
                // Update existing key
                $envContents = preg_replace("/^{$key}=.*/m", "{$key}=\"{$value}\"", $envContents);
            } else {
                // Add new key
                $envContents .= PHP_EOL . "{$key}=\"{$value}\"";
            }
        }

        File::put($envFilePath, $envContents);
    }
}
