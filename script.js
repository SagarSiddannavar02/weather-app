async function getWeather() {
  const city = document.getElementById("cityInput").value;

  try {
    // Step 1: Get coordinates
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );
    const geoData = await geoRes.json();

    if (!geoData.results) {
      alert("City not found");
      return;
    }

    const { latitude, longitude, name } = geoData.results[0];

    // Step 2: Get weather
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherRes.json();

    const weather = weatherData.current_weather;

    // Display
    document.getElementById("cityName").innerText = name;
    document.getElementById("temp").innerText = "Temperature: " + weather.temperature + "°C";
    document.getElementById("wind").innerText = "Wind Speed: " + weather.windspeed + " km/h";
    document.getElementById("condition").innerText = "Weather Code: " + weather.weathercode;

  } catch (error) {
    alert("Error fetching weather");
  }
}