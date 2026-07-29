// app/components/Forecast.tsx

async function getForecast(city: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/weather?city=${city}&type=forecast`,
        { next: { revalidate: 3600 } }
    );
    
    if (!res.ok) throw new Error('Failed to fetch forecast');
    return res.json();
}

export default async function Forecast({ city }: { city: string }) {
    const data = await getForecast(city);

    return (
        <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold">📅 5-Day Forecast</h3>
            <div className="mt-4 space-y-3">
                {data.daily.time.map((day: string, index: number) => (
                    <div key={day} className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2">
                        <span className="font-medium">
                            {new Date(day).toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                            {data.daily.temperature_2m_max[index]}°C / {data.daily.temperature_2m_min[index]}°C
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
