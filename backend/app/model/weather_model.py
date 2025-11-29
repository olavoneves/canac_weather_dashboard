from pydantic import BaseModel, Field

class WeatherResponse(BaseModel):
    """
    DTO de resposta (equivalente a uma classe DTO)
    Pydantic faz validação automática (como Bean Validation)
    """
    city: str = Field(..., description="Nome da cidade")
    temperature: float = Field(..., description="Temperatura em °C")
    humidity: float = Field(..., description="Umidade relativa (%)")
    wind_speed: float = Field(..., description="Velocidade do vento (km/h)")
    weather_code: int = Field(..., description="Código do clima")
    feels_like: float = Field(..., description="Sensação térmica em °C")
    pressure: float = Field(..., description="Pressão atmosférica (hPa)")
    visibility: float = Field(..., description="Visibilidade (km)")
    uv_index: float = Field(..., description="Índice UV")
    
    class Config:
        json_schema_extra = {
            "example": {
                "city": "São Paulo",
                "temperature": 25.5,
                "humidity": 65.0,
                "wind_speed": 12.3,
                "weather_code": 2,
                "feels_like": 27.0,
                "pressure": 1013.0,
                "visibility": 10.0,
                "uv_index": 5.0
            }
        }