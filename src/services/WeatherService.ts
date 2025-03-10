// src/services/WeatherService.ts
import { Geolocation } from '@capacitor/geolocation';
import axios from 'axios';

const API_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

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

  static async getWeatherData() {
    try {
      const response = await axios.get(`${API_BASE_URL}?latitude=48.85&longitude=2.35&current=temperature_2m,relative_humidity_2m,wind_speed_10m,pressure_msl,visibility,uv_index,weather_code&hourly=temperature_2m,relative_humidity_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`);
      console.log("✅ Données météo reçues :", response.data);
      return response.data;
    } catch (error) {
      console.error(" Erreur lors de la récupération des données météo :", error);
      throw error;
    }
  }

  static async getForecastData(city: string = 'Paris') {
    try {
      const response = await axios.get(`${API_BASE_URL}?city=${city}&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`);
      console.log("✅ Prévisions météo reçues :", response.data);
      return response.data;
    } catch (error) {
      console.error(" Erreur lors de la récupération des prévisions météo :", error);
      throw error;
    }
  }
}
