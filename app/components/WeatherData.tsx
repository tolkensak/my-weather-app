// app/components/WeatherData.tsx
async function fetchWeather() {
    const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=43.2516&longitude=76.9089&current_weather=true');
    return res.json();
}

export default async function WeatherData() {
    // ✅ This component is async and will suspend
    const data = await fetchWeather();

    return (
        <div className="p-4 border rounded-lg mt-4">
            <h3 className="font-bold">Current Weather</h3>
            <p>🌡️ {data.current_weather.temperature}°C</p>
            <p>💨 Wind: {data.current_weather.windspeed} km/h</p>
        </div>
    );
}
