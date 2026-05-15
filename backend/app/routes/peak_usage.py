from fastapi import APIRouter
import pandas as pd

router = APIRouter()

@router.get("/peak-usage")
def peak_usage():

    # Load dataset
    df = pd.read_csv("uploads/Energy.csv")

    # Find average usage
    avg_usage = df["energy_usage"].mean()

    # Detect peak usage
    peaks = df[df["energy_usage"] > avg_usage]

    # Convert results
    result = peaks.to_dict(orient="records")

    return {
        "average_usage": avg_usage,
        "peak_periods": result
    }