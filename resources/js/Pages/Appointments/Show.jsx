import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { formatDateTime } from '@/Utils/dateUtils';
import axios from 'axios';

export default function Show({ appointment }) {
    const {} = usePage().props;

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this appointment?')) {
            axios
                .delete(`/appointments/${appointment.googleEvent.id}`)
                .then(() => {
                    window.location.href = '/appointments';
                })
                .catch((error) => {
                    console.error('Error deleting appointment:', error);
                    alert('Failed to delete the appointment. Please try again.');
                });
        }
    };

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
                        <div className="flex mt-6 space-x-4">
                            <a
                                href="/appointments"
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                            >
                                Back to Appointments
                            </a>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                            >
                                Delete Appointment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
