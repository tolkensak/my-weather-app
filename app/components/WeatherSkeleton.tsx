// app/weather/components/WeatherSkeleton.tsx
export default function WeatherSkeleton({ title }: { title: string }) {
    return (
        <div className="p-6 border rounded-lg shadow-sm animate-pulse">
            <h2 className="text-xl font-semibold">{title}</h2>
            <div className="mt-4 space-y-3">
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
        </div>
    );
}