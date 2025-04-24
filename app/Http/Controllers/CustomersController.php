<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customers;
use Inertia\Inertia;

class CustomersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customers::all();

        return Inertia::render('Customers/Index', [
            'customers' => $customers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia::render('Customers/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:Customers,email',
            'phone' => 'nullable|string|max:15',
        ]);

        Customers::create($validated);

        return redirect()->route('customers.index')->with('success', 'Customer created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Customers $Customers)
    {
        return inertia('Customers/Show', compact('Customers'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customers $Customers)
    {
        return inertia('Customers/Edit', compact('Customers'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Customers $Customers)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:Customers,email,' . $Customers->id,
            'phone' => 'nullable|string|max:15',
        ]);

        $Customers->update($validated);

        return redirect()->route('Customers.index')->with('success', 'Customers updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customers $Customers)
    {
        $Customers->delete();

        return redirect()->route('Customers.index')->with('success', 'Customers deleted successfully.');
    }
}
