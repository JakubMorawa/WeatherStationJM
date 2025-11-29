<h1 align="center">
  <img src="static/weatherstationjm.svg" width="60%" alt="Weather Station JM Logo">
</h1>

<p align="center">
  <strong>🌦️ Interactive real-time weather map powered by Flask + OpenWeather API</strong>
</p>

<p align="center">
  <a href="https://weatherstationjm.onrender.com" target="_blank">
    🌐 Live Website
  </a>
</p>
<div align="center">
  <img src="weatherScreenshot.png" width="800" alt="weather screenshot">

</div>

## 📌 Overview

**Weather Station J.M.** is an interactive weather-forecasting web app built with:

- **Python + Flask backend**
- **JavaScript + Leaflet.js front-end**
- **OpenWeather Forecast API**

Users can click anywhere on the world map and instantly see:

- 🌡️ Temperature  
- 💧 Humidity  
- 🌧️ Rain probability  
- 🌬️ Wind speed  
- 🌤️ Weather description + icon  
- 🕒 Forecast timestamp  
- 📍 The exact latitude/longitude clicked  

The backend is securely deployed on **Render**, using a `.env` file locally and `gitignore` to protect API keys.

## 🧩 Features

🗺️ Interactive world map (Leaflet.js)

📍 Click anywhere to retrieve weather

🏙️ Famous world landmarks pre-marked

🌡️ Dynamic temperature-based color theme

🔐 Secure environment variables

🚀 Auto-deployed backend on Render

⚡ 3-hour OpenWeather forecast retrieval

🎨 Clean UI with responsive layout

## 🛠️ Tech Stack
<table style="width:100%; text-align:center; border-collapse:collapse;">
  <tr style="background-color:#e2e8ee;">
    <th style="padding:10px;">Backend</th>
    <th style="padding:10px;">Frontend</th>
    <th style="padding:10px;">API</th>
  </tr>
  <tr>
    <td style="padding:10px;">Python (Flask)</td>
    <td style="padding:10px;">
      <ul style="list-style:none; padding:0; margin:0;">
        HTML, CSS, JavaScript, Leaflet.js
      </ul>
    </td>
    <td style="padding:10px;">
      <a href="https://openweathermap.org">OpenWeatherMap</a>
    </td>
  </tr>
</table>
