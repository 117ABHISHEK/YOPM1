// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Hide weather card initially
    document.getElementById("weatherCard").style.display = "none";

    // Add event listeners
    document.getElementById("cityInput").addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            getWeather();
        }
    });

    document.getElementById("searchBtn").addEventListener('click', getWeather);

    // Load environment variables
    loadEnvVariables();
});

// Function to load environment variables
async function loadEnvVariables() {
    try {
        const response = await fetch('/.env');
        const text = await response.text();
        
        // Parse .env file
        const envVars = text.split('\n').reduce((acc, line) => {
            // Skip comments and empty lines
            if (line.startsWith('#') || !line.trim()) return acc;
            
            const [key, value] = line.split('=');
            acc[key.trim()] = value.trim();
            return acc;
        }, {});

        // Store in window object for global access
        window.env = envVars;
    } catch (error) {
        console.error('Error loading environment variables:', error);
        showError('Failed to load configuration. Please try again later.');
    }
}

function getWeather() {
  const apiKey = window.env?.WEATHER_API_KEY;
  const baseUrl = window.env?.WEATHER_API_BASE_URL;
  const units = window.env?.WEATHER_API_UNITS;
  
  if (!apiKey || !baseUrl) {
    showError('Weather API configuration is missing. Please check the setup.');
    return;
  }

  const city = document.getElementById("cityInput").value.trim()

  if (!city) {
    alert("Please enter a city name!")
    return
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

  // Show loading indicator
  showLoading(true)

  fetch(url)
    .then(async (response) => {
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Invalid API key. Please check your configuration.");
        } else if (response.status === 404 || data.cod === '404') {
          throw new Error(`City "${city}" not found. Please check the spelling.`);
        } else {
          throw new Error(data.message || "Failed to fetch weather data");
        }
      }
      
      return data;
    })
    .then((data) => {
      // Hide loading indicator
      showLoading(false)

      // Update weather information
      updateWeatherDisplay(data)

      // Show weather card with animation
      const weatherCard = document.getElementById("weatherCard")
      weatherCard.style.display = "block"
      weatherCard.classList.add("card-enter")

      // Remove animation class after animation completes
      setTimeout(() => {
        weatherCard.classList.remove("card-enter")
      }, 600)
    })
    .catch((error) => {
      showLoading(false)
      showError(error.message)
      
      // Hide weather card if it was previously shown
      const weatherCard = document.getElementById("weatherCard")
      weatherCard.style.display = "none"
    })
}

function updateWeatherDisplay(data) {
  const temp = Math.round(data.main.temp)
  const weather = data.weather[0].main.toLowerCase()
  const description = data.weather[0].description
  const feelsLike = Math.round(data.main.feels_like)
  const humidity = data.main.humidity
  const windSpeed = Math.round(data.wind.speed * 3.6) // Convert m/s to km/h
  const pressure = data.main.pressure

  // Update basic weather info
  document.getElementById("city-name").innerText = data.name
  document.getElementById("temperature").innerText = `${temp}°C`
  document.getElementById("condition").innerText = description

  // Update detailed weather info
  document.getElementById("feels-like").innerText = `${feelsLike}°C`
  document.getElementById("humidity").innerText = `${humidity}%`
  document.getElementById("wind-speed").innerText = `${windSpeed} km/h`
  document.getElementById("pressure").innerText = `${pressure} hPa`

  // Show weather details
  document.getElementById("weatherDetails").style.display = "block"

  // Update animated weather icon
  updateWeatherIcon(weather, description)
}

function updateWeatherIcon(weather, description) {
  const iconElement = document.getElementById("weather-icon")
  let iconClass = ""
  let animationClass = ""

  // Determine icon and animation based on weather condition
  if (weather.includes("clear") || weather.includes("sun")) {
    iconClass = "bi bi-brightness-high"
    animationClass = "sun-icon"
  } else if (weather.includes("rain") || description.includes("rain")) {
    iconClass = "bi bi-cloud-rain"
    animationClass = "rain-icon"
  } else if (weather.includes("snow")) {
    iconClass = "bi bi-snow"
    animationClass = "snow-icon"
  } else if (weather.includes("thunder") || weather.includes("storm")) {
    iconClass = "bi bi-cloud-lightning"
    animationClass = "storm-icon"
  } else if (weather.includes("cloud")) {
    iconClass = "bi bi-clouds"
    animationClass = "cloud-icon"
  } else if (weather.includes("mist") || weather.includes("fog") || weather.includes("haze")) {
    iconClass = "bi bi-cloud-fog"
    animationClass = "cloud-icon"
  } else {
    iconClass = "bi bi-cloud-sun"
    animationClass = "cloud-icon"
  }

  iconElement.innerHTML = `<i class="${iconClass} ${animationClass}"></i>`
}

function showLoading(show) {
  const loadingIndicator = document.getElementById("loadingIndicator")
  const weatherCard = document.getElementById("weatherCard")
  const searchBtn = document.getElementById("searchBtn")

  if (show) {
    loadingIndicator.style.display = "block"
    weatherCard.style.display = "none"
    searchBtn.disabled = true
    searchBtn.innerHTML = '<i class="bi bi-hourglass-split"></i>'
  } else {
    loadingIndicator.style.display = "none"
    searchBtn.disabled = false
    searchBtn.innerHTML = '<i class="bi bi-search"></i> Get Weather'
  }
}

function showError(message) {
  // Create and show a styled alert
  const alertDiv = document.createElement("div")
  alertDiv.className = "alert alert-danger alert-dismissible fade show"
  alertDiv.style.position = "fixed"
  alertDiv.style.top = "20px"
  alertDiv.style.right = "20px"
  alertDiv.style.zIndex = "9999"
  alertDiv.style.minWidth = "300px"

  alertDiv.innerHTML = `
        ${message}
        <button type="button" class="close" data-dismiss="alert">
            <span>&times;</span>
        </button>
    `

  document.body.appendChild(alertDiv)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.parentNode.removeChild(alertDiv)
    }
  }, 5000)
}

// Clear input field when page loads
window.addEventListener("load", () => {
  document.getElementById("cityInput").value = ""
})
