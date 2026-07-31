// app/api/preferences/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { userId, favoriteCity, temperatureUnit, darkMode } = await request.json();
        
        const preference = await prisma.userPreference.upsert({
            where: { userId },
            update: { favoriteCity, temperatureUnit, darkMode },
            create: { userId, favoriteCity, temperatureUnit, darkMode },
        });
        
        return NextResponse.json({ success: true, preference });
    } catch (error) {
        console.error('Error saving preferences:', error);
        return NextResponse.json(
            { error: 'Failed to save preferences' },
            { status: 500 }
        );
    }
}
