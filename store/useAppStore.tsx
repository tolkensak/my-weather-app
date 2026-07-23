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
interface AppStore extends TemperatureState, SettingsState, WeatherState {
    // Computed values
    temperatureUnitDisplay: (unit: AllowedTemperatureUnits) => string;
    weatherTemperatureDisplay: (temperature: number) => string;
    weatherDescription: (weatherCode: number) => string;
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

                    weatherDescription: (weatherCode) => {
                        return weatherCodes[weatherCode] || 'Unknown';
                    };
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
