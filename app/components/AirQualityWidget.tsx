// app/components/AirQualityWidget.tsx
// Note: Open-Meteo has an air quality API, but it requires different parameters.
// This is a simplified version.

async function getAirQuality() {
    // Using a mock response since we're focusing on weather
    // In production, you would use a real air quality API
    return {
        aqi: 42,
        category: 'Good',
        description: 'Air quality is satisfactory, and air pollution poses little or no risk.',
    };
}

export default async function AirQualityWidget() {
    const data = await getAirQuality();
    
    const getColor = (aqi: number) => {
        if (aqi <= 50) return 'text-green-500 dark:text-green-400';
        if (aqi <= 100) return 'text-yellow-500 dark:text-yellow-400';
        if (aqi <= 150) return 'text-orange-500 dark:text-orange-400';
        return 'text-red-500 dark:text-red-400';
    };
    
    return (
        <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold">🌬️ Air Quality</h3>
            <div className="mt-4">
                <div className={`text-4xl font-bold ${getColor(data.aqi)}`}>
                    {data.aqi}
                </div>
                <p className="text-xl font-medium">{data.category}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                    {data.description}
                </p>
            </div>
        </div>
    );
}