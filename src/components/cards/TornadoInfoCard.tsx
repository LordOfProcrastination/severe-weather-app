import "./TornadoInfoCard.css";

import type { TornadoEvent } from "../../interfaces/TornadoEvent";

interface TornadoInfoCardProps {
  event: TornadoEvent;
  onClose: () => void;
}

function TornadoInfoCard({ event, onClose }: TornadoInfoCardProps) {
  return (
    <div className="tornado-info-card">
      <button
        className="tornado-info-card__close"
        onClick={onClose}
        aria-label="Close tornado details"
      >
        ×
      </button>

      <h3>{event.vortexType === "Tromba Marina" ? "Waterspout" : "Tornado"}</h3>

      <p>
        {event.locality && `${event.locality}, `}
        {event.province}
      </p>

      <p>
        <strong>Date:</strong> {event.date}
      </p>

      {event.time && (
        <p>
          <strong>Time:</strong> {event.time}
        </p>
      )}

      {event.intensity && (
        <p>
          <strong>Intensity:</strong> {event.intensity}
        </p>
      )}

      {event.reliability && (
        <p>
          <strong>Reliability:</strong> {event.reliability}
        </p>
      )}

      {event.injuries !== undefined && (
        <p>
          <strong>Injuries:</strong> {event.injuries}
        </p>
      )}

      {event.fatalities !== undefined && (
        <p>
          <strong>Fatalities:</strong> {event.fatalities}
        </p>
      )}

      {event.description && (
        <>
          <p>
            <strong>Description:</strong> {event.description}
          </p>

          {event.descriptionLanguage && (
            <p className="tornado-info-card__language">
              Original language: {event.descriptionLanguage}
            </p>
          )}
        </>
      )}

      <a href={event.sourceUrl} target="_blank" rel="noopener noreferrer">
        View source at AEMET SINOBAS
      </a>
    </div>
  );
}

export default TornadoInfoCard;
