// app/page.tsx - Home page

export default async function HomePage() {
    const res = await fetch('https://example.com');
    const data = await res.json();
    return (
        <main>
            <h1>Welcome to our homepage</h1>
            <p>Here is the latest server-rendered data: {data.message}</p>
        </main>
    );
}