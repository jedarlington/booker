import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModePreference = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(darkModePreference);
        document.documentElement.classList.toggle('dark', darkModePreference);
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('darkMode', newMode);
        document.documentElement.classList.toggle('dark', newMode);
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="px-3 py-2 text-sm font-medium text-gray-500 transition duration-150 ease-in-out bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
            type="button"
        >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
}
