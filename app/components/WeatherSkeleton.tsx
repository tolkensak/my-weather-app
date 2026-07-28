// app/components/WeatherSkeleton.tsx
// ✅ Can be either Server or Client Component

export default function WeatherSkeleton({ title }: { title: string }) {
    return (
        <div className="p-6 border rounded-lg shadow-sm animate-pulse bg-white dark:bg-gray-800">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="mt-4 space-y-3">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
        </div>
    );
}
