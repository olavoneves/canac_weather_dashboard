from pydantic import BaseModel, Field

class WeatherResponse(BaseModel):
    """
    DTO de resposta (equivalente a uma classe DTO do Spring)
    Pydantic faz validação automática (como Bean Validation)
    """
    city: str = Field(..., description="Nome da cidade")
    temperature: float = Field(..., description="Temperatura em °C")
    humidity: float = Field(..., description="Umidade relativa (%)")
    wind_speed: float = Field(..., description="Velocidade do vento (km/h)")
    weather_code: int = Field(..., description="Código do clima")
    
    class Config:
        json_schema_extra = {
            "example": {
                "city": "São Paulo",
                "temperature": 25.5,
                "humidity": 65.0,
                "wind_speed": 12.3,
                "weather_code": 2
            }
        }