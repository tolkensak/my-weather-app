// app/dashboard/page.tsx

import { Suspense } from 'react';
import { cities } from '../lib/globals';
import WeatherWidget from '../components/WeatherWidget';
import ForecastWidget from '../components/ForecastWidget';
import AirQualityWidget from '../components/AirQualityWidget';
import CitySelector from '../components/CitySelector';

type Props = {
    searchParams: Promise<{ city?: string }>;
};

export default async function DashboardPage({ searchParams }: Props) {
    const params = await searchParams;
    const city = params.city || Object.keys(cities)[0];
    
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <CitySelector selectedCity={city} cities={cities} path="/dashboard" />
            </div>

            <div className="grid grid-cols-3 gap-4">
                {/* ✅ Each widget loads independently - no waterfall! */}
                <Suspense fallback={<WidgetSkeleton title="Weather" />}>
                    <WeatherWidget city={city} />
                </Suspense>

                <Suspense fallback={<WidgetSkeleton title="Forecast" />}>
                    <ForecastWidget city={city} />
                </Suspense>

                <Suspense fallback={<WidgetSkeleton title="Air Quality" />}>
                    <AirQualityWidget city={city} />
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
