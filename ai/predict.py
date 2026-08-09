from flask import Flask, request, jsonify
import pandas as pd
from sklearn.linear_model import LinearRegression

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():

    data = request.json

    months = data["months"]
    demand = data["demand"]

    df = pd.DataFrame({
        "month": months,
        "demand": demand
    })

    X = df[["month"]]
    y = df["demand"]

    model = LinearRegression()
    model.fit(X, y)

    next_month = [[max(months)+1]]

    prediction = model.predict(next_month)

    return jsonify({
        "predicted_demand": float(prediction[0])
    })


if __name__ == '__main__':
    app.run(port=8000)