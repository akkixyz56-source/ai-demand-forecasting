from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import Routes
from app.routes import forecast
from app.routes import peak_usage
from app.routes import anomalies
from app.routes import recommendations
from app.routes import simulation

app = FastAPI(
    title="AI Energy Consumption Forecasting API"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routes
app.include_router(forecast.router)
app.include_router(peak_usage.router)
app.include_router(anomalies.router)
app.include_router(recommendations.router)
app.include_router(simulation.router)

# Home Route
@app.get("/")
def home():
    return {
        "message": "AI Energy Consumption Forecasting API Running"
    }