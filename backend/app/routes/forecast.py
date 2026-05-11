from fastapi import APIRouter
import pandas as pd
from prophet import Prophet

router = APIRouter()

@router.post("/forecast")

def forecast_sales():

    # Read uploaded dataset
    df = pd.read_csv("uploads/Sales.csv")

    # Rename columns for Prophet
    df = df.rename(columns={
        "Date": "ds",
        "Sales": "y"
    })

    # Train model
    model = Prophet()

    model.fit(df)

    # Predict next 30 days
    future = model.make_future_dataframe(
        periods=30
    )

    forecast = model.predict(future)

    # Return predictions
    result = forecast[["ds", "yhat"]]

    return result.tail(30).to_dict(
        orient="records"
    )