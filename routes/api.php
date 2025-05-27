<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AppointmentController;

Route::middleware('auth:sanctum')->get('appointments', [AppointmentController::class, 'apiIndex']);
