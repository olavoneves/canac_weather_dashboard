from fastapi import APIRouter, HTTPException, Depends
from app.service.weather_service import WeatherService
from app.model.weather_model import WeatherResponse
from app.validations.city_validation import validate_city

router = APIRouter()

def get_weather_service():
    return WeatherService()

@router.get("/weather/{city}", response_model=WeatherResponse)
async def get_weather(city: str, service: WeatherService = Depends(get_weather_service)):
    validate_city(city)

    try:
        weather_data = await service.get_weather_by_city(city)
        return weather_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))