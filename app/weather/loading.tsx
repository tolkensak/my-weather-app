// app/weather/loading.tsx - Global loading for weather page
export default function WeatherLoading() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">🌤️ Weather Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border rounded-lg shadow-sm animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="mt-4 space-y-3">
                        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                </div>
                <div className="p-6 border rounded-lg shadow-sm animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="mt-4 space-y-3">
                        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}