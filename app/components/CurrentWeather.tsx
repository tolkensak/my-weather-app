// app/components/CurrentWeather.tsx

import { weatherCodes } from '../lib/globals';

async function getWeather(city: string) {
    // ✅ Now using our API route!
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/weather?city=${city}&type=weather`,
        { next: { revalidate: 60 } }
    );
    
    if (!res.ok) throw new Error('Failed to fetch weather');
    return res.json();
}

export default async function CurrentWeather({ city }: { city: string }) {
    const data = await getWeather(city);
    const description = weatherCodes[data.current_weather.weathercode] || 'Unknown';
    
    return (
        <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold">🌡️ Current Weather</h3>
            <div className="mt-4">
                <p className="text-4xl font-bold">{data.current_weather.temperature}°C</p>
                <p className="text-gray-600 dark:text-gray-400">{description}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    💨 Wind: {data.current_weather.windspeed} km/h
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                    📍 {city} • Updated: {new Date().toLocaleTimeString()}
                </p>
            </div>
        </div>
    );
}