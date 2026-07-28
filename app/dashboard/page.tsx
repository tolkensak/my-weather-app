// app/dashboard/page.tsx
import { Suspense } from 'react';
import WeatherWidget from '../components/WeatherWidget';
import ForecastWidget from '../components/ForecastWidget';
import AirQualityWidget from '../components/AirQualityWidget';
import { cityData, cities } from '../globals';

export default function DashboardPage() {
    return (
        <div>
            <div className="text-2xl font-bold py-6">📊 Dashboard</div>
            <div className="py-3">
                <select value={cityData.cityName}>
                    {Object.entries(cities).map(([cName, cData]) => (
                        <option key={cName} value={cName}>{cData.text}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {/* ✅ Each widget loads independently - no waterfall! */}
                <Suspense fallback={<WidgetSkeleton title="Weather" />}>
                    <WeatherWidget />
                </Suspense>

                <Suspense fallback={<WidgetSkeleton title="Forecast" />}>
                    <ForecastWidget />
                </Suspense>

                <Suspense fallback={<WidgetSkeleton title="Air Quality" />}>
                    <AirQualityWidget />
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
