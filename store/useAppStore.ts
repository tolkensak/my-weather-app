// store/useAppStore.ts
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
// import logger from './logger';

interface TemperatureUnit {
    name: string;
    sign: string;
}

type TemperatureUnits = Record<string, TemperatureUnit>;

const temperatureUnits: TemperatureUnits = {
    celsius: { name: "Celsius", sign: '°C' },
    fahrenheit: { name: "Fahrenheit", sign: '°F' },
};

interface RoundNumber {
    (num: number, digits?: number): number;
}

const roundNumber: RoundNumber = (num, digits = 2) => {
    const factor = Math.pow(10, digits);
    return Math.round(num * factor) / factor;
};

interface ConvertCelsiusToFahrenheit {
    (celsius: number): number;
}

const convertCelsiusToFahrenheit: ConvertCelsiusToFahrenheit = (celsius) => {
    return roundNumber(celsius * 9 / 5 + 32);
};

interface ConvertFahrenheitToCelsius {
    (fahrenheit: number): number;
}

const convertFahrenheitToCelsius: ConvertFahrenheitToCelsius = (fahrenheit) => {
    return roundNumber((fahrenheit - 32) * 5 / 9);
};

interface City {
    lat: number;
    lon: number;
    text: string;
}

type Cities = Record<string, City>;

const cities: Cities = {
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

type WeatherCodes = Record<string, string>;

const weatherCodes: WeatherCodes = {
    0: "☀️ Clear sky",
    1: "🌤️ Mainly clear",
    2: "⛅ Partly cloudy",
    3: "☁️ Overcast",
    45: "🌫️ Fog",
    51: "🌧️ Light drizzle",
    61: "🌧️ Rain",
    71: "❄️ Snow fall",
    80: "🌧️ Rain showers",
    95: "⛈️ Thunderstorm",
};

interface WeatherDescription {
    (weatherCode: number): string;
}

const weatherDescription: WeatherDescription = (weatherCode: number): string => {
    return weatherCodes[weatherCode] || 'Unknown';
};

//---------------------------------------------

type AllowedTemperatureUnits = 'celsius' | 'fahrenheit';

interface SettingsState {
    darkMode: boolean;
    temperatureUnit: AllowedTemperatureUnits;
    autoRefresh: boolean;
    // Settings actions
    toggleDarkMode: () => void;
    toggleAutoRefresh: () => void;
    toggleTemperatureUnit: () => void;
}

interface WeatherState {
    city: string;
    refreshCount: number;
    // Weather actions
    setCity: (city: string) => void;
    ResetRefreshCount: () => void;
    incrementRefreshCount: () => void;
}

// Combined Store Interface
interface AppStore extends SettingsState, WeatherState {
    // Computed values
    temperatureUnitDisplay: (unit: AllowedTemperatureUnits) => string;
    weatherTemperatureDisplay: (temperature: number) => string;
}

// CREATE THE ZUSTAND STORE!
const useAppStore = create<AppStore>()(
    devtools(
        persist(
            // logger(
                (set, get) => ({
                    // ============ STATE ============

                    // Settings
                    darkMode: false,
                    temperatureUnit: 'celsius',
                    autoRefresh: false,

                    city: 'Almaty',
                    refreshCount: 0,

                    // ============ ACTIONS ============

                    // Settings actions
                    toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

                    toggleAutoRefresh: () => set((state) => ({ autoRefresh: !state.autoRefresh })),

                    toggleTemperatureUnit: () => set((state) => ({
                        temperatureUnit: state.temperatureUnit === 'celsius'
                            ? 'fahrenheit'
                            : 'celsius'
                    })),

                    setCity: (city) => set({ city }),

                    ResetRefreshCount: () => set((state) => ({ refreshCount: 0 })),
                    incrementRefreshCount: () => set((state) => ({ refreshCount: state.refreshCount + 1 })),

                    // ============ COMPUTED VALUES ============

                    temperatureUnitDisplay: (unit) => {
                        return `${temperatureUnits[unit].name} (${temperatureUnits[unit].sign})`;
                    },

                    weatherTemperatureDisplay: (temperature) => {
                        const state = get();
                        const temp = state.temperatureUnit === 'fahrenheit' ? convertCelsiusToFahrenheit(temperature) : temperature;
                        return `${temp}${temperatureUnits[state.temperatureUnit].sign}`;
                    },
                }),
                {
                    name: 'my-weather-app-storage', // localStorage key
                    partialize: (state) => ({
                        // Only persist these fields
                        darkMode: state.darkMode,
                        temperatureUnit: state.temperatureUnit,
                        city: state.city,
                        autoRefresh: state.autoRefresh,
                    }),
                }
            // )
        ),
        { name: 'My Weather App' } // DevTools label
    )
);

export default useAppStore;
export { weatherDescription, cities };
