import { useState } from "react";
import Home from "./components/Home";
import Weather from "./components/Weather";
import Traffic from "./components/Traffic";
import Food from "./components/Food";
import Alerts from "./components/Alerts";

function App() {
  const [page, setPage] = useState("home");
  const [city, setCity] = useState("Bengaluru");
  const [weatherData, setWeatherData] = useState(null);

  return (
    <div>
      {page === "home" && <Home setPage={setPage} />}
      {page === "weather" && <Weather setPage={setPage} />}
      {page === "traffic" && <Traffic setPage={setPage} />}
      {page === "food" && <Food setPage={setPage} city={city} weather={weatherData}/>}
      {page === "alerts" && <Alerts setPage={setPage} />}
    </div>
  );
}

export default App;
