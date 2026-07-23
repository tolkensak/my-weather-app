// app/page.tsx - Home page (Server Component)
export default async function HomePage() {
    // ✅ Fetch data on the server
    const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=43.2516&longitude=76.9089&current_weather=true');
    const data = await res.json();

    return (
        <main>
            <h1>🌡️ Temperature App</h1>
            <p>Current temperature in Almaty: {data.current_weather.temperature}°C</p>
        </main>
    );
}
