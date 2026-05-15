from fastapi import APIRouter
import pandas as pd
from sklearn.ensemble import IsolationForest

router = APIRouter()

@router.get("/anomalies")
def detect_anomalies():

    # Load dataset
    df = pd.read_csv("uploads/Energy.csv")

    # Select feature
    X = df[["energy_usage"]]

    # Train Isolation Forest
    model = IsolationForest(contamination=0.2)

    df["anomaly"] = model.fit_predict(X)

    # Get anomalies only
    anomalies = df[df["anomaly"] == -1]

    return anomalies.to_dict(orient="records")