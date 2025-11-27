'use client';

import { WeatherData } from '@/types/weather';
import { getWeatherDescription, getWeatherIcon } from '@/types/weather';

interface WeatherDisplayProps {
  weather: WeatherData;
  onReset: () => void;
}

export default function WeatherDisplay({ weather, onReset }: WeatherDisplayProps) {
  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      {/* Header com nome da cidade */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          📍 {weather.city}
        </h2>
        <p className="text-gray-600">Dados em tempo real</p>
      </div>

      {/* Card principal - Temperatura e condição */}
      <div className="bg-linear-to-br from-blue-500 to-blue-700 rounded-3xl p-8 shadow-2xl text-white mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-7xl font-bold mb-2">
              {Math.round(weather.temperature)}°C
            </div>
            <div className="text-2xl opacity-90">
              {getWeatherIcon(weather.weather_code)} {getWeatherDescription(weather.weather_code)}
            </div>
          </div>
          <div className="text-8xl opacity-80">
            {getWeatherIcon(weather.weather_code)}
          </div>
        </div>
      </div>

      {/* Grid de informações adicionais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Umidade */}
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Umidade</p>
              <p className="text-3xl font-bold text-blue-600">
                {Math.round(weather.humidity)}%
              </p>
            </div>
            <div className="text-4xl">💧</div>
          </div>
        </div>

        {/* Vento */}
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Velocidade do Vento</p>
              <p className="text-3xl font-bold text-green-600">
                {Math.round(weather.wind_speed)} km/h
              </p>
            </div>
            <div className="text-4xl">💨</div>
          </div>
        </div>

        {/* Sensação térmica (se disponível) */}
        {weather.feels_like && (
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Sensação Térmica</p>
                <p className="text-3xl font-bold text-orange-600">
                  {Math.round(weather.feels_like)}°C
                </p>
              </div>
              <div className="text-4xl">🌡️</div>
            </div>
          </div>
        )}

        {/* Pressão (se disponível) */}
        {weather.pressure && (
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Pressão</p>
                <p className="text-3xl font-bold text-purple-600">
                  {Math.round(weather.pressure)} hPa
                </p>
              </div>
              <div className="text-4xl">⏱️</div>
            </div>
          </div>
        )}

        {/* Visibilidade (se disponível) */}
        {weather.visibility && (
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Visibilidade</p>
                <p className="text-3xl font-bold text-indigo-600">
                  {(weather.visibility / 1000).toFixed(1)} km
                </p>
              </div>
              <div className="text-4xl">👁️</div>
            </div>
          </div>
        )}

        {/* Índice UV (se disponível) */}
        {weather.uv_index !== undefined && (
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Índice UV</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {weather.uv_index}
                </p>
              </div>
              <div className="text-4xl">☀️</div>
            </div>
          </div>
        )}
      </div>

      {/* Botão para nova busca */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="px-8 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
        >
          ← Buscar outra cidade
        </button>
      </div>
    </div>
  );
}