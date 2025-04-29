<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;
use Spatie\GoogleCalendar\Event;

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
        Route::bind('appointment', function ($value) {
            try {
                return Event::find($value);
            } catch (\Google\Service\Exception $e) {
                abort(404, 'Appointment not found.');
            }
        });

        Vite::prefetch(concurrency: 3);
    }
}
