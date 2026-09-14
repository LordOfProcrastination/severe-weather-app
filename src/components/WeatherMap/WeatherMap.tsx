import { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import { fromLonLat } from "ol/proj";

import { createTornadoLayer } from "../layers/TornadoLayer";
import { getSinobasTornadoEvents } from "../../services/sinobasService";

import type { TornadoEvent } from "../../interfaces/TornadoEvent";
import TornadoInfoCard from "../cards/TornadoInfoCard";
import TornadoClusterCard from "../cards/TornadoClusterCard";
import MapStyleSelector from "./MapStyleSelector";

import "./WeatherMap.css";
import { Feature } from "ol";
import { createBaseLayers, MapStyle } from "../layers/BaseLayers";

function WeatherMap() {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);

  const [mapStyle, setMapStyle] = useState<MapStyle>("standard");

  const [selectedTornado, setSelectedTornado] = useState<TornadoEvent | null>(
    null,
  );

  const [selectedCluster, setSelectedCluster] = useState<TornadoEvent[] | null>(
    null,
  );

  const baseLayersRef = useRef<ReturnType<typeof createBaseLayers> | null>(
    null,
  );

  useEffect(() => {
    const baseLayers = createBaseLayers();

    baseLayersRef.current = baseLayers;
    const map = new Map({
      target: mapElement.current || undefined,

      layers: [
        baseLayers.standard,
        baseLayers.satellite,
        baseLayers.terrain,
        baseLayers.dark,
      ],
      view: new View({
        center: fromLonLat([10, 50]),
        zoom: 4,
      }),
    });

    mapRef.current = map;
    map.on("singleclick", (event) => {
      const feature = map.forEachFeatureAtPixel(
        event.pixel,
        (feature) => feature,
      );

      if (!feature) {
        setSelectedTornado(null);
        setSelectedCluster(null);
        return;
      }

      const clusteredFeatures = feature.get("features") as
        | Feature[]
        | undefined;

      if (!clusteredFeatures) {
        setSelectedTornado(null);
        setSelectedCluster(null);
        return;
      }

      const tornadoEvents = clusteredFeatures
        .map((feature) => feature.get("tornadoEvent") as TornadoEvent)
        .filter(Boolean);

      if (tornadoEvents.length === 1) {
        setSelectedCluster(null);
        setSelectedTornado(tornadoEvents[0]);
      } else {
        setSelectedTornado(null);
        setSelectedCluster(tornadoEvents);
      }
    });

    let hoveredFeature: Feature | null = null;

    map.on("pointermove", (event) => {
      const feature = map.forEachFeatureAtPixel(
        event.pixel,
        (feature) => feature as Feature,
      );

      if (hoveredFeature && hoveredFeature !== feature) {
        hoveredFeature.set("hovered", false);
        hoveredFeature.changed();
      }

      if (feature && feature !== hoveredFeature) {
        feature.set("hovered", true);
        feature.changed();
      }

      hoveredFeature = feature ?? null;

      map.getTargetElement().style.cursor = feature ? "pointer" : "";
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
      mapRef.current = null;
    };
  }, []);
  useEffect(() => {
    const baseLayers = baseLayersRef.current;

    if (!baseLayers) {
      return;
    }

    baseLayers.standard.setVisible(mapStyle === "standard");
    baseLayers.satellite.setVisible(mapStyle === "satellite");
    baseLayers.terrain.setVisible(mapStyle === "terrain");
    baseLayers.dark.setVisible(mapStyle === "dark");
  }, [mapStyle]);

  return (
    <div className="weather-map-container">
      <MapStyleSelector value={mapStyle} onChange={setMapStyle} />
      <div ref={mapElement} className="weather-map" />

      {selectedTornado && (
        <TornadoInfoCard
          event={selectedTornado}
          onClose={() => setSelectedTornado(null)}
        />
      )}

      {selectedCluster && (
        <TornadoClusterCard
          events={selectedCluster}
          onClose={() => setSelectedCluster(null)}
          onSelect={(event) => {
            setSelectedCluster(null);
            setSelectedTornado(event);

            mapRef.current?.getView().animate({
              center: fromLonLat([event.longitude, event.latitude]),
              zoom: 10,
              duration: 700,
            });
          }}
        />
      )}
    </div>
  );
}

export default WeatherMap;
