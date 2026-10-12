import { Link } from "react-router";
import WeatherMap from "../components/WeatherMap/WeatherMap";
import "./MapPage.css";

function MapPage() {
  return (
    <main className="map-page">
      <header className="map-page__intro">
        <div>
          <p className="map-page__eyebrow">Explore the record</p>
          <h2>Severe weather, on the map.</h2>
          <p>Discover historical tornado and waterspout reports, one location at a time.</p>
        </div>
        <Link className="map-page__learn" to="/severe-weather">Understand the science <span aria-hidden="true">↗</span></Link>
      </header>
      <WeatherMap />
      <footer className="map-page__notes">
        <div>
          <h3>A growing European picture</h3>
          <p>Current coverage: Spain, using AEMET SINOBAS reports. Additional European datasets are planned.</p>
        </div>
        <div>
          <h3>Reports, not a forecast</h3>
          <p>This historical record is incomplete and reflects where events have been observed and reported. It is not a live warning service.</p>
        </div>
      </footer>
    </main>
  );
}

export default MapPage;
