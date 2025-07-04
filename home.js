// Hide weather card initially
document.getElementById("weatherCard").style.display = "none"

// Handle Enter key press in input field
function handleKeyPress(event) {
  if (event.key === "Enter") {
    call()
  }
}

function call() {
  // let API_KEY = ""; // Replace when public 
  const city = document.getElementById("cityInput").value.trim()

  if (!city) {
    alert("Please enter a city name!")
    return
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

  // Show loading indicator
  showLoading(true)

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("City not found")
      return response.json()
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
      showError("Error: " + error.message)
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
    searchBtn.innerHTML = '<div class="loading" style="width: 20px; height: 20px; border-width: 2px;"></div>'
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
