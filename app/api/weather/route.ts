// app/api/weather/route.ts

import { NextResponse } from 'next/server';
import { cityData } from '../../globals';

const buildWeatherUrl = (cityName: string): string => {
    const { lat, lon } = cityData.getCity();
    return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const cityName = searchParams.get('city') || 'Almaty';
    cityData.setCity(cityName); // Update the city in the global state

    
    try {
        // ✅ Fetch weather data
        const response = await fetch(buildWeatherUrl(cityName));
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // ✅ Parse the response
        const data = await response.json();
        
        // ✅ Return formatted data
        return NextResponse.json({
            cityName: cityName,
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
