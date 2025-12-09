from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib, numpy as np, pandas as pd
import json

# -------------------------------
# FASTAPI + CORS
# -------------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow front-end
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# LOAD MODEL + FREQUENCY MAPS
# -------------------------------
model = joblib.load("house_price_model.pkl")

with open("province_freq.json", "r") as f:
    PROV_FREQ = json.load(f)

with open("city_freq.json", "r") as f:
    CITY_FREQ = json.load(f)

# -------------------------------
# INPUT MODEL
# -------------------------------
class Input(BaseModel):
    Bedrooms: int
    Bathrooms: int
    SquareFootage: int
    Province: str
    City: str
    PropertyType: str
    Garage: int
    Pool: int
    Garden: int
    Balcony: int

# -------------------------------
# PREDICTION API
# -------------------------------
@app.post("/api/predict")
def predict(data: Input):

    # Convert province to frequency
    prov_freq = PROV_FREQ.get(data.Province, 1)

    # Convert city → frequency using city → province → freq mapping
    city_freq = 1
    if data.Province in CITY_FREQ:
        city_freq = CITY_FREQ[data.Province].get(data.City, 1)

    # Build model input using correct training column names
    row = {
        "Bedrooms": data.Bedrooms,
        "Bathrooms": data.Bathrooms,
        "Square Footage": data. SquareFootage,
        "City_freq": city_freq,
        "Prov_freq": prov_freq,
        "Property Type": data.PropertyType,
        "Garage": data.Garage,
        "Pool": data.Pool,
        "Garden": data.Garden,
        "Balcony": data.Balcony,
    }

    df = pd.DataFrame([row])

    # Predict
    pred_log = model.predict(df)
    pred = float(np.expm1(pred_log)[0])  # convert from log scale

    return {"predicted_price": pred}
