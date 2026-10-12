import { useEffect, useRef } from "react";
import type { TornadoEvent } from "../../interfaces/TornadoEvent";
import "./WeatherCard.css";
import "./TornadoInfoCard.css";

interface TornadoInfoCardProps {
  event: TornadoEvent;
  onClose: () => void;
}

function TornadoInfoCard({ event, onClose }: TornadoInfoCardProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => { titleRef.current?.focus({ preventScroll: true }); }, [event]);
  const details = [
    ["Date", event.date], ["Time", event.time], ["Intensity", event.intensity],
    ["Reliability", event.reliability], ["Injuries", event.injuries], ["Fatalities", event.fatalities],
  ].filter(([, value]) => value !== undefined && value !== "");

  return (
    <section className="weather-card tornado-info-card" aria-labelledby="report-title">
      <div className="weather-card__header">
        <p className="weather-card__eyebrow">Event report</p>
        <button className="weather-card_close" onClick={onClose} aria-label="Close tornado details">×</button>
      </div>
      <h3 id="report-title" tabIndex={-1} ref={titleRef}>{event.vortexType === "Tromba Marina" ? "Waterspout" : "Tornado"}</h3>
      <p className="tornado-info-card__location">{[event.locality, event.province, event.country].filter(Boolean).join(", ")}</p>
      <dl className="tornado-info-card__details">
        {details.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
      </dl>
      {event.description && <div className="tornado-info-card__description">
        <h4>Reported observations</h4>
        {event.descriptionLanguage && <p className="tornado-info-card__language">Original language: {event.descriptionLanguage}</p>}
        <p>{event.description}</p>
      </div>}
      <a className="tornado-info-card__source" href={event.sourceUrl} target="_blank" rel="noopener noreferrer">View AEMET SINOBAS source <span aria-hidden="true">↗</span></a>
    </section>
  );
}

export default TornadoInfoCard;
