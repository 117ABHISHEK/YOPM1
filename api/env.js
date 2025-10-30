export default function handler(req, res) {
  // Inject environment variables into the HTML
  res.setHeader('Content-Type', 'text/javascript');
  res.send(`
    window.ENV_WEATHER_API_KEY = '${process.env.WEATHER_API_KEY}';
    window.ENV_WEATHER_API_BASE_URL = '${process.env.WEATHER_API_BASE_URL}';
    window.ENV_WEATHER_API_UNITS = '${process.env.WEATHER_API_UNITS}';
  `);
}