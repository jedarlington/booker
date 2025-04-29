<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')
            ->scopes(['https://www.googleapis.com/auth/calendar'])
            ->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            // Use stateless() to avoid session issues in API-based apps
            $googleUser = Socialite::driver('google')->stateless()->user();

            // Ensure the authenticated user exists
            $user = Auth::user();
            if (!$user) {
                return redirect()->route('login')->with('error', 'You must be logged in to connect your Google account.');
            }

            // Save the user's Google token and refresh token
            $user->google_token = $googleUser->token;
            $user->google_refresh_token = $googleUser->refreshToken;
            $user->save();

            return redirect()->route('appointments.index')->with('success', 'Google account connected successfully.');
        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Google OAuth Callback Error: ' . $e->getMessage());

            return redirect()->route('appointments.index')->with('error', 'Failed to connect Google account. Please try again.');
        }
    }
}
