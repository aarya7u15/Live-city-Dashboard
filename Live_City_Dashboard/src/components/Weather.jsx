import { useState, useEffect } from "react";

export default function Weather() {
  const [query, setQuery] = useState("Delhi");
  const [weather, setWeather] = useState(null);
  const [theme, setTheme] = useState("clear");
  const [dark, setDark] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "93faafa90b559a532a7c9b8b8da0a565";

  const themes = {
    clear: "from-sky-400 via-blue-500 to-blue-700",
    rain: "from-gray-700 via-gray-900 to-black",
    clouds: "from-gray-400 via-gray-500 to-gray-700",
  };

  const applyWeather = (data) => {
    setWeather(data);
    const main = data.weather[0].main.toLowerCase();
    setTheme(themes[main] ? main : "clear");
  };

  const getWeather = async (city) => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      const data = await res.json();

      if (data.cod !== 200) {
        setError("City not found");
        return;
      }

      applyWeather(data);
    } catch {
      setError("Error fetching weather");
    } finally {
      setLoading(false);
    }
  };

  const getLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );

      const data = await res.json();
      applyWeather(data);
    });
  };

  useEffect(() => {
    getLocationWeather();
  }, []);

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-all duration-700
      ${dark ? "text-white" : "text-black"}
      bg-gradient-to-br ${themes[theme]}`}
    >
      
      {theme === "rain" && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-6 bg-white/40 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${0.5 + Math.random()}s`,
              }}
            />
          ))}
        </div>
      )}

      
      <div className="absolute w-96 h-96 bg-white/20 blur-3xl rounded-full animate-pulse"></div>

      
      <div
        className={`relative w-full max-w-md p-8 rounded-3xl 
        ${dark ? "bg-white/10" : "bg-white/60"} 
        backdrop-blur-2xl shadow-2xl transition-all`}
      >

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setDark(!dark)}
            className="text-sm px-3 py-1 rounded-full bg-white/20 hover:scale-105 transition"
          >
            {dark ? "🌙 Dark" : "☀️ Light"}
          </button>

          <button
            onClick={getLocationWeather}
            className="text-sm underline hover:text-blue-300"
          >
            
          </button>
        </div>


        <div className="flex items-center bg-white/20 rounded-full px-3 py-2 mb-6 
        focus-within:ring-2 focus-within:ring-white/40 transition">
          <span className="px-2"></span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city..."
            className="flex-1 bg-transparent outline-none"
          />
          <button
            onClick={() => getWeather(query)}
            className="bg-white text-black px-4 py-1.5 rounded-full 
            hover:scale-105 transition"
          >
            Go
          </button>
        </div>

  
        {error && <p className="text-red-400">{error}</p>}
        {loading && <p className="animate-pulse">Loading...</p>}


        {weather && !loading && (
          <div className="text-center animate-fadeIn">
            <h2 className="opacity-70">{weather.name}</h2>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              className="mx-auto"
            />

            <h1 className="text-6xl font-bold">
              {Math.round(weather.main.temp)}°
            </h1>

            <p className="capitalize mb-6">
              {weather.weather[0].description}
            </p>

  
            <div className="grid grid-cols-2 gap-4">
              {[
                ["Humidity", `${weather.main.humidity}%`],
                ["Feels", `${Math.round(weather.main.feels_like)}°C`],
                ["Min", `${Math.round(weather.main.temp_min)}°C`],
                ["Max", `${Math.round(weather.main.temp_max)}°C`],
              ].map(([label, value], i) => (
                <div
                  key={i}
                  className="bg-white/10 p-4 rounded-xl 
                  hover:bg-white/20 hover:scale-105 transition"
                >
                  <div className="text-sm opacity-70">{label}</div>
                  <div className="text-lg font-bold">{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}