// app/components/ForecastData.tsx

async function getForecast(city: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/weather?city=${city}&type=forecast`,
        { next: { revalidate: 3600 } }
    );

    if (!res.ok) throw new Error('Failed to fetch forecast');
    return res.json();
}

export default async function ForecastData({ city }: { city: string }) {
    const data = await getForecast(city);

    return (
        <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
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
