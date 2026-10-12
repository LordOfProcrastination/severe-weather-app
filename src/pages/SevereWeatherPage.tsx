import { Navigate, useNavigate, useParams } from "react-router";

import WeatherSystemSelector from "../components/SevereWeather/selector/WeatherSystemSelector";
import SupercellVisualization from "../components/SevereWeather/supercell/SupercellVisualization";
import WeatherTopicPage from "../components/SevereWeather/topics/WeatherTopicPage";
import { weatherTopics } from "../components/SevereWeather/data/weatherTopics";
import type { WeatherSystem } from "../components/SevereWeather/types";

import "./SevereWeatherPage.css";

function SevereWeatherPage() {
  const { topic } = useParams();
  const navigate = useNavigate();
  if (topic && topic !== "supercell" && !Object.prototype.hasOwnProperty.call(weatherTopics, topic)) {
    return <Navigate to="/severe-weather" replace />;
  }
  const selectedSystem = (topic || "supercell") as WeatherSystem;

  return (
    <main className="severe-weather-page">
      <section className="severe-weather-page__intro">
        <p className="severe-weather-page__eyebrow">Severe Weather</p>

        <h2>{selectedSystem === "supercell" ? "How tornado-producing storms develop" : weatherTopics[selectedSystem].title}</h2>

        <p>
          {selectedSystem === "supercell" ? "Explore some of the atmospheric setups capable of producing tornadoes. Each visualization shows the important ingredients and how they interact as the storm develops." : "Explore the atmospheric ingredients, follow the interactive stages, and discover the science behind severe weather."}
        </p>
      </section>

      <WeatherSystemSelector
        selectedSystem={selectedSystem}
        onSelect={(system) => navigate(system === "supercell" ? "/severe-weather" : `/severe-weather/${system}`)}
      />

      <section className="severe-weather-page__visualization">
        {selectedSystem === "supercell" && <SupercellVisualization />}

        {selectedSystem !== "supercell" && <WeatherTopicPage key={selectedSystem} topic={selectedSystem} />}
      </section>
    </main>
  );
}

export default SevereWeatherPage;
