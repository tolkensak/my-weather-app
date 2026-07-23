// app/weather/page.tsx
'use client';  // ✅ Mark as client component

import { useQuery } from '@tanstack/react-query';
import useAppStore from '../../store/useAppStore';

export default function WeatherPage() {
    const autoRefresh = useAppStore((state) => state.autoRefresh);

    const { data, isLoading } = useQuery({
        queryKey: ['weather'],
        queryFn: async () => {
            const res = await fetch('/api/weather?city=Almaty');
            return res.json();
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: true,
        retry: 2,
        refetchInterval: autoRefresh ? 30000 : false,
    });
    
    if (isLoading) return <div>Loading...</div>;
    return <div>Temperature: {data.current_weather.temperature}°C</div>;
}
