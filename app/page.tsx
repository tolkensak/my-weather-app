// app/page.tsx

import { Suspense } from 'react';
import { cities } from './lib/globals';
import WeatherData from './components/WeatherData';
import ForecastData from './components/ForecastData';
import CitySelector from './components/CitySelector';

type Props = {
    searchParams: Promise<{ city?: string }>;
};

export default async function HomePage({ searchParams }: Props) {
    const params = await searchParams;
    const city = params.city || Object.keys(cities)[0];

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <CitySelector selectedCity={city} cities={cities} path="" />
            </div>

            {/* ✅ Each component loads independently */}
            <div>
                <Suspense fallback={<div>Loading weather...</div>}>
                    <WeatherData city={city} />
                </Suspense>
            </div>

            <div className="mt-8">
                <Suspense fallback={<div>Loading forecast...</div>}>
                    <ForecastData city={city} />
                </Suspense>
            </div>
        </div>
    );
}
