// src/types/weather.ts
export interface WeatherData {
    current: {
      temperature_2m: number;
      relative_humidity_2m: number;
      weather_code: number;
      time: string;
      wind_speed_10m?: number;
      pressure_msl?: number; 
    };
    hourly: {
      time: string[];
      temperature_2m: number[];
      weather_code: number[];
    };
    daily: {
      time: string[];
      temperature_2m_max: number[];
      temperature_2m_min: number[];
      weather_code: number[];
    };
  }

  export interface CurrentWeather {
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m?: number;
    pressure_msl?: number;
  }