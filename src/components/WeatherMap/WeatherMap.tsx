import { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";

import { createTornadoLayer } from "../layers/TornadoLayer";
import { getSinobasTornadoEvents } from "../../services/sinobasService";

import type { TornadoEvent } from "../../interfaces/TornadoEvent";
import TornadoInfoCard from "../cards/TornadoInfoCard";

import "./WeatherMap.css";

function WeatherMap() {
  const mapElement = useRef<HTMLDivElement>(null);

  const [selectedTornado, setSelectedTornado] = useState<TornadoEvent | null>(
    null,
  );

  useEffect(() => {
    const map = new Map({
      target: mapElement.current || undefined,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([10, 50]),
        zoom: 4,
      }),
    });
    map.on("singleclick", (event) => {
      const feature = map.forEachFeatureAtPixel(
        event.pixel,
        (feature) => feature,
      );

      if (!feature) {
        setSelectedTornado(null);
        return;
      }

      const tornadoEvent = feature.get("tornadoEvent") as
        | TornadoEvent
        | undefined;

      if (tornadoEvent) {
        setSelectedTornado(tornadoEvent);
      }
    });

    getSinobasTornadoEvents()
      .then((events) => {
        const tornadoLayer = createTornadoLayer(events);
        map.addLayer(tornadoLayer);
      })
      .catch((error) => {
        console.error("Failed to load tornado events:", error);
      });

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  return (
    <div className="weather-map-container">
      <div ref={mapElement} className="weather-map" />

      {selectedTornado && (
        <TornadoInfoCard
          event={selectedTornado}
          onClose={() => setSelectedTornado(null)}
        />
      )}
    </div>
  );
}

export default WeatherMap;
