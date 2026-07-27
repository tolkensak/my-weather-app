// app/components/WeatherWidget.tsx
async function getWeather() {
    const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=43.2516&longitude=76.9089&current_weather=true',
        { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error('Failed to fetch weather');
    return res.json();
}

export default async function WeatherWidget() {
    const data = await getWeather();
    
    return (
        <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold">🌡️ Current Weather</h3>
            <div className="mt-4">
                <p className="text-4xl font-bold">{data.current_weather.temperature}°C</p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    💨 Wind: {data.current_weather.windspeed} km/h
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                    Last updated: {new Date().toLocaleTimeString()}
                </p>
            </div>
        </div>
    );
}