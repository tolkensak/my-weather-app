// app/api/weather/route.ts

import { NextResponse } from 'next/server';

// City coordinates
const cities: Record<string, { lat: number; lon: number; text: string }> = {
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

function buildWeatherUrl(cityName: string): string {
    const location = cities[cityName] || cities["Almaty"];
    return `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true`;
}

function buildForecastUrl(cityName: string): string {
    const location = cities[cityName] || cities["Almaty"];
    return `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`;
}

function buildAirQualityUrl(cityName: string): string {
    const location = cities[cityName] || cities["Almaty"];
    return `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${location.lat}&longitude=${location.lon}&current=pm10,pm2_5,us_aqi`;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city') || 'Almaty';
    const type = searchParams.get('type') || 'weather'; // 'weather' or 'forecast' or 'air-quality'

    try {
        let url: string;
        if (type === 'forecast') {
            url = buildForecastUrl(city);
        } else if (type === 'air-quality') {
            url = buildAirQualityUrl(city);
        } else {
            url = buildWeatherUrl(city);
        }

        const response = await fetch(url, {
            next: { revalidate: 60 } // Revalidate every 60 seconds
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // ✅ Return the data with the city name
        return NextResponse.json({
            city: city,
            ...data
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch weather data' },
            { status: 500 }
        );
    }
}
