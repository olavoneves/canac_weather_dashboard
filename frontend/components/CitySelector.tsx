'use client';

import { useState } from 'react';

interface CitySelectorProps {
  onCitySelect: (city: string) => void;
  isLoading: boolean;
}

export default function CitySelector({ onCitySelect, isLoading }: CitySelectorProps) {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const suggestedCities = [
    'São Paulo',
    'Rio de Janeiro',
    'Brasília',
    'Belo Horizonte',
    'Curitiba',
    'Porto Alegre',
    'Salvador',
    'Fortaleza',
    'Recife',
    'Manaus',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!city.trim()) {
      setError('Por favor, digite o nome de uma cidade');
      return;
    }

    if (city.trim().length < 2) {
      setError('Nome da cidade deve ter pelo menos 2 caracteres');
      return;
    }

    setError('');
    onCitySelect(city.trim());
  };

  const handleSuggestedCity = (suggestedCity: string) => {
    setCity(suggestedCity);
    setError('');
    onCitySelect(suggestedCity);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input de busca */}
        <div className="relative">
          <input
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setError('');
            }}
            placeholder="Digite o nome da cidade..."
            className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 font-medium"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Buscando...
              </span>
            ) : (
              '🔍 Buscar'
            )}
          </button>
        </div>

        {/* Mensagem de erro */}
        {error && (
          <div className="text-red-500 text-sm px-2 animate-fade-in">
            ⚠️ {error}
          </div>
        )}
      </form>

      {/* Cidades sugeridas */}
      <div className="mt-8">
        <p className="text-sm text-gray-600 mb-3 font-medium">Cidades populares:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedCities.map((suggestedCity) => (
            <button
              key={suggestedCity}
              onClick={() => handleSuggestedCity(suggestedCity)}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 rounded-full text-sm transition-all duration-300 border border-gray-200 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {suggestedCity}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}