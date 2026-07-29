// app/components/CitySelector.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface City {
    lat: number;
    lon: number;
    text: string;
}

interface CitySelectorProps {
    selectedCity: string;
    cities: Record<string, City>;
    path: string;
}

export default function CitySelector({ selectedCity, cities, path }: CitySelectorProps) {
    const router = useRouter();
    const [city, setCity] = useState(selectedCity);

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCity = e.target.value;
        setCity(newCity);
        // ✅ Navigate to the same page with the new city parameter
        router.push(`${path}?city=${encodeURIComponent(newCity)}`);
    };

    return (
        <select
            value={city}
            onChange={handleCityChange}
            className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600"
        >
            {Object.entries(cities).map(([key, value]) => (
                <option key={key} value={key}>
                    {value.text}
                </option>
            ))}
        </select>
    );
}
