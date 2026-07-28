// app/page.tsx
import { Suspense } from 'react';
import WeatherData from './components/WeatherData';
import ForecastData from './components/ForecastData';
import { cityData, cities } from './globals';

export default function HomePage() {
    return (
        <div className="container mx-auto p-4">
            <div className="text-2xl font-bold py-6">🏠 Home</div>

            <div className="py-3">
                <select value={cityData.cityName}>
                    {Object.entries(cities).map(([cName, cData]) => (
                        <option key={cName} value={cName}>{cData.text}</option>
                    ))}
                </select>
            </div>

            {/* ✅ Each component loads independently */}
            <div>
                <Suspense fallback={<div>Loading weather...</div>}>
                    <WeatherData />
                </Suspense>
            </div>

            <div className="mt-8">
                <Suspense fallback={<div>Loading forecast...</div>}>
                    <ForecastData />
                </Suspense>
            </div>
        </div>
    );
}
