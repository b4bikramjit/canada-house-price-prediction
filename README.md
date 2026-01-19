
# Canada House Price Predictor

## Project Overview

End-to-End Machine Learning Web Application

🚀 Predict Canadian house prices using a production-ready ML model deployed with FastAPI and a responsive frontend.
This project demonstrates the full data science lifecycle — from data preprocessing and feature engineering to model training, evaluation, and cloud deployment.

<img width="1438" height="895" alt="image" src="https://github.com/user-attachments/assets/d770eb1b-31e3-420b-bdd6-5cbadcf9378c" />

🔗 Live Demo: https://predspriceca.onrender.com/


## Dataset Overview

The dataset consists of structured Canadian housing data with:

🏠Property Features - Bedrooms, Bathrooms, Square Footage, Property type

📍Location Features - Province, City

⭐Amenities - Garage, Pool, Garden, Balcony

🎯Target - Sale Price

🔗 Dataset used - https://www.kaggle.com/datasets/yuliiabulana/canada-housing

## Data Cleaning & Feature Engineering

Removed / handled missing values and duplicates

Applied log transformation to target variable to reduce skew

Outlier detection and removal for bathrooms and bedrooms

Used frequency encoding for Province and City, OHE for Property Type, Power Transformations for numerical variates

## Model Training & Evaluation

Trained and tested all linear and tree based regression algortihms on the processed dataset

CatBoost Regressor gave the optimal results

Applied hyperparameter tuning and ensemble teachniques but it did not give any significant boost

## Evaluation Metrics
Metric	Value
R² Score	~0.74
MAPE	~25%

## Deployment Architecture

🔧 Backend

FastAPI

Python 3.12

Deployed on Railway

🎨 Frontend

Static site (HTML, CSS, JavaScript)

Province → City dynamic filtering

Live input sliders

Responsive UI

Deployed on Render Static Site

## ⚠️ Disclaimer

Predicted prices are statistical estimates, not official appraisals.
Actual market values may differ due to factors not included in the dataset.
