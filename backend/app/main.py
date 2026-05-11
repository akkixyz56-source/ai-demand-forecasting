from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.models.user import User

from app.routes.auth import router as auth_router
from app.routes.dataset import router as dataset_router

import pandas as pd
import numpy as np

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(auth_router)
app.include_router(dataset_router)

@app.post("/forecast")
def forecast_sales():

    dates = pd.date_range(start="2025-01-01", periods=30)

    forecast = []

    for i in range(30):
        forecast.append({
            "date": str(dates[i].date()),
            "forecast": float(np.random.randint(100, 500))
        })

    return {
        "forecast": forecast
    }

@app.get("/")
def home():
    return {"message": "Backend Working"}