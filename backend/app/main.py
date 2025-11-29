from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controller import weather_controller

# Cria a aplicação FastAPI (equivalente ao @SpringBootApplication)
app = FastAPI(
    title="Canac Weather API",
    description="API para consulta de clima de cidades",
    version="1.0.0"
)

# Configuração CORS (permite que o frontend acesse a API)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend Next.js
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registra as rotas (equivalente ao component scan)
app.include_router(weather_controller.router, prefix="/api/v1", tags=["weather"])

@app.get("/health")
async def health_check():
    return {"status": "ok"}