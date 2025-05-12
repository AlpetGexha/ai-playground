<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ShowBusinessSettings extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'business:show';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Show the current business settings';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('=== Current Business Settings ===');

        $this->table(
            ['Setting', 'Value'],
            [
                ['Name', config('business.name')],
                ['Location', config('business.location')],
                ['Phone', config('business.phone')],
                ['Business Type', config('business.business_type')],
                ['Description', config('business.description')],
                ['Facebook', config('business.social_media.facebook') ?: 'Not set'],
                ['Instagram', config('business.social_media.instagram') ?: 'Not set'],
            ]
        );

        $this->info('These settings are used by social media optimization agents.');
        $this->info('To update these settings, run: php artisan business:update');
    }
}
