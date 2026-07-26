// app/weather/page.tsx
import { Suspense } from 'react';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import WeatherSkeleton from './components/WeatherSkeleton';

export default function WeatherPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">🌤️ Weather Dashboard</h1>
            
            {/* ✅ Each section loads independently */}
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