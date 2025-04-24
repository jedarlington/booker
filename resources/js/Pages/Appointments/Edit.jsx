import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ appointment }) {
    const { data, setData, put, processing, errors } = useForm({
        summary: appointment.name || '',
        description: appointment.description || '',
        location: appointment.location || '',
        start: appointment.startDateTime || '',
        end: appointment.endDateTime || '',
        colorId: appointment.colorId || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/appointments/${appointment.id}`);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit Appointment
                </h2>
            }
        >
            <Head title="Edit Appointment" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white shadow sm:rounded-lg dark:bg-gray-800">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Summary
                                </label>
                                <input
                                    type="text"
                                    value={data.summary}
                                    onChange={(e) => setData('summary', e.target.value)}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                                />
                                {errors.summary && (
                                    <p className="mt-2 text-sm text-red-600">{errors.summary}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                                ></textarea>
                                {errors.description && (
                                    <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                                />
                                {errors.location && (
                                    <p className="mt-2 text-sm text-red-600">{errors.location}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Start Date & Time
                                </label>
                                <input
                                    type="datetime-local"
                                    value={data.start}
                                    onChange={(e) => setData('start', e.target.value)}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                                />
                                {errors.start && (
                                    <p className="mt-2 text-sm text-red-600">{errors.start}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    End Date & Time
                                </label>
                                <input
                                    type="datetime-local"
                                    value={data.end}
                                    onChange={(e) => setData('end', e.target.value)}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                                />
                                {errors.end && (
                                    <p className="mt-2 text-sm text-red-600">{errors.end}</p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <Link
                                    href="/appointments"
                                    className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded hover:bg-gray-600"
                                >
                                    Back to Appointments
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                                >
                                    Update Appointment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
