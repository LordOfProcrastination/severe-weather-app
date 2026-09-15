import { useState } from "react";

import WeatherSystemSelector from "../components/SevereWeather/WeatherSystemSelector";
import SupercellVisualization from "../components/SevereWeather/SupercellVisualization";

import "../components/SevereWeather/SevereWeather.css";

export type WeatherSystem = "supercell" | "qlcs" | "landspout" | "waterspout";

function SevereWeatherPage() {
  const [selectedSystem, setSelectedSystem] =
    useState<WeatherSystem>("supercell");

  return (
    <main className="severe-weather-page">
      <section className="severe-weather-page__intro">
        <p className="severe-weather-page__eyebrow">Severe Weather</p>

        <h2>How tornado-producing storms develop</h2>

        <p>
          Explore some of the atmospheric setups capable of producing tornadoes.
          Each visualization shows the important ingredients and how they
          interact as the storm develops.
        </p>
      </section>

      <WeatherSystemSelector
        selectedSystem={selectedSystem}
        onSelect={setSelectedSystem}
      />

      <section className="severe-weather-page__visualization">
        {selectedSystem === "supercell" && <SupercellVisualization />}

        {selectedSystem === "qlcs" && (
          <div className="weather-placeholder">
            <h3>QLCS / Squall Line</h3>
            <p>Visualization coming next.</p>
          </div>
        )}

        {selectedSystem === "landspout" && (
          <div className="weather-placeholder">
            <h3>Landspout</h3>
            <p>Visualization coming next.</p>
          </div>
        )}

        {selectedSystem === "waterspout" && (
          <div className="weather-placeholder">
            <h3>Waterspout</h3>
            <p>Visualization coming next.</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default SevereWeatherPage;
