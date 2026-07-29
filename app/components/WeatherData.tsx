// app/components/WeatherData.tsx

async function fetchWeather(city: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/weather?city=${city}&type=weather`
    );
    return res.json();
}

export default async function WeatherData({ city }: { city: string }) {
    // ✅ This component is async and will suspend
    const data = await fetchWeather(city);

    return (
        <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <h3 className="font-bold">Current Weather</h3>
            <p>🌡️ {data.current_weather.temperature}°C</p>
            <p>💨 Wind: {data.current_weather.windspeed} km/h</p>
        </div>
    );
}
