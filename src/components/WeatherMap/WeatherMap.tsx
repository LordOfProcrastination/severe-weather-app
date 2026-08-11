import { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";

import "./WeatherMap.css";

function WeatherMap() {
  const mapElement = useRef<HTMLDivElement>(null);

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

    return () => {
      map.setTarget(undefined);
    };
  }, []);
  return <div ref={mapElement} className="weather-map" />;
}

export default WeatherMap;
