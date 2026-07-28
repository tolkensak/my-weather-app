// app/weather/page.tsx
'use client';  // ✅ Mark as client component

import { Suspense } from 'react';
import CurrentWeather from '../components/CurrentWeather';
import Forecast from '../components/Forecast';
import WeatherSkeleton from '../components/WeatherSkeleton';

export default function WeatherPage(city: string) {
    return (
        <div className="container mx-auto p-4 mt-10">
            {/* ✅ Each section loads independently */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Suspense fallback={<WeatherSkeleton title="Current Weather" />}>
                    <CurrentWeather city={city} />
                </Suspense>
                
                <Suspense fallback={<WeatherSkeleton title="5-Day Forecast" />}>
                    <Forecast />
                </Suspense>
            </div>
        </div>
    );
}
