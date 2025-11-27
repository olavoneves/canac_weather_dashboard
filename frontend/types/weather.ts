export interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  wind_speed: number;
  weather_code: number;
  feels_like?: number;
  pressure?: number;
  visibility?: number;
  uv_index?: number;
}

export interface City {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface WeatherError {
  message: string;
  status?: number;
}

export const WEATHER_CODES: Record<number, { description: string; icon: string }> = {
  0: { description: 'Céu limpo', icon: '☀️' },
  1: { description: 'Principalmente limpo', icon: '🌤️' },
  2: { description: 'Parcialmente nublado', icon: '⛅' },
  3: { description: 'Nublado', icon: '☁️' },
  45: { description: 'Neblina', icon: '🌫️' },
  48: { description: 'Neblina com geada', icon: '🌫️' },
  51: { description: 'Garoa leve', icon: '🌦️' },
  53: { description: 'Garoa moderada', icon: '🌦️' },
  55: { description: 'Garoa intensa', icon: '🌧️' },
  61: { description: 'Chuva leve', icon: '🌧️' },
  63: { description: 'Chuva moderada', icon: '🌧️' },
  65: { description: 'Chuva forte', icon: '⛈️' },
  71: { description: 'Neve leve', icon: '🌨️' },
  73: { description: 'Neve moderada', icon: '❄️' },
  75: { description: 'Neve forte', icon: '❄️' },
  77: { description: 'Granizo', icon: '🧊' },
  80: { description: 'Pancadas de chuva leve', icon: '🌦️' },
  81: { description: 'Pancadas de chuva moderada', icon: '⛈️' },
  82: { description: 'Pancadas de chuva forte', icon: '⛈️' },
  85: { description: 'Pancadas de neve leve', icon: '🌨️' },
  86: { description: 'Pancadas de neve forte', icon: '❄️' },
  95: { description: 'Tempestade', icon: '⛈️' },
  96: { description: 'Tempestade com granizo leve', icon: '⛈️' },
  99: { description: 'Tempestade com granizo forte', icon: '⛈️' },
};

export const getWeatherDescription = (code: number): string => {
  return WEATHER_CODES[code]?.description || 'Desconhecido';
};

export const getWeatherIcon = (code: number): string => {
  return WEATHER_CODES[code]?.icon || '🌡️';
};