// app/api/weather/route.ts

import { NextResponse } from 'next/server';
import { cities } from '@/lib/globals';

function buildWeatherUrl(cityName: string): string {
    const location = cities[cityName] || cities["Almaty"];
    return `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true`;
}

function buildForecastUrl(cityName: string, days: number): string {
    const location = cities[cityName] || cities["Almaty"];
    return `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=${days}`;
}

function buildAirQualityUrl(cityName: string): string {
    const location = cities[cityName] || cities["Almaty"];
    return `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${location.lat}&longitude=${location.lon}&current=pm10,pm2_5,us_aqi`;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city') || 'Almaty';
    const type = searchParams.get('type') || 'weather'; // 'weather' or 'forecast' or 'air-quality'
    const days = parseInt(searchParams.get('days') || '5');

    try {
        let url: string;
        if (type === 'forecast') {
            url = buildForecastUrl(city, days);
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
