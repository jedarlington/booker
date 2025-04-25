import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ customer }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Customer Details
                </h2>
            }
        >
            <Head title={`Customer: ${customer.name}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white shadow sm:rounded-lg dark:bg-gray-800">
                        <h3 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-200">
                            {customer.name}
                        </h3>
                        <p className="mb-2 text-gray-600 dark:text-gray-400">
                            <strong>Email:</strong> {customer.email}
                        </p>
                        <p className="mb-2 text-gray-600 dark:text-gray-400">
                            <strong>Phone:</strong> {customer.phone || 'N/A'}
                        </p>
                        <div className="flex mt-6 space-x-4">
                            <Link
                                href="/customers"
                                className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded hover:bg-gray-600"
                            >
                                Back to Customers
                            </Link>
                            <Link
                                href={`/customers/${customer.id}/edit`}
                                className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded hover:bg-yellow-600"
                            >
                                Edit Customer
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
