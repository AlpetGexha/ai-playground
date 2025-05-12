<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BusinessSettings extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'business_name',
        'business_type', // hotel, restaurant, or both
        'phone',
        'address',
        'email',
        'website',
        'social_facebook',
        'social_instagram',
        'social_twitter',
        'social_linkedin',
        'logo_path',
        'description',
        'slogan',
        'opening_hours',
    ];

    /**
     * Get the current business settings.
     *
     * @return \App\Models\BusinessSettings
     */
    public static function current()
    {
        // Try to get the first record
        $settings = self::first();

        // If no settings exist, create default settings
        if (!$settings) {
            $settings = self::create([
                'business_name' => 'Hotel Driada',
                'business_type' => 'both',
                'phone' => '+383 44 567 631',
                'address' => 'Pika e Zez, Gjakove',
                'email' => 'info@hoteldriada.com',
                'description' => 'A premium hotel and restaurant offering exceptional service and dining experiences.',
            ]);
        }

        return $settings;
    }
}
