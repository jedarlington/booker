import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ events }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Appointments
                </h2>
            }
        >
            <Head title="Appointments" />

            <div className="py-12">
                <div className="mx-auto space-y-6 max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-4 bg-white shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        {events.length > 0 ? (
                            <ul className="space-y-4">
                                {events.map((event, index) => {
                                    console.log(event.googleEvent); // Log the event summary
                                    return (
                                        <li
                                            key={index}
                                            className="p-4 bg-gray-100 rounded dark:bg-gray-700"
                                        >
                                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                                                {event.googleEvent.summary}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {event.googleEvent.start.date}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {event.googleEvent.start.dateTime}
                                            </p>
                                        </li>
                                    );
                                })}
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
