from fastapi import APIRouter
import pandas as pd
from prophet import Prophet

router = APIRouter()

@router.get("/forecast")
def energy_forecast():

    # Load dataset
    df = pd.read_csv("uploads/Energy.csv")

    # Rename columns for Prophet
    df = df.rename(columns={
        "timestamp": "ds",
        "energy_usage": "y"
    })

    # Convert timestamp
    df["ds"] = pd.to_datetime(df["ds"])

    # Train model
    model = Prophet()
    model.fit(df)

    # Predict next 24 hours
    future = model.make_future_dataframe(periods=24, freq='h')

    forecast = model.predict(future)

    # Get prediction output
    result = forecast[["ds", "yhat"]].tail(24)

    # Convert to JSON
    return result.to_dict(orient="records")