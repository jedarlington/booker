import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { makeKeyReadable } from '@/Utils/stringUtils';

export default function Dashboard({ data }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex gap-4">
                                <Link
                                    href="/appointments/create"
                                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                                >
                                    New Appointment
                                </Link>
                                <Link
                                    href="/customers/create"
                                    className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                                >
                                    New Customer
                                </Link>
                                <Link
                                    href="/auth/google"
                                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                                >
                                    Connect Google Calendar
                                </Link>
                            </div>

                            {/* Display data */}
                            {/* {typeof data === 'object' && !Array.isArray(data) ? (
                                Object.entries(data).map(([key, value]) => (
                                    <div
                                        key={key}
                                        className="p-4 my-2 bg-gray-100 rounded shadow dark:bg-gray-700"
                                    >
                                        <p>
                                            <strong>{makeKeyReadable(key)}:</strong> {String(value)}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 my-2 bg-gray-100 rounded shadow dark:bg-gray-700">
                                    <p>{String(data)}</p>
                                </div>
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
