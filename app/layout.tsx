import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Navigation from "./components/Navigation";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "My Weather App",
    description: "A simple weather app built with Next.js 14 and the Open-Meteo API.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <header>🌡️ Weather App</header>
                <Navigation />
                <Suspense fallback={<div>Loading content...</div>}>
                    {children}
                </Suspense>
                <footer>© 2026</footer>
            </body>
        </html>
    );
}
