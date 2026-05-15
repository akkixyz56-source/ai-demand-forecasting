from fastapi import APIRouter

router = APIRouter()

@router.post("/simulate")
def simulate_scenario(data: dict):

    temperature = data.get("temperature", 30)
    occupancy = data.get("occupancy", 50)
    shutdown_devices = data.get("shutdown_devices", 0)

    # Simple simulation logic
    estimated_usage = (temperature * 2) + (occupancy * 1.5)

    savings = shutdown_devices * 10

    optimized_usage = estimated_usage - savings

    reduction_percent = (savings / estimated_usage) * 100

    return {
        "estimated_energy_usage": estimated_usage,
        "optimized_usage": optimized_usage,
        "energy_saved": savings,
        "reduction_percentage": round(reduction_percent, 2)
    }