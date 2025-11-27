import { WeatherData, WeatherError } from '@/types/weather';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class WeatherApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_BASE_URL}/api/v1`;
  }

  /**
   * Busca dados climáticos de uma cidade
   * @param city Nome da cidade
   * @returns Dados meteorológicos
   */
  async getWeatherByCity(city: string): Promise<WeatherData> {
    try {
      const response = await fetch(`${this.baseUrl}/weather/${encodeURIComponent(city)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw this.handleError(response.status, errorData);
      }

      const data: WeatherData = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro ao buscar dados do clima');
    }
  }

  private handleError(status: number, errorData: any): WeatherError {
    const message = errorData.detail || errorData.message || 'Erro desconhecido';

    switch (status) {
      case 400:
        return { message: `Requisição inválida: ${message}`, status };
      case 404:
        return { message: 'Cidade não encontrada. Verifique o nome e tente novamente.', status };
      case 500:
        return { message: 'Erro no servidor. Tente novamente mais tarde.', status };
      default:
        return { message: `Erro: ${message}`, status };
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const weatherApi = new WeatherApiService();