from fastapi import HTTPException

def validate_city(city: str):
    if not city or len(city.strip()) < 2:
        raise HTTPException(
            status_code=400,
            detail="Nome da cidade deve ter pelo menos 2 caracteres"
        )

    if not city.replace(" ", "").replace("-", "").isalpha():
        raise HTTPException(
            status_code=400,
            detail="Nome da cidade deve conter apenas letras"
        )