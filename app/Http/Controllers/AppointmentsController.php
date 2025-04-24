<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\GoogleCalendar\Event;
use Inertia\Inertia;
use Carbon\Carbon;

class AppointmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $appointments = Event::get();

        $filteredAppointments = $appointments->filter(function ($appointment) {
            return $appointment->colorId === '3';
        });

        $filteredAppointmentsArray = $filteredAppointments->map(function ($appointment) {
            return [
                'id' => $appointment->id,
                'name' => $appointment->name,
                'description' => $appointment->description,
                'location' => $appointment->location,
                'startDateTime' => $appointment->startDateTime,
                'endDateTime' => $appointment->endDateTime,
                'colorId' => $appointment->colorId,
            ];
        })->values()->toArray();

        return Inertia::render('Appointments/Index', [
            'appointments' => $filteredAppointmentsArray,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Appointments/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'summary' => 'required|string|max:255',
            'description' => 'nullable|string',
            'location' => 'nullable|string',
            'start' => 'required|date',
            'end' => 'required|date|after:start',
            'colorId' => 'nullable|integer|min:1|max:11'
        ]);

        $appointment = Event::create([
            'name' => $validated['summary'],
            'description' => $validated['description'],
            'location' => $validated['location'],
            'startDateTime' => Carbon::parse($validated['start']),
            'endDateTime' => Carbon::parse($validated['end']),
        ]);

        if (!empty($validated['colorId'])) {
            $appointment->setColorId($validated['colorId']);
            $appointment->save();
        }

        return redirect()->route('appointments.index')->with('success', 'Appointment created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $appointment = Event::find($id);

        if (!$appointment) {
            abort(404, 'Appointment not found');
        }

        return Inertia::render('Appointments/Show', [
            'appointment' => $appointment,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $appointment = Event::find($id);

        if (!$appointment) {
            abort(404, 'Appointment not found');
        }

        return Inertia::render('Appointments/Edit', [
            'appointment' => [
                'id' => $appointment->id,
                'name' => $appointment->name,
                'description' => $appointment->description,
                'location' => $appointment->location,
                'startDateTime' => $appointment->startDateTime,
                'endDateTime' => $appointment->endDateTime,
                'colorId' => $appointment->colorId,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $appointment = Event::find($id);

        if (!$appointment) {
            abort(404, 'Appointment not found');
        }

        $validated = $request->validate([
            'summary' => 'required|string|max:255',
            'description' => 'nullable|string',
            'location' => 'nullable|string',
            'start' => 'required|date',
            'end' => 'required|date|after:start',
            'colorId' => 'nullable|integer|min:1|max:11',
        ]);

        $appointment->name = $validated['summary'];
        $appointment->description = $validated['description'];
        $appointment->location = $validated['location'];
        $appointment->startDateTime = Carbon::parse($validated['start']);
        $appointment->endDateTime = Carbon::parse($validated['end']);

        if (!empty($validated['colorId'])) {
            $appointment->setColorId($validated['colorId']);
        }

        $appointment->save();

        return redirect()->route('appointments.index')->with('success', 'Appointment updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $appointment = Event::find($id);

        if (!$appointment) {
            abort(404, 'Appointment not found');
        }

        $appointment->delete();

        return redirect()->route('appointments.index')->with('success', 'Appointment deleted successfully.');
    }
}
