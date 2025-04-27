import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { useEffect, useRef } from 'react';

import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ customers }) {
    const { data, setData, post, processing, errors } = useForm({
        summary: '',
        description: '',
        location: '',
        start: '',
        end: '',
        colorId: '3',
        customer_id: ''
    });

    const autocompleteRef = useRef(null);
    const location = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/appointments');
    };

    useEffect(() => {
        if (window.google && window.google.maps && window.google.maps.places) {
            autocompleteRef.current = new google.maps.places.Autocomplete(location.current, {
                types: ['address'],
                componentRestrictions: { country: 'uk' },
            });

            autocompleteRef.current.addListener('place_changed', () => {
                const place = autocompleteRef.current.getPlace();
                setData('location', place.formatted_address || location.current.value);
            });
        }
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Add Appointment
                </h2>
            }
        >
            <Head title="Add Appointment" />

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
                                    Customer
                                </label>
                                <select
                                    value={data.customer_id}
                                    onChange={(e) => setData('customer_id', e.target.value)}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                                >
                                    <option value="">Select a customer</option>
                                    {customers.map((customer) => (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.customer_id && (
                                    <p className="mt-2 text-sm text-red-600">{errors.customer_id}</p>
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
                                    ref={location}
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
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600"
                                >
                                    Create Appointment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
