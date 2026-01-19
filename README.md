Canada House Price Prediction
End-to-End Machine Learning Web Application

🚀 Predict Canadian house prices using a production-ready ML model deployed with FastAPI and a responsive frontend.
This project demonstrates the full data science lifecycle — from data preprocessing and feature engineering to model training, evaluation, and cloud deployment.

🔗 Live Demo: (Add your frontend Render URL here)
🔗 API Endpoint: (Add backend Render URL here)

⭐ Why This Project Stands Out

✔ End-to-end Data Science + Deployment
✔ Real-world tabular ML problem
✔ Advanced feature engineering for location data
✔ Production-ready API with FastAPI
✔ Clean, responsive frontend UI
✔ Metric-driven evaluation (R², MAPE)

🧠 Model Highlights

Model: CatBoost Regressor

Problem Type: Supervised Regression

R² Score: ~74%

MAPE: ~25%

Target Transformation: Log-price modeling

Encoding Strategy: Frequency encoding for high-cardinality locations

📊 Dataset Overview

The dataset consists of structured Canadian housing data with:

🏠 Property Features

Bedrooms

Bathrooms

Square footage

Property type

📍 Location Features

Province

City

⭐ Amenities

Garage

Pool

Garden

Balcony

🎯 Target

Sale price

🧹 Data Cleaning & Feature Engineering

Removed / handled missing values

Applied log transformation to target variable to reduce skew

Used frequency encoding for:

Province

City
(avoids high-dimensional one-hot encoding)

Binary encoding for amenity features

Feature scaling handled internally by CatBoost

🤖 Model Training & Evaluation
Training Pipeline

Train/validation split

Log-price target transformation

CatBoost regression modeling

Hyperparameter tuning

Model persistence using joblib

Evaluation Metrics
Metric	Value
R² Score	~0.74
MAPE	~25%
🌐 Deployment Architecture
Frontend (HTML/CSS/JS)
        ↓
FastAPI REST API
        ↓
CatBoost ML Model

🔧 Backend

FastAPI

Python 3.12

Deployed on Render

🎨 Frontend

Static site (HTML, CSS, JavaScript)

Province → City dynamic filtering

Live input sliders

Responsive UI

Deployed on Render Static Site

🔁 Prediction Workflow

User inputs property details

Frontend sends JSON payload

FastAPI processes request

ML model generates prediction

Log-price inverted to real price

UI displays:

Estimated value

Confidence price range

⚠️ Disclaimer

Predicted prices are statistical estimates, not official appraisals.
Actual market values may differ due to factors not included in the dataset.

🛠️ Tech Stack

Data Science

Python

Pandas

NumPy

CatBoost

Scikit-learn

Backend

FastAPI

Uvicorn

Joblib

Frontend

HTML

CSS

JavaScript

Deployment

Render (Backend + Static Site)
