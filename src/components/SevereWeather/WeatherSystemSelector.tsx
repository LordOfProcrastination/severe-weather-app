import type { WeatherSystem } from "../../pages/SevereWeatherPage";

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
    id: "qlcs",
    title: "QLCS",
    description:
      "A line of thunderstorms where small areas of rotation can sometimes produce tornadoes.",
  },
  {
    id: "landspout",
    title: "Landspout",
    description:
      "A tornado that develops from rotation near the ground rather than from a rotating mesocyclone.",
  },
  {
    id: "waterspout",
    title: "Waterspout",
    description: "A rotating column of air that develops over water.",
  },
];

function WeatherSystemSelector({
  selectedSystem,
  onSelect,
}: WeatherSystemSelectorProps) {
  return (
    <section className="weather-system-selector">
      {systems.map((system) => (
        <button
          key={system.id}
          className={`weather-system-card ${
            selectedSystem === system.id ? "weather-system-card--active" : ""
          }`}
          onClick={() => onSelect(system.id)}
        >
          <strong>{system.title}</strong>
          <span>{system.description}</span>
        </button>
      ))}
    </section>
  );
}

export default WeatherSystemSelector;
