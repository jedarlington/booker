import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { formatDateTime } from '@/Utils/dateUtils';

export default function Show({ appointment }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Appointment Details
                </h2>
            }
        >
            <Head title="Appointment Details" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white shadow sm:rounded-lg dark:bg-gray-800">
                        <h3 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-200">
                            {appointment.googleEvent.summary}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            <strong>Start:</strong> {formatDateTime(appointment.googleEvent.start.dateTime || appointment.googleEvent.start.date)}
                        </p>
                        <p className="mb-4 text-gray-600 dark:text-gray-400">
                            <strong>End:</strong> {formatDateTime(appointment.googleEvent.end.dateTime || appointment.googleEvent.end.date)}
                        </p>
                        <p className="mb-4 text-gray-600 dark:text-gray-400">
                            <strong>Description:</strong> {appointment.googleEvent.description || 'No description available.'}
                        </p>
                        <p className="mb-4 text-gray-600 dark:text-gray-400">
                            <strong>Location:</strong> {appointment.googleEvent.location || 'No location specified.'}
                        </p>
                        <p className="mb-4 text-gray-600 dark:text-gray-400">
                            <strong>Event Type:</strong> {appointment.googleEvent.eventType || 'No event type specified.'}
                        </p>
                        <div className="mb-4 text-gray-600 dark:text-gray-400">
                            <strong>Attendees:</strong>
                            {appointment.googleEvent.attendees && appointment.googleEvent.attendees.length > 0 ? (
                                <ul className="mt-2 list-disc list-inside">
                                    {appointment.googleEvent.attendees.map((attendee, index) => (
                                        <li key={index}>
                                            {attendee.email} {attendee.responseStatus && `(${attendee.responseStatus})`}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No attendees available.</p>
                            )}
                        </div>
                        <p className="mb-4 text-gray-600 dark:text-gray-400">
                            <a
                                href={appointment.googleEvent.htmlLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                View in Google Calendar
                            </a>
                        </p>
                        <div className="mt-6">
                            <a
                                href="/appointments"
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                            >
                                Back to Appointments
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
