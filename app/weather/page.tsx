// app/weather/page.tsx
import { Suspense } from 'react';
import { cities } from '../lib/globals';
import CurrentWeather from '../components/CurrentWeather';
import Forecast from '../components/Forecast';
import WeatherSkeleton from '../components/WeatherSkeleton';
import CitySelector from '../components/CitySelector';

type Props = {
    searchParams: Promise<{ city?: string }>;
};

export default async function WeatherPage({ searchParams }: Props) {
    const params = await searchParams;
    const city = params.city || 'Almaty';
    
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <CitySelector selectedCity={city} cities={cities} path="/weather" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Suspense fallback={<WeatherSkeleton title="Current Weather" />}>
                    <CurrentWeather city={city} />
                </Suspense>
                
                <Suspense fallback={<WeatherSkeleton title="5-Day Forecast" />}>
                    <Forecast city={city} />
                </Suspense>
            </div>
        </div>
    );
}
