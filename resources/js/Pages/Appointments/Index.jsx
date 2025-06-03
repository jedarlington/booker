import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { formatDateTime } from '@/Utils/dateUtils';
import { addAppointment, removeAppointment } from '@/store/appointmentsSlice';

export default function Index() {
    const appointmentList = useSelector(state => state.appointments.items);
    const dispatch = useDispatch();
    const { newAppointment } = usePage().props;

    useEffect(() => {
        if (
            newAppointment &&
            !appointmentList.some(a => String(a.id) === String(newAppointment.id))
        ) {
            dispatch(addAppointment(newAppointment));
        }
    }, [newAppointment, appointmentList, dispatch]);

    const handleDelete = (id, e) => {
        if (!confirm('Are you sure you want to delete this appointment?')) {
            e.preventDefault();
            return;
        }
        dispatch(removeAppointment(id));
    };

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
                    <div className="bg-white shadow sm:rounded-lg dark:bg-gray-800">
                        {appointmentList.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Summary</th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Start</th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">End</th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                    {appointmentList.map((appointment) => (
                                        <tr key={appointment.id}>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap dark:text-gray-200">
                                                {appointment.name || 'No Title'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                {formatDateTime(appointment.startDateTime)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                {formatDateTime(appointment.endDateTime)}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                <Link
                                                    href={`/appointments/${appointment.id}`}
                                                    className="mr-2 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={`/appointments/${appointment.id}/edit`}
                                                    className="mr-2 text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={e => handleDelete(appointment.id, e)}
                                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400">No appointments found.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
