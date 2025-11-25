from flask import Flask, request, jsonify, render_template
import requests
import os

app = Flask(__name__, static_folder="static", template_folder="templates")

if os.environ.get("RENDER") is None:
    from dotenv import load_dotenv
    load_dotenv()

API_KEY = os.environ.get("API_KEY")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/weather")
def weather():
    lat = request.args.get("lat")
    lon = request.args.get("lon")

    if not lat or not lon:
        return jsonify({"error": "Latitude and longitude required"}), 400

    url = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=imperial&appid={API_KEY}"

    try:
        response = requests.get(url)
        data = response.json()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run()