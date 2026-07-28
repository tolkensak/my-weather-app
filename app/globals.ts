
interface City {
    lat: number;
    lon: number;
    text: string;
}

type Cities = Record<string, City>;

const cities: Cities = {
    'Almaty': { lat: 43.2516, lon: 76.9089, text: '🇰🇿 Almaty' },
    'New York': { lat: 40.7143, lon: -74.006, text: '🗽 New York' },
    'London': { lat: 51.5074, lon: -0.1278, text: '🇬🇧 London' },
    'Tokyo': { lat: 35.6895, lon: 139.6917, text: '🇯🇵 Tokyo' },
    'Sydney': { lat: -33.8688, lon: 151.2093, text: '🇦🇺 Sydney' },
    'Moscow': { lat: 55.7558, lon: 37.6173, text: '🇷🇺 Moscow' },
    'Dubai': { lat: 25.2048, lon: 55.2708, text: '🇦🇪 Dubai' },
    'Singapore': { lat: 1.3521, lon: 103.8198, text: '🇸🇬 Singapore' },
    'Cape Town': { lat: -33.9249, lon: 18.4241, text: '🇿🇦 Cape Town' },
};

interface CityData {
    cityName: string;
    getCity: (cityName?: string) => City;
    setCity: (cityName: string) => void;
}

const cityData: CityData = {
    cityName: 'Almaty',
    getCity: (cityName?: string) => typeof cityName === 'string' ? (cities[cityName] || cities['Almaty']) : cities[cityData.cityName],
    setCity: (cityName: string) => {
        if (cities[cityName]) {
            cityData.cityName = cityName;
        }
    },
};

export { cities, cityData };
