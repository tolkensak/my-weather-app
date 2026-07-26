// app/page.tsx
import { Suspense } from 'react';
import WeatherData from './components/WeatherData';
import ForecastData from './components/ForecastData';

export default function HomePage() {
    return (
        <div>
            <h1>🌡️ Weather Dashboard</h1>
            
            {/* ✅ Each component loads independently */}
            <Suspense fallback={<div>Loading weather...</div>}>
                <WeatherData />
            </Suspense>
            
            <Suspense fallback={<div>Loading forecast...</div>}>
                <ForecastData />
            </Suspense>
        </div>
    );
}