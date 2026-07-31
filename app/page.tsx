// app/page.tsx

import { Suspense } from 'react';
import { cities } from './lib/globals';
import CitySelector from './components/CitySelector';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import AnimatedTransition from './components/AnimatedTransition';

type Props = {
    searchParams: Promise<{ city?: string }>;
};

export default async function HomePage({ searchParams }: Props) {
    const params = await searchParams;
    const city = params.city || 'Almaty';
    
    return (
        <AnimatedTransition>
            <main className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">🏠 Home</h1>
                    <CitySelector selectedCity={city} cities={cities} path="/" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Suspense fallback={<div>Loading weather...</div>}>
                        <CurrentWeather city={city} />
                    </Suspense>
                    <Suspense fallback={<div>Loading forecast...</div>}>
                        <Forecast city={city} days={7} />
                    </Suspense>
                </div>
            </main>
        </AnimatedTransition>
    );
}
