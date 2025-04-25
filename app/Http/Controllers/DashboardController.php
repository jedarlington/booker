<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Customer;

class DashboardController extends Controller
{
    public function index()
    {
        // Add yesterdays, today and tomorrows appointments to the dashboard.
        $data = [
            'totalCustomers' => Customer::count()
        ];

        return Inertia::render('Dashboard', [
            'data' => $data,
        ]);
    }
}
