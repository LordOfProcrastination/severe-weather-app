import { useEffect, useRef, useState } from "react";
import type { TornadoEvent } from "../../interfaces/TornadoEvent";
import "./WeatherCard.css";
import "./TornadoClusterCard.css";

interface TornadoClusterCardProps {
  events: TornadoEvent[];
  onClose: () => void;
  onSelect: (event: TornadoEvent) => void;
}

function TornadoClusterCard({ events, onClose, onSelect }: TornadoClusterCardProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(50);
  useEffect(() => {
    setQuery("");
    setVisibleCount(50);
    titleRef.current?.focus({ preventScroll: true });
  }, [events]);
  const matches = events.filter(event => [event.date, event.locality, event.province, event.vortexType,
    event.vortexType === "Tromba Marina" ? "Waterspout" : "Tornado"].join(" ").toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));

  return (
    <section className="weather-card tornado-cluster-card" aria-labelledby="cluster-title">
      <div className="weather-card__header">
        <p className="weather-card__eyebrow">Explore the record</p>
        <button className="weather-card_close" onClick={onClose} aria-label="Close report list">×</button>
      </div>
      <h3 id="cluster-title" tabIndex={-1} ref={titleRef}>{events.length.toLocaleString("en-GB")} event reports</h3>
      <p className="tornado-cluster-card__hint">Choose a report to see its location and details.</p>
      <label className="tornado-cluster-card__search-label" htmlFor="report-search">Find a report</label>
      <input id="report-search" type="search" value={query} placeholder="Place, date or event type" onChange={event => { setQuery(event.target.value); setVisibleCount(50); }} />
      <p className="tornado-cluster-card__count" role="status">{matches.length === 0 ? "No matching reports. Try another search." : `Showing ${Math.min(visibleCount, matches.length)} of ${matches.length.toLocaleString("en-GB")} reports`}</p>
      <ul>
        {matches.slice(0, visibleCount).map(event => (
          <li key={event.id}>
            <button className="tornado-cluster-card__event" onClick={() => onSelect(event)}>
              <span className="tornado-cluster-card__event-top"><strong>{event.vortexType === "Tromba Marina" ? "Waterspout" : "Tornado"}</strong><span>{event.date}</span></span>
              <span className="tornado-cluster-card__place">{[event.locality, event.province].filter(Boolean).join(", ") || event.country}<span aria-hidden="true"> →</span></span>
            </button>
          </li>
        ))}
      </ul>
      {visibleCount < matches.length && <button className="weather-map__button tornado-cluster-card__more" onClick={() => setVisibleCount(value => value + 50)}>Show more reports</button>}
    </section>
  );
}

export default TornadoClusterCard;
