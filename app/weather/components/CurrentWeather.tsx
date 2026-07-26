// app/weather/components/CurrentWeather.tsx
async function getWeather() {
    const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=43.2516&longitude=76.9089&current_weather=true',
        { next: { revalidate: 60 } } // ✅ Revalidate every 60 seconds
    );
    if (!res.ok) throw new Error('Failed to fetch weather');
    return res.json();
}

export default async function CurrentWeather() {
    const data = await getWeather();
    
    return (
        <div className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">📍 Almaty</h2>
            <div className="mt-4">
                <p className="text-4xl font-bold">
                    {data.current_weather.temperature}°C
                </p>
                <p className="text-gray-600 mt-2">
                    Wind: {data.current_weather.windspeed} km/h
                </p>
            </div>
        </div>
    );
}