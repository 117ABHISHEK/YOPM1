// Configuration settings for the application
const config = {
    weatherApi: {
        baseUrl: window.ENV_WEATHER_API_BASE_URL || 'https://api.openweathermap.org/data/2.5',
        apiKey: window.ENV_WEATHER_API_KEY || '', // Will be injected by Vercel
        units: window.ENV_WEATHER_API_UNITS || 'metric'
    }
};

// In a production environment, these would be loaded from environment variables
if (typeof process !== 'undefined' && process.env) {
    config.weatherApi.apiKey = process.env.WEATHER_API_KEY || config.weatherApi.apiKey;
    config.weatherApi.baseUrl = process.env.WEATHER_API_BASE_URL || config.weatherApi.baseUrl;
    config.weatherApi.units = process.env.WEATHER_API_UNITS || config.weatherApi.units;
}

export default config;