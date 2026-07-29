// app/error.tsx

'use client';

import { useEffect } from 'react';

export default function HomeError({error, reset}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Home page error:', error);
    }, [error]);

    return (
        <div className="container mx-auto p-4 text-center">
            <h2 className="text-2xl font-bold text-red-600">⚠️ Something went wrong!</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
                {error.message || 'Failed to load weather data'}
            </p>
            <button
                onClick={reset}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
                Try again
            </button>
        </div>
    );
}
