// app/components/Forecast.tsx
async function getForecast() {
    const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=43.2516&longitude=76.9089&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5',
        { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error('Failed to fetch forecast');
    return res.json();
}

export default async function Forecast() {
    const data = await getForecast();

    return (
        <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold">📅 Weather Forecast</h2>
            <div className="mt-4 space-y-3">
                {data.daily.time.map((day: string, index: number) => (
                    <div key={day} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                            <span className="font-medium">
                                {new Date(day).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-blue-600 dark:text-blue-400 font-medium">
                                ↑ {data.daily.temperature_2m_max[index]}°C
                            </span>
                            <span className="text-gray-500 dark:text-gray-400">
                                ↓ {data.daily.temperature_2m_min[index]}°C
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
