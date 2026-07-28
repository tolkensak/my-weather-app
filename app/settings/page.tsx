// app/settings/page.tsx

import { cityData, cities } from '../globals';

export default function SettingsPage() {
  async function updateCity(formData: FormData) {
    'use server';
    const selectedCity = formData.get('city') as string;
    // Save to database or session cookies here...
    console.log('City saved:', selectedCity);
  }

  return (
    <form action={updateCity} className="flex flex-col gap-2 max-w-xs p-4">
      <label htmlFor="city">Choose a city:</label>
      <select name="city" id="city" value={cityData.cityName}>
        {Object.entries(cities).map(([cName, cData]) => (
          <option key={cName} value={cName}>{cData.text}</option>
        ))}
      </select>
      <button type="submit">Save Preference</button>
    </form>
  );
}
