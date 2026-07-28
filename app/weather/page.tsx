// app/weather/page.tsx

import { Suspense } from 'react';
import CurrentWeather from '../components/CurrentWeather';
import Forecast from '../components/Forecast';
import WeatherSkeleton from '../components/WeatherSkeleton';
import { cityData, cities } from '../globals';

export default function WeatherPage() {
    return (
        <div className="container mx-auto p-4">
            <div className="text-2xl font-bold py-6">🌤️ Weather</div>
            <div className="py-3">
                <select value={cityData.cityName}>
                    {Object.entries(cities).map(([cName, cData]) => (
                        <option key={cName} value={cName}>{cData.text}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Suspense fallback={<WeatherSkeleton title="Current Weather" />}>
                    <CurrentWeather />
                </Suspense>

                <Suspense fallback={<WeatherSkeleton title="5-Day Forecast" />}>
                    <Forecast />
                </Suspense>
            </div>
        </div>
    );
}
