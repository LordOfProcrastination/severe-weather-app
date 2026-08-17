import WeatherMap from "../components/WeatherMap/WeatherMap";

import { useEffect } from "react";
import { getSinobasTornadoEvents } from "../services/sinobasService";

function MapPage() {
  useEffect(() => {
    getSinobasTornadoEvents()
      .then((events) => {
        console.log("SINOBAS tornado events:", events);
      })
      .catch((error) => {
        console.error("Failed to load SINOBAS events:", error);
      });
  }, []);
  return (
    <main>
      <h2>Severe Weather Map</h2>
      <WeatherMap />
    </main>
  );
}

export default MapPage;
