# Canac Weather Dashboard 🌤️

> Aplicação fullstack para consulta de informações meteorológicas, voltada para produtores de cana-de-açúcar monitorarem condições climáticas críticas para o desenvolvimento do canavial.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Docker Desktop instalado e em execução
- Portas 3000 (frontend) e 8000 (backend) disponíveis

### Preparação Inicial (Primeira Execução)

> **Nota:** O Docker irá instalar automaticamente todas as dependências durante o build. **Não é necessário** executar `npm install` ou `pip install` manualmente.

**Verifique se o Docker Desktop está rodando:**
```bash
docker --version
docker-compose --version
```

Ambos os comandos devem retornar versões instaladas. Se houver erro, certifique-se de que o Docker Desktop está aberto e em execução.

**Estrutura de pastas esperada:**

Certifique-se de estar na raiz do projeto onde está localizado o arquivo `docker-compose.yml`:
```bash
# Linux/Mac
pwd

# Windows (PowerShell)
Get-Location
```

O resultado deve terminar em: `.../canac_weather_dashboard`

### Execução

Na raiz do projeto, execute:
```bash
docker compose up --build
```

Aguarde a construção das imagens e inicialização dos containers. Quando aparecer:
```
canac-weather-backend  | INFO:     Application startup complete.
canac-weather-frontend |  ✓ Ready in ...ms
```

