<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Console\Scheduling\Schedule;
use App\Console\Commands\SocialMediaOptimizer;
use App\Console\Commands\SocialMediaOptimizerV2;
use App\Console\Commands\UpdateBusinessSettings;
use App\Console\Commands\ShowBusinessSettings;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register console commands
        if ($this->app->runningInConsole()) {
            $this->commands([
                SocialMediaOptimizer::class,
                SocialMediaOptimizerV2::class,
                UpdateBusinessSettings::class,
                ShowBusinessSettings::class,
            ]);
        }
    }
}
