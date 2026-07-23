// app/api/weather/route.ts
import { NextResponse } from 'next/server';

export interface WeatherData {
    city: string;
    temperature: number;
    weatherCode: number;
    windSpeed: number;
}

interface City {
    lat: number;
    lon: number;
    text: string;
}

type Cities = Record<string, City>;

const cities: Cities = {
    Almaty: { lat: 43.2516, lon: 76.9089, text: "🇰🇿 Almaty" },
    "New York": { lat: 40.7143, lon: -74.006, text: "🗽 New York" },
    London: { lat: 51.5074, lon: -0.1278, text: "🇬🇧 London" },
    Tokyo: { lat: 35.6895, lon: 139.6917, text: "🇯🇵 Tokyo" },
    Sydney: { lat: -33.8688, lon: 151.2093, text: "🇦🇺 Sydney" },
    Moscow: { lat: 55.7558, lon: 37.6173, text: "🇷🇺 Moscow" },
    Dubai: { lat: 25.2048, lon: 55.2708, text: "🇦🇪 Dubai" },
    Singapore: { lat: 1.3521, lon: 103.8198, text: "🇸🇬 Singapore" },
    "Cape Town": { lat: -33.9249, lon: 18.4241, text: "🇿🇦 Cape Town" },
};

const buildWeatherUrl = (cityName: string): string => {
    const location = cities[cityName] || cities["Almaty"];
    return `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true`;
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city') || 'Almaty';
    
    try {
        // ✅ Fetch weather data
        const response = await fetch(buildWeatherUrl(city));
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // ✅ Parse the response
        const data = await response.json();
        
        // ✅ Return formatted data
        return NextResponse.json({
            city: city,
            temperature: data.current_weather.temperature,
            weatherCode: data.current_weather.weathercode,
            windSpeed: data.current_weather.windspeed,
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch weather data' },
            { status: 500 }
        );
    }
}