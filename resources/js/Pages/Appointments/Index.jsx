import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { formatDateTime } from '@/Utils/dateUtils';

export default function Index({ appointments }) {
    const appointmentList = Array.isArray(appointments) ? appointments : [];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Appointments
                    </h2>
                    <Link
                        href="/appointments/create"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Add Appointment
                    </Link>
                </div>
            }
        >
            <Head title="Appointments" />

            <div className="py-12">
                <div className="mx-auto space-y-6 max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-4 bg-white shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        {appointmentList.length > 0 ? (
                            <ul className="space-y-4">
                                {appointmentList.map((appointment, index) => (
                                    <li
                                        key={index}
                                        className="p-4 transition-colors bg-gray-100 rounded dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                                    >
                                        <Link
                                            href={`/appointments/${appointment.id}`}
                                            className="block"
                                        >
                                            <h3 className="mb-4 text-lg font-bold text-gray-800 dark:text-gray-200">
                                                {appointment.name || 'No Title'}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Start:</strong> {appointment.startDateTime
                                                    ? formatDateTime(appointment.startDateTime)
                                                    : 'No Start Date'}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>End:</strong> {appointment.endDateTime
                                                    ? formatDateTime(appointment.endDateTime)
                                                    : 'No End Date'}
                                            </p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400">
                                No appointments available.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
