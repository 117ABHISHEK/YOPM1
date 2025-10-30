██████╗░██╗░░░██╗██████╗░███╗░░░███╗███╗░░░███╗  
██╔══██╗██║░░░██║██╔══██╗████╗░████║████╗░████║  
██████╦╝██║░░░██║██████╔╝██╔████╔██║██╔████╔██║  
██╔══██╗██║░░░██║██╔═══╝░██║╚██╔╝██║██║╚██╔╝██║  
██████╦╝╚██████╔╝██║░░░░░██║░╚═╝░██║██║░╚═╝░██║  
╚═════╝░░╚═════╝░╚═╝░░░░░╚═╝░░░░░╚═╝╚═╝░░░░░╚═╝

> > YOPM1 - Weather Forecast Web App  
> > Project #1 of the YearOfProjects ⚡

─────────────────────────────────────────────

🧠 ABOUT:
A minimal and responsive weather forecast app built with:

- HTML + CSS + Vanilla JavaScript
- OpenWeatherMap API (One Call 3.0)

─────────────────────────────────────────────

⚙️ FEATURES:

 ✅ Search weather by city  
 ✅ Shows temperature, humidity, wind  
 ✅ Clean, responsive UI (Bootstrap-ready)  
 ✅ Ready for dark mode integration

─────────────────────────────────────────────

📁 PROJECT STRUCTURE:

/YOPM1
├── public/
│   ├── index.css        # Custom styling
│   ├── index.js         # Weather logic + API calls
│   └── config.js        # Configuration settings
├── index.html           # Main webpage layout
├── .gitignore          # Git ignore configuration
└── README.md           # This file

─────────────────────────────────────────────

🔐 SETUP INSTRUCTIONS:

1. Go to 👉 https://openweathermap.org/api
2. Create an account → get your **free API key**

For Local Development:
3. Create a `.env` file in the root directory:
   ```env
   WEATHER_API_KEY=your_api_key_here
   WEATHER_API_BASE_URL=https://api.openweathermap.org/data/2.5
   WEATHER_API_UNITS=metric
   ```

For Vercel Deployment:
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Set up environment variables in Vercel Dashboard:
   - Go to your project settings
   - Add the following environment variables:
     - `WEATHER_API_KEY`
     - `WEATHER_API_BASE_URL`
     - `WEATHER_API_UNITS`
4. Deploy with: `vercel --prod`

4. Open `index.html` in your browser (use a local server due to ES modules)
5. Forecast ready! ☀️🌧️🌪️

Note: Due to ES modules, you'll need to serve the files through a local web server.
Quick start with Python:
```bash
# Python 3
python -m http.server 8080
# Then open http://localhost:8080 in your browser
```

─────────────────────────────────────────────

🧪 TECH STACK:

🧱 HTML5  
 🎨 CSS3 (with Bootstrap-ready structure)  
 ⚙️ JavaScript (no frameworks)  
 ☁️ OpenWeatherMap API (One Call 3.0)

─────────────────────────────────────────────

🧾 LICENSE:

MIT License © 2025 [117ABHISHEK](https://github.com/117ABHISHEK) & [ShitalPanhalkar1015](https://github.com/ShitalPanhalkar1015)

─────────────────────────────────────────────

🤝 CREDITS:

👨‍💻 Developed by:

- [117ABHISHEK](https://github.com/117ABHISHEK)
- [ShitalPanhalkar1015](https://github.com/ShitalPanhalkar1015)
  
─────────────────────────────────────────────

⭐ SUPPORT:

If you like this project:

⭐ Star it  
 🍴 Fork it  
 🧑‍💻 Follow [@117ABHISHEK](https://github.com/117ABHISHEK) &
👩‍💻 Follow [ShitalPanhalkar1015](https://github.com/ShitalPanhalkar1015)

─────────────────────────────────────────────

#Next: 🛠️ YOPM2 loading...
