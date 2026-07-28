// app/components/Navigation.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
    const pathname = usePathname();
    
    return (
        <nav className="flex gap-6 p-4 border-b">
            <Link href="/" className={pathname === '/' ? 'font-bold' : ''}>
                🏠 Home
            </Link>
            <Link href="/weather" className={pathname === '/weather' ? 'font-bold' : ''}>
                🌤️ Weather
            </Link>
            <Link href="/dashboard" className={pathname === '/dashboard' ? 'font-bold' : ''}>
                📊 Dashboard
            </Link>
        </nav>
    );
}
