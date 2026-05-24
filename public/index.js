const API_URL = '/api/weather';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const messageEl = document.getElementById('message');
const resultCard = document.getElementById('resultCard');
const cityNameEl = document.getElementById('cityName');
const weatherDescEl = document.getElementById('weatherDesc');
const temperatureEl = document.getElementById('temperature');
const feelsLikeEl = document.getElementById('feelsLike');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('windSpeed');
const pressureEl = document.getElementById('pressure');
const conditionEl = document.getElementById('condition');
const weatherIconEl = document.getElementById('weatherIcon');

searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    getWeather();
  }
});

function getWeather() {
  const city = cityInput.value.trim();

  if (!city) {
    showMessage('Type a city name to search.', 'error');
    return;
  }

  showMessage('Loading weather...', 'info');
  resultCard.classList.add('hidden');

  const url = `${API_URL}?city=${encodeURIComponent(city)}`;

  fetch(url)
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to fetch weather data.');
      }
      return data;
    })
    .then(displayWeather)
    .catch((error) => {
      showMessage(error.message, 'error');
    });
}

function displayWeather(data) {
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const humidity = data.main.humidity;
  const windSpeed = Math.round(data.wind.speed * 3.6);
  const pressure = data.main.pressure;
  const description = data.weather[0].description;
  const condition = data.weather[0].main.toLowerCase();

  cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
  weatherDescEl.textContent = description;
  temperatureEl.textContent = `${temp}°C`;
  feelsLikeEl.textContent = `${feelsLike}°C`;
  humidityEl.textContent = `${humidity}%`;
  windSpeedEl.textContent = `${windSpeed} km/h`;
  pressureEl.textContent = `${pressure} hPa`;
  conditionEl.textContent = data.weather[0].main;
  weatherIconEl.textContent = chooseIcon(condition, description);

  resultCard.classList.remove('hidden');
  showMessage('', '');
}

function chooseIcon(condition, description) {
  if (condition.includes('clear')) return '☀️';
  if (condition.includes('cloud')) return '☁️';
  if (condition.includes('rain') || condition.includes('drizzle')) return '🌧️';
  if (condition.includes('snow')) return '❄️';
  if (condition.includes('thunder')) return '⛈️';
  if (condition.includes('mist') || condition.includes('fog') || condition.includes('haze')) return '🌫️';
  if (description.includes('smoke')) return '💨';
  return '🌤️';
}

function showMessage(text, type) {
  messageEl.textContent = text;
  if (!text) {
    messageEl.style.opacity = '0';
    return;
  }
  messageEl.style.opacity = '1';
  messageEl.style.color = type === 'error' ? '#fca5a5' : '#93c5fd';
}

window.addEventListener('load', () => {
  cityInput.value = '';
  messageEl.textContent = '';
});
