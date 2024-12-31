document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const addCityBtn = document.getElementById("add-city-btn");
    const cityList = document.getElementById("city-list");
    const API_KEY = "42e94355d00f795e3fbb2feb94c2c458";
    const weatherContainer = document.getElementById("weather-container");
  
    // Retrieve cities from localStorage or initialize an empty array
    const cities = JSON.parse(localStorage.getItem("cities")) || [];
    renderCities(); // Display saved cities
  
    // Add city when button is clicked
    addCityBtn.addEventListener("click", async () => {
      const city = cityInput.value.trim().toLowerCase();
      if (city && !cities.includes(city)) {
        const weatherData = await fetchWeatherData(city);
        if (weatherData) {
          cities.push(city); // Add city to list
          saveCities(); // Save to localStorage
          renderCities(); // Re-render city list
        }
      }
      cityInput.value = ""; // Clear input field
    });
  
    // Show weather data when a city is clicked
    cityList.addEventListener("click", async (e) => {
      if (e.target.tagName === "LI") {
        const city = e.target.textContent;
        const weatherData = await fetchWeatherData(city);
        displayWeather(weatherData); // Display weather
      }
    });
  
    // Render list of cities
    function renderCities() {
      cityList.innerHTML = "";
      cities.forEach((city) => {
        const li = document.createElement("li");
        li.textContent = capitalizeFirstLetter(city);
        cityList.appendChild(li);
      });
    }
  
    // Fetch weather data for a city
    async function fetchWeatherData(city) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) {
        alert("City not found!");
        return null;
      }
      return await response.json();
    }
  
    // Display weather information
    function displayWeather(data) {
      weatherContainer.innerHTML = `
        <h3>${data.name}</h3>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Wind Speed: ${data.wind.speed} Kph</p>
      `;
    }
  
    // Capitalize the first letter of each word in a city name
    function capitalizeFirstLetter(str) {
      return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    }
  
    // Save cities to localStorage
    function saveCities() {
      localStorage.setItem("cities", JSON.stringify(cities));
    }
  });
  