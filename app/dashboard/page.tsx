// app/dashboard/page.tsx

import { Suspense } from 'react';
import { cities } from '../lib/globals';
import Forecast from '../components/Forecast';
import AirQuality from '../components/AirQuality';
import CitySelector from '../components/CitySelector';
import CurrentWeather from '../components/CurrentWeather';

type Props = {
    searchParams: Promise<{ city?: string }>;
};

export default async function DashboardPage({ searchParams }: Props) {
    const params = await searchParams;
    const city = params.city || 'Almaty';
    
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">📊 Dashboard</h1>
                <CitySelector selectedCity={city} cities={cities} path="/dashboard" />
            </div>

            <div className="grid grid-cols-3 gap-4">
                {/* ✅ Each  loads independently - no waterfall! */}
                <Suspense fallback={<WidgetSkeleton title="Current Weather" />}>
                    <CurrentWeather city={city} />
                </Suspense>

                <Suspense fallback={<WidgetSkeleton title="Forecast" />}>
                    <Forecast city={city} />
                </Suspense>

                <Suspense fallback={<WidgetSkeleton title="Air Quality" />}>
                    <AirQuality city={city} />
                </Suspense>
            </div>
        </div>
    );
}

// Shared skeleton component
function WidgetSkeleton({ title }: { title: string }) {
    return (
        <div className="p-4 border rounded-lg animate-pulse">
            <h3 className="font-bold">{title}</h3>
            <div className="h-4 bg-gray-200 rounded mt-2"></div>
            <div className="h-4 bg-gray-200 rounded mt-2 w-2/3"></div>
        </div>
    );
}
