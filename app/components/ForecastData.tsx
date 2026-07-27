// app/components/ForecastData.tsx
async function getForecast() {
    const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=43.2516&longitude=76.9089&daily=temperature_2m_max&timezone=auto&forecast_days=7',
        { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error('Failed to fetch forecast');
    return res.json();
}

export default async function ForecastData() {
    const data = await getForecast();

    return (
        <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 mt-4">
            <h3 className="font-bold">📊 7-Day Forecast</h3>
            <div className="mt-2 grid grid-cols-7 gap-2">
                {data.daily.time.map((day: string, index: number) => (
                    <div key={day} className="text-center">
                        <div className="text-sm font-medium">
                            {new Date(day).toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className="text-lg font-bold">
                            {data.daily.temperature_2m_max[index]}°C
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