**Acesse a aplicação em:** [http://localhost:3000](http://localhost:3000)

### Documentação da API

A documentação interativa (Swagger) do backend está disponível em:  
**[http://localhost:8000/docs](http://localhost:8000/docs)**

---

## 🏗️ Arquitetura e Decisões Técnicas

### Backend (FastAPI + Python)

**Estrutura em Camadas:**
```
backend/
├── app/
│   ├── controllers/      # Endpoints e rotas HTTP
│   ├── services/         # Lógica de negócio
│   ├── models/           # DTOs e schemas Pydantic
│   ├── validators/       # Validações customizadas
│   └── exceptions/       # Tratamento de erros
```

**Decisões:**

- **FastAPI**: Framework moderno, assíncrono e com documentação automática
- **Pydantic**: Validação de dados robusta e tipagem forte
- **HTTPX**: Cliente HTTP assíncrono para comunicação com Open-Meteo API
- **Arquitetura em camadas**: Separação clara de responsabilidades (Controller → Service → External API)
- **Geocoding**: Conversão automática de nome de cidade para coordenadas usando Open-Meteo Geocoding API
- **Error handling**: Tratamento específico para cidade não encontrada, erros de API e validações de entrada

**Endpoint Principal:**
```http
GET /api/v1/weather/{city}
```

**Retorna:** temperatura, umidade, velocidade do vento e código de condição climática.

---

### Frontend (Next.js + React + Tailwind CSS)

**Estrutura de Componentes:**
```
frontend/
├── app/                  # Páginas Next.js 13+ (App Router)
├── components/           # Componentes reutilizáveis
│   ├── CitySelector      # Input e sugestões de cidades
│   └── WeatherDisplay    # Exibição dos dados meteorológicos
├── services/             # Camada de comunicação com API
└── types/                # TypeScript types e interfaces
```

**Decisões:**

- **Next.js 16**: Framework React com SSR e otimizações automáticas
- **Tailwind CSS**: Estilização utilitária, responsiva e moderna
- **TypeScript**: Tipagem estática para maior segurança
- **Estados assíncronos**: Loading, Error e Success states claramente diferenciados
- **UX otimizada**: Skeleton loading, mensagens de erro amigáveis, sugestões de cidades populares
- **Design responsivo**: Funciona em desktop, tablet e mobile

**Dados Destacados (Contexto Rural):**

Os dados apresentados foram escolhidos por serem **críticos para o desenvolvimento do canavial**:

1. **Temperatura**: Cana-de-açúcar se desenvolve melhor entre 20-30°C
2. **Umidade**: Alta umidade favorece doenças fúngicas; baixa umidade causa estresse hídrico
3. **Vento**: Ventos fortes podem danificar a cultura; vento moderado ajuda na evapotranspiração
4. **Condição Climática**: Indicador visual rápido das condições gerais

---

### Docker & Orquestração

**Decisões:**

- **Multi-stage builds**: Otimização de tamanho das imagens
- **Networks isoladas**: Backend e frontend na mesma rede Docker para comunicação
- **Environment variables**: Configuração flexível de URLs e portas
- **Health checks**: Monitoramento da saúde do backend
- **Volumes**: Hot reload habilitado para desenvolvimento (código mapeado para containers)

---

## 🔄 Fluxo de Dados
```
Usuário → Frontend (Next.js)
            ↓
    Digite "São Paulo"
            ↓
    GET /api/v1/weather/São Paulo
            ↓
Backend (FastAPI) → Open-Meteo Geocoding API
            ↓
    Retorna coordenadas
            ↓
Backend → Open-Meteo Forecast API
            ↓
    Retorna dados meteorológicos
            ↓
Backend → Frontend (JSON formatado)
            ↓
    Exibição visual dos dados
```

---

## 🧪 Testando a Aplicação

### Teste Manual

1. Acesse [http://localhost:3000](http://localhost:3000)
2. Digite uma cidade (ex: "Ribeirão Preto")
3. Clique em "Buscar" ou pressione Enter
4. Visualize os dados meteorológicos

### Teste via API (curl)
```bash
curl http://localhost:8000/api/v1/weather/Ribeirao%20Preto
```

**Resposta esperada:**
```json
{
  "city": "Ribeirão Preto",
  "temperature": 28.5,
  "humidity": 65.0,
  "wind_speed": 12.3,
  "weather_code": 0
}
```

---

## 🛠️ Tecnologias Utilizadas

### Backend

- Python 3.11
- FastAPI 0.109.0
- Uvicorn (ASGI server)
- HTTPX (async HTTP client)
- Pydantic (validação de dados)

### Frontend

- Next.js 16.0.5
- React 19
- TypeScript 5
- Tailwind CSS 3
- Fontes: Inter e Poppins (Google Fonts)

### DevOps

- Docker & Docker Compose
- Alpine Linux (imagens otimizadas)

---

## 💡 Melhorias Futuras

### Funcionalidades

- [ ] **Previsão de 7 dias**: Expandir para mostrar tendência semanal
- [ ] **Alertas climáticos**: Notificações para condições adversas (geadas, chuvas extremas)
- [ ] **Histórico de consultas**: Salvar cidades favoritas do produtor
- [ ] **Comparação de regiões**: Visualizar clima de múltiplas propriedades
- [ ] **Índice de desenvolvimento**: Calcular índice específico para cana baseado em temperatura, chuva e solo

### Técnicas

- [ ] **Cache Redis**: Reduzir chamadas à API externa
- [ ] **Rate limiting**: Proteger contra abuso
- [ ] **Testes automatizados**: Unit tests (pytest + Jest) e E2E (Playwright)
- [ ] **CI/CD**: GitHub Actions para deploy automático
- [ ] **Monitoramento**: Logs estruturados e métricas (Prometheus/Grafana)
- [ ] **Banco de dados**: PostgreSQL para histórico de consultas

### UX/UI

- [ ] **PWA**: Permitir instalação como app nativo
- [ ] **Modo offline**: Cache local de últimas consultas
- [ ] **Gráficos**: Visualizações de tendências climáticas
- [ ] **Temas**: Dark mode para uso noturno

---

## 📂 Estrutura do Projeto
```
canac_weather_dashboard/
├── backend/
│   ├── app/
│   │   ├── controllers/
│   │   │   └── weather_controller.py
│   │   ├── services/
│   │   │   └── weather_service.py
│   │   ├── models/
│   │   │   └── weather_model.py
│   │   ├── validators/
│   │   │   └── city_validator.py
│   │   ├── exceptions/
│   │   │   └── weather_exceptions.py
│   │   └── main.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── CitySelector.tsx
│   │   └── WeatherDisplay.tsx
│   ├── services/
│   │   └── weatherApi.ts
│   ├── types/
│   │   └── weather.ts
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## 📝 Notas Adicionais

- A aplicação utiliza **apenas HTTPS** para comunicação com APIs externas
- Não há necessidade de chaves de API (Open-Meteo é aberto)
- Os dados são consultados em **tempo real** a cada busca
- A interface foi otimizada para **contexto profissional/rural**

---

## 👨‍💻 Autor

Desenvolvido por **Olavo Neves** para o desafio técnico da **CANAC** - Engenheiro(a) de Software Fullstack

---

## 📧 Contato

Para dúvidas sobre a implementação: **olavo9neves@gmail.com**