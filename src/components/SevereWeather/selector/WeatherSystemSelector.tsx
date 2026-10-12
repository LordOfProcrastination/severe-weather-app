import type { WeatherSystem } from "../types";
import "./WeatherSystemSelector.css";

interface WeatherSystemSelectorProps {
  selectedSystem: WeatherSystem;
  onSelect: (system: WeatherSystem) => void;
}

const systems: {
  id: WeatherSystem;
  title: string;
  description: string;
}[] = [
  {
    id: "supercell",
    title: "Supercell",
    description:
      "A rotating thunderstorm capable of producing strong and violent tornadoes.",
  },
  {
    id: "tornadoes",
    title: "Tornadoes",
    description:
      "Formation, lifecycle and damage ratings, from supercells to landspouts and squall lines.",
  },
  {
    id: "thunderstorms",
    title: "Thunderstorms",
    description:
      "Moisture, instability and lift: follow the lifecycle of a thunderstorm.",
  },
  {
    id: "waterspout",
    title: "Waterspout",
    description: "A rotating column of air that develops over water.",
  },
  {
    id: "europe",
    title: "Severe Weather in Europe",
    description: "Seasonal patterns, geography and what historical reports can tell us.",
  },
];

function WeatherSystemSelector({
  selectedSystem,
  onSelect,
}: WeatherSystemSelectorProps) {
  return (
    <section className="weather-system-selector" aria-label="Severe weather topics">
      {systems.map((system) => (
        <button
          key={system.id}
          className={`weather-system-card ${
            selectedSystem === system.id ? "weather-system-card--active" : ""
          }`}
          onClick={() => onSelect(system.id)}
          aria-pressed={selectedSystem === system.id}
        >
          <strong>{system.title}</strong>
          <span>{system.description}</span>
        </button>
      ))}
    </section>
  );
}

export default WeatherSystemSelector;
