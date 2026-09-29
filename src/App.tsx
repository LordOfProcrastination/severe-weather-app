import { Routes, Route, Navigate } from "react-router";

import Header from "./components/Header/Header";
import AboutPage from "./pages/AboutPage";
import SevereWeatherPage from "./pages/SevereWeatherPage";
import MapPage from "./pages/MapPage";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/severe-weather" element={<SevereWeatherPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
