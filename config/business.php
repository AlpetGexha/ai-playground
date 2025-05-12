<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Business Information
    |--------------------------------------------------------------------------
    |
    | This file contains the basic information about your business that
    | will be used by the AI agents for social media optimization.
    |
    */

    'name' => env('BUSINESS_NAME', 'Hotel Driada'),
    'phone' => env('BUSINESS_PHONE', '+383 44 567 631'),
    'location' => env('BUSINESS_LOCATION', 'Pika e Zez, Gjakove'),

    'social_media' => [
        'facebook' => env('BUSINESS_FACEBOOK', ''),
        'instagram' => env('BUSINESS_INSTAGRAM', ''),
    ],

    'business_type' => env('BUSINESS_TYPE', 'hotel_restaurant'), // hotel, restaurant, hotel_restaurant

    'description' => env('BUSINESS_DESCRIPTION', 'A beautiful hotel and restaurant offering excellent accommodation and dining experience.'),

    'specialties' => [
        'hotel' => [
            'Comfortable rooms',
            'Excellent service',
            'Great location',
        ],
        'restaurant' => [
            'Local cuisine',
            'Fresh ingredients',
            'Cozy atmosphere',
        ],
    ],
];
