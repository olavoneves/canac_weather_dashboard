'use client';

import { useState } from 'react';
import CitySelector from '@/components/CitySelector';
import WeatherDisplay from '@/components/WeatherDisplay';
import { weatherApi } from '@/services/weatherApi';
import { WeatherData } from '@/types/weather';

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Função para buscar dados do clima
   */
  const handleCitySelect = async (city: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await weatherApi.getWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar dados do clima';
      setError(errorMessage);
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Função para resetar e fazer nova busca
   */
  const handleReset = () => {
    setWeather(null);
    setError(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Hero Section - Mostrado apenas quando não há dados */}
      {!weather && !error && (
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-6">
            <div className="relative">
              {/* Efeito de brilho */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              {/* Ícone principal */}
              <div className="relative bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 p-6 rounded-full">
                <svg 
                  className="w-16 h-16 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" 
                  />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-poppins">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Previsão do Tempo
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-2 max-w-2xl mx-auto">
            Consulte informações meteorológicas precisas e atualizadas
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Digite o nome de qualquer cidade para visualizar temperatura, umidade, velocidade do vento e muito mais
          </p>

          {/* Features badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <div className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
              <span className="text-sm">⚡ Dados em tempo real</span>
            </div>
            <div className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
              <span className="text-sm">🌍 Cidades globais</span>
            </div>
            <div className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
              <span className="text-sm">🎯 Interface intuitiva</span>
            </div>
          </div>
        </div>
      )}

      {/* Seletor de cidade */}
      {!weather && (
        <div className="animate-fade-in">
          <CitySelector onCitySelect={handleCitySelect} isLoading={isLoading} />
        </div>
      )}

      {/* Loading state - Skeleton com animação elegante */}
      {isLoading && (
        <div className="max-w-4xl mx-auto mt-8 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="animate-pulse">
              {/* Header skeleton */}
              <div className="flex items-center justify-center mb-8">
                <div className="h-8 w-48 bg-gray-200 rounded-full"></div>
              </div>

              {/* Main card skeleton */}
              <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl p-8 mb-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-4">
                    <div className="h-16 w-32 bg-gray-400/50 rounded-lg"></div>
                    <div className="h-6 w-40 bg-gray-400/50 rounded-lg"></div>
                  </div>
                  <div className="h-24 w-24 bg-gray-400/50 rounded-full"></div>
                </div>
              </div>

              {/* Grid skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
                ))}
              </div>
            </div>

            {/* Loading text */}
            <div className="text-center mt-6">
              <p className="text-gray-600 flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-blue-600" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Buscando dados meteorológicos...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error state - Design melhorado */}
      {error && !isLoading && (
        <div className="max-w-2xl mx-auto mt-8 animate-fade-in">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
            <div className="inline-block mb-4">
              <div className="bg-red-100 p-4 rounded-full">
                <svg 
                  className="w-12 h-12 text-red-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-red-900 mb-2">Ops! Algo deu errado</h3>
            <p className="text-red-700 mb-6">{error}</p>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
            >
              ← Tentar novamente
            </button>
          </div>
        </div>
      )}

      {/* Weather display */}
      {weather && !isLoading && (
        <WeatherDisplay weather={weather} onReset={handleReset} />
      )}

      {/* Info cards - Mostrado apenas na página inicial */}
      {!weather && !isLoading && !error && (
        <div className="mt-16 max-w-5xl mx-auto animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="inline-block p-3 bg-blue-50 rounded-xl mb-4 group-hover:bg-blue-100 transition-colors">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 font-poppins">Dados Precisos</h3>
              <p className="text-gray-600 text-sm">
                Informações meteorológicas atualizadas em tempo real através da API Open-Meteo
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="inline-block p-3 bg-cyan-50 rounded-xl mb-4 group-hover:bg-cyan-100 transition-colors">
                <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 font-poppins">Cobertura Global</h3>
              <p className="text-gray-600 text-sm">
                Consulte o clima de qualquer cidade ao redor do mundo com facilidade
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="inline-block p-3 bg-indigo-50 rounded-xl mb-4 group-hover:bg-indigo-100 transition-colors">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 font-poppins">Interface Intuitiva</h3>
              <p className="text-gray-600 text-sm">
                Design moderno e responsivo para uma experiência agradável em qualquer dispositivo
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}