// app/components/AirQuality.tsx

import { weatherCodes } from '../lib/globals';

// Will use Open-Meteo's air quality API
async function getAirQuality(city: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/weather?city=${city}&type=air-quality`);
    return res.json();
}

export default async function AirQuality({ city }: { city: string }) {
    const data = await getAirQuality(city);

    const getColor = (aqi: number) => {
        if (aqi <= 50) return 'text-green-500 dark:text-green-400';
        if (aqi <= 100) return 'text-yellow-500 dark:text-yellow-400';
        if (aqi <= 150) return 'text-orange-500 dark:text-orange-400';
        return 'text-red-500 dark:text-red-400';
    };

    const getCategory = (aqi: number) => {
        if (aqi <= 50) return 'Good';
        if (aqi <= 100) return 'Moderate';
        if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
        return 'Unhealthy';
    };

    return (
        <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold">🌬️ Air Quality</h3>
            <div className={`mt-4 ${getColor(data.current.us_aqi)}`}>
                <div className="text-4xl font-bold">{data.current.us_aqi} {data.current_units.us_aqi}</div>
                <div className="text-xl font-medium">{getCategory(data.current.us_aqi)}</div>
                {/* <div className="text-gray-600 dark:text-gray-400 mt-2 text-sm">{data.current.description}</div> */}
            </div>
        </div>
    );
}
