import "./TornadoClusterCard.css";
import "../../styles/global.css";

import type { TornadoEvent } from "../../interfaces/TornadoEvent";

interface TornadoClusterCardProps {
  events: TornadoEvent[];
  onClose: () => void;
  onSelect: (event: TornadoEvent) => void;
}

function TornadoClusterCard({
  events,
  onClose,
  onSelect,
}: TornadoClusterCardProps) {
  return (
    <div className="weather-card tornado-cluster-card">
      <button className="weather-card_close" onClick={onClose}>
        ×
      </button>

      <h3>{events.length} tornado events</h3>

      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <button
              className="tornado-cluster-card__event"
              onClick={() => onSelect(event)}
            >
              {event.date} — {event.vortexType}
              <br />
              {event.locality}, {event.province}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TornadoClusterCard;
