import httpx
from app.exceptions.weather_exceptions import CityNotFoundException, WeatherAPIException
from app.model.weather_model import WeatherResponse

class WeatherService:
    """
    Equivalente a uma classe Service
    """
    
    def __init__(self):
        self.base_url = "https://api.open-meteo.com/v1/forecast"
        # Converte geonames para coordenadas
        self.geocoding_url = "https://geocoding-api.open-meteo.com/v1/search"
    
    async def get_weather_by_city(self, city: str) -> WeatherResponse:
        """
        Busca o clima de uma cidade específica
        """
        try:
            coordinates = await self._get_coordinates(city)
            
            weather = await self._fetch_weather(coordinates)
            
            return weather
            
        except httpx.HTTPError as e:
            raise WeatherAPIException(f"Erro ao consultar API: {str(e)}")
    
    async def _get_coordinates(self, city: str):
        """Método privado para buscar coordenadas"""
        async with httpx.AsyncClient() as client:
            response = await client.get(
                self.geocoding_url,
                params={"name": city, "count": 1, "language": "pt"}
            )
            data = response.json()
            
            if not data.get("results"):
                raise CityNotFoundException(f"Cidade '{city}' não encontrada")
            
            return {
                "latitude": data["results"][0]["latitude"],
                "longitude": data["results"][0]["longitude"],
                "name": data["results"][0]["name"]
            }
    
    async def _fetch_weather(self, coordinates):
        """Busca dados meteorológicos"""
        async with httpx.AsyncClient() as client:
            response = await client.get(
                self.base_url,
                params={
                    "latitude": coordinates["latitude"],
                    "longitude": coordinates["longitude"],
                    "current": "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature,pressure_msl,visibility,uv_index",
                    "timezone": "auto"
                }
            )
            data = response.json()
            
            # Transforma em DTO
            return WeatherResponse(
                city=coordinates["name"],
                temperature=data["current"]["temperature_2m"],
                humidity=data["current"]["relative_humidity_2m"],
                wind_speed=data["current"]["wind_speed_10m"],
                weather_code=data["current"]["weather_code"],
                feels_like=data["current"]["apparent_temperature"],
                pressure=data["current"]["pressure_msl"],
                visibility=data["current"]["visibility"],
                uv_index=data["current"]["uv_index"]
            )