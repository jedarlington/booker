import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

// Helper function to make keys readable
const makeKeyReadable = (key) => {
    return key
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
};

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
                            {typeof data === 'object' && !Array.isArray(data) ? (
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
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
