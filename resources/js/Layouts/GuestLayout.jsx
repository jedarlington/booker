import ApplicationLogo from '@/Components/ApplicationLogo';
import ThemeToggle from '@/Components/ThemeToggle';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className>
            <div className="flex justify-end p-4 bg-gray-100 dark:bg-gray-900"><ThemeToggle /></div>

            <div className="relative flex flex-col items-center min-h-screen pt-6 bg-gray-100 dark:bg-gray-900 sm:justify-center sm:pt-0">
                <div>
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 text-gray-500 fill-current" />
                    </Link>
                </div>

                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:max-w-md sm:rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
