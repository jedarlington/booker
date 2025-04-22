import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ events }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Calculate the paginated events
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedEvents = events.slice(startIndex, startIndex + itemsPerPage);

    // Calculate total pages
    const totalPages = Math.ceil(events.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const formatDateTime = (dateTime) => {
        if (!dateTime) return 'N/A';
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateTime));
    };

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
                        {paginatedEvents.length > 0 ? (
                            <ul className="space-y-4">
                                {paginatedEvents.map((event, index) => (
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
                                            {formatDateTime(event.googleEvent.start.dateTime)}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400">
                                No appointments available.
                            </p>
                        )}

                        {/* Pagination Controls */}
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded ${
                                    currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                Previous
                            </button>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded ${
                                    currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
