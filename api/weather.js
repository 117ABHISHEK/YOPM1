export default async function handler(req, res) {
  const city = req.query.city;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!city) {
    return res.status(400).json({ message: 'City query parameter is required.' });
  }

  if (!apiKey) {
    return res.status(500).json({ message: 'Missing WEATHER_API_KEY environment variable.' });
  }

  const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(openWeatherUrl);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ message: data.message || 'Failed to fetch weather data.' });
    }

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: 'Weather service unavailable.' });
  }
}
