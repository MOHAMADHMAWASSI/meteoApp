// src/services/WeatherService.ts
import { Geolocation } from '@capacitor/geolocation';
import type { WeatherData } from '@/types/weather';

export class WeatherService {
  private static BASE_URL = 'https://api.open-meteo.com/v1/forecast';

  static async getCurrentPosition() {
    try {
      return await Geolocation.getCurrentPosition();
    } catch (error: unknown) {
      console.error('Error getting location:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to get location');
    }
  }

  static async getWeatherData(): Promise<WeatherData> {
    try {
      const position = await this.getCurrentPosition();
      const response = await fetch(
        `${this.BASE_URL}?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&current=temperature_2m,relative_humidity_2m,weather_code&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Données météo reçues :", data); // 🔹 Vérification des données API

      if (!data.daily) {
        throw new Error(" Données météo incomplètes : 'daily' est manquant.");
      }

      return data as WeatherData; // 🔹 On force le typage ici
    } catch (error: unknown) {
      console.error('Error fetching weather data:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch weather data');
    }
  }
}
