<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\GoogleCalendar\Event;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Models\Customer;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $appointments = Event::get();

        // $filteredAppointments = $appointments->filter(function ($appointment) {
        //     return $appointment->colorId === '3';
        // });

        // $filteredAppointmentsArray = $filteredAppointments->map(function ($appointment) {
        //     return [
        //         'id' => $appointment->id,
        //         'name' => $appointment->name,
        //         'description' => $appointment->description,
        //         'location' => $appointment->location,
        //         'startDateTime' => $appointment->startDateTime,
        //         'endDateTime' => $appointment->endDateTime,
        //         'colorId' => $appointment->colorId,
        //     ];
        // })->values()->toArray();

        // return Inertia::render('Appointments/Index', [
        //     'appointments' => $filteredAppointmentsArray,
        // ]);

        return Inertia::render('Appointments/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $customers = Customer::all(['id', 'name']);

        return Inertia::render('Appointments/Create', [
            'customers' => $customers
        ]);
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
            'colorId' => 'nullable|integer|min:1|max:11',
            'customer_id' => 'required|exists:customers,id'
        ]);

        // Fetch the customer's email address
        $customer = Customer::findOrFail($validated['customer_id']);

        // Create the event with the attendee
        $event = Event::create([
            'name' => $validated['summary'],
            'description' => $validated['description'],
            'location' => $validated['location'],
            'startDateTime' => Carbon::parse($validated['start']),
            'endDateTime' => Carbon::parse($validated['end'])
        ]);

        // if (!empty($customer->email)) {
        //     $event->addAttendee([
        //         'email' => $customer->email,
        //         'name' => $customer->name,
        //         'responseStatus' => 'needsAction',
        //     ]);
        // }

        if (!empty($validated['colorId'])) {
            $event->setColorId($validated['colorId']);
            $event->save();
        }

        if ($request->wantsJson()) {
            return response()->json([
                'appointment' => [
                    'id' => $event->id,
                    'name' => $event->name,
                    'description' => $event->description,
                    'location' => $event->location,
                    'startDateTime' => $event->startDateTime,
                    'endDateTime' => $event->endDateTime,
                    'colorId' => $event->colorId,
                ]
            ]);
        }

        $appointment = [
            'id' => $event->id,
            'name' => $event->name,
            'description' => $event->description,
            'location' => $event->location,
            'startDateTime' => $event->startDateTime,
            'endDateTime' => $event->endDateTime,
            'colorId' => $event->colorId,
        ];

        return redirect()
            ->route('appointments.index')
            ->with('success', 'Appointment created successfully.')
            ->with('newAppointment', $appointment);
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $appointment)
    {
        return Inertia::render('Appointments/Show', [
            'appointment' => $appointment,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $appointment)
    {
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
    public function update(Request $request, Event $appointment)
    {
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
    public function destroy(Event $appointment)
    {
        $appointment->delete();
        return redirect()->route('appointments.index')->with('success', 'Appointment deleted successfully.');
    }

    /**
     * Display a listing of the resource for API.
     */
    public function apiIndex()
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

        return response()->json($filteredAppointmentsArray);
    }
}
