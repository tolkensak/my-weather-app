// app/components/WeatherData.tsx

import { cityData } from '../globals';

async function fetchWeather() {
    const { lat, lon } = cityData.getCity();
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    return res.json();
}

export default async function WeatherData() {
    // ✅ This component is async and will suspend
    const data = await fetchWeather();

    return (
        <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <h3 className="font-bold">Current Weather</h3>
            <p>🌡️ {data.current_weather.temperature}°C</p>
            <p>💨 Wind: {data.current_weather.windspeed} km/h</p>
        </div>
    );
}
