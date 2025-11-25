let lat = 41.8832;
let lon = -87.6324;

const popularPlaces = [
    { name: "Chicago", lat: 41.8781, lon: -87.6298 },
    { name: "Eiffel Tower, Paris", lat: 48.8584, lon: 2.2945 },
    { name: "Statue of Liberty, New York", lat: 40.6892, lon: -74.0445 },
    { name: "Colosseum, Rome", lat: 41.8902, lon: 12.4922 },
    { name: "Big Ben, London", lat: 51.5007, lon: -0.1246 },
    { name: "Sydney Opera House, Sydney", lat: -33.8568, lon: 151.2153 },
    { name: "Christ the Redeemer, Rio", lat: -22.9519, lon: -43.2105 },
    { name: "Great Wall of China, Beijing", lat: 40.4319, lon: 116.5704 },
    { name: "Taj Mahal, Agra", lat: 27.1751, lon: 78.0421 },
    { name: "Mount Fuji, Japan", lat: 35.3606, lon: 138.7274 },
    { name: "Pyramids of Giza, Egypt", lat: 29.9792, lon: 31.1342 }
];

const dom = {
    temp: document.getElementById("temp"),
    desc: document.getElementById("desc"),
    icon: document.getElementById("icon"),
    rain: document.getElementById("rain"),
    feelsLike: document.getElementById("feelsLike"),
    humidity: document.getElementById("humidity"),
    windSpeed: document.getElementById("windSpeed"),
    forecastTime: document.getElementById("forecastTime"),
    location: document.getElementById("location")
};

// Initialize map
const map = L.map('map').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

popularPlaces.forEach(place => {
    L.marker([place.lat, place.lon])
        .addTo(map)
        .bindPopup(`<b>${place.name}</b>`);
});

let currentMarker = L.marker([lat, lon]).addTo(map).bindPopup("Current Location").openPopup();

// Map click event
map.on('click', function(e) {
    lat = e.latlng.lat;
    lon = e.latlng.lng;

    currentMarker.setLatLng([lat, lon])
        .bindPopup(`Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`)
        .openPopup();

    getWeather();
});

// Temperature color function
function getTempColor(tempF) {
    const stops = [
        { temp: 0, color: [0, 0, 255] },
        { temp: 60, color: [0, 255, 0] },
        { temp: 70, color: [173, 255, 47] },
        { temp: 80, color: [255, 255, 0] },
        { temp: 90, color: [255, 165, 0] },
        { temp: 100, color: [255, 0, 0] }
    ];

    if (tempF <= stops[0].temp) return `rgb(${stops[0].color.join(",")})`;
    if (tempF >= stops[stops.length - 1].temp) return `rgb(${stops[stops.length - 1].color.join(",")})`;

    for (let i = 0; i < stops.length - 1; i++) {
        const start = stops[i];
        const end = stops[i + 1];
        if (tempF >= start.temp && tempF <= end.temp) {
            const ratio = (tempF - start.temp) / (end.temp - start.temp);
            const r = Math.round(start.color[0] + ratio * (end.color[0] - start.color[0]));
            const g = Math.round(start.color[1] + ratio * (end.color[1] - start.color[1]));
            const b = Math.round(start.color[2] + ratio * (end.color[2] - start.color[2]));
            return `rgb(${r},${g},${b})`;
        }
    }
}

// Fetch weather
async function getWeather() {
    try {
        const response = await fetch(`/weather?lat=${lat}&lon=${lon}`);
        const data = await response.json();

        if (!data.list) return console.error("Weather API returned error:", data);

        const forecast = data.list[0];
        const w = {
            temperature: forecast.main.temp,
            feelsLike: forecast.main.feels_like,
            description: forecast.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`,
            humidity: forecast.main.humidity,
            windSpeed: forecast.wind.speed,
            chanceOfRain: Math.round((forecast.pop || 0) * 100),
            time: forecast.dt_txt
        };

        // Update DOM
        dom.temp.innerText = Math.round(w.temperature) + "°F";
        dom.desc.innerText = w.description.charAt(0).toUpperCase() + w.description.slice(1);
        dom.icon.src = w.icon;
        dom.rain.innerText = w.chanceOfRain + "% rain";
        dom.feelsLike.innerText = w.feelsLike;
        dom.humidity.innerText = w.humidity;
        dom.windSpeed.innerText = w.windSpeed;
        dom.forecastTime.innerText = w.time;
        dom.location.innerHTML = `Latitude: ${lat} &nbsp;&nbsp;&nbsp;&nbsp; Longitude: ${lon}`;
        document.documentElement.style.setProperty('--temp-color', getTempColor(w.temperature));

    } catch (err) {
        console.error("Failed to fetch weather:", err);
    }
}

// Initial fetch
getWeather();
