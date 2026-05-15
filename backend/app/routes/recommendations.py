from fastapi import APIRouter
import pandas as pd

router = APIRouter()

@router.get("/recommendations")
def get_recommendations():

    # Load CSV
    df = pd.read_csv("uploads/Sales.csv")

    # Convert Sales column
    df["Sales"] = pd.to_numeric(df["Sales"])

    # Convert values to normal Python float
    average_usage = float(df["Sales"].mean())
    max_usage = float(df["Sales"].max())

    recommendations = []

    if average_usage > 100:
        recommendations.append(
            "Reduce dependency on single high-selling products."
        )

    if max_usage > 180:
        recommendations.append(
            "High sales spike detected. Increase inventory stock."
        )

    recommendations.append(
        "Monitor daily sales trends regularly."
    )

    recommendations.append(
        "Improve demand forecasting accuracy."
    )

    recommendations.append(
        "Optimize stock management using AI predictions."
    )

    return {
        "average_usage": average_usage,
        "max_usage": max_usage,
        "recommendations": recommendations
    }