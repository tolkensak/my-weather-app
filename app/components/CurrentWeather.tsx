// app/weather/components/CurrentWeather.tsx
'use client';

// import { useQuery } from '@tanstack/react-query';
import { cities } from '../../store/useAppStore';

// This is the old version of the getWeather function that fetches data directly from the Open-Meteo API.
async function getWeather(city: string) {
    const { lat, lon } = cities[city];
    const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
        { next: { revalidate: 60 } } // ✅ Revalidate every 60 seconds
    );

    if (!res.ok) throw new Error('Failed to fetch weather');
    return res.json();
}

// async function getWeather(city: string) {
//     const { data } = useQuery({
//         queryKey: ['weather', city],
//         queryFn: async () => {
//             const res = await fetch(`/api/weather?city=${city}`).then(r => r.json());
//             return res.json();
//         }
//     });

//     return data;
// }

export default async function CurrentWeather({ city }: { city: string }) {
    const data = await getWeather(city);

    return (
        <div className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">📍 {city}</h2>
            <div className="mt-4">
                <p className="text-4xl font-bold">
                    {data.current_weather.temperature} °C
                </p>
                <p className="text-gray-600 mt-2">
                    Wind: {data.current_weather.windspeed} km/h
                </p>
            </div>
        </div>
    );
}
