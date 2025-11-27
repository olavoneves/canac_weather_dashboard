class WeatherAPIException(Exception):
    """Exceção base para erros da API"""
    pass

class CityNotFoundException(WeatherAPIException):
    """Cidade não encontrada"""
    pass