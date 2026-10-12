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

import "ol/ol.css";
import "./WeatherMap.css";
import { Feature } from "ol";
import { createBaseLayers, type MapStyle } from "../layers/BaseLayers";

function WeatherMap() {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const reportsRef = useRef<TornadoEvent[]>([]);
  const [reportCount, setReportCount] = useState(0);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">("loading");
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [tileErrors, setTileErrors] = useState<Partial<Record<MapStyle, boolean>>>({});

  const [mapStyle, setMapStyle] = useState<MapStyle>("standard");
  const tileError = Boolean(tileErrors[mapStyle]);

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
    let active = true;
    setLoadState("loading");
    setTileErrors({});
    setReportCount(0);
    setSelectedTornado(null);
    setSelectedCluster(null);
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
        if (!active) return;
        reportsRef.current = events;
        setReportCount(events.length);
        setLoadState("ready");
        const tornadoLayer = createTornadoLayer(events);
        map.addLayer(tornadoLayer);
      })
      .catch(() => {
        if (active) setLoadState("error");
      });

    return () => {
      active = false;
      map.dispose();
      mapRef.current = null;
    };
  }, [loadAttempt]);
  useEffect(() => {
    const baseLayers = baseLayersRef.current;

    if (!baseLayers) {
      return;
    }

    baseLayers.standard.setVisible(mapStyle === "standard");
    baseLayers.satellite.setVisible(mapStyle === "satellite");
    baseLayers.terrain.setVisible(mapStyle === "terrain");
    baseLayers.dark.setVisible(mapStyle === "dark");
    const source = baseLayers[mapStyle].getSource();
    const handleTileError = () => setTileErrors(errors => ({ ...errors, [mapStyle]: true }));
    source?.on("tileloaderror", handleTileError);
    return () => source?.un("tileloaderror", handleTileError);
  }, [mapStyle, loadAttempt]);

  function closeDetails() {
    setSelectedTornado(null);
    setSelectedCluster(null);
    mapElement.current?.focus({ preventScroll: true });
  }

  function goToRegion(region: "europe" | "spain") {
    setSelectedTornado(null);
    setSelectedCluster(null);
    mapRef.current?.getView().animate({
      center: fromLonLat(region === "spain" ? [-3, 40] : [10, 50]),
      zoom: region === "spain" ? 5.5 : 4,
      rotation: 0,
      duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 500,
    });
  }

  return (
    <div className="weather-map-container">
      <div className="weather-map__toolbar">
        <div className="weather-map__dataset">
          <h3>Historical reports</h3>
          <p role="status">{loadState === "loading" ? "Loading the record…" : loadState === "error" ? "Reports unavailable" : `${reportCount.toLocaleString("en-GB")} reports`}<span aria-hidden="true"> · </span>Spain</p>
        </div>
        <div className="weather-map__tools">
          <button className="weather-map__button" onClick={() => goToRegion("spain")}>View Spain</button>
          <button className="weather-map__button" onClick={() => goToRegion("europe")}>Reset view</button>
          <MapStyleSelector value={mapStyle} onChange={setMapStyle} />
        </div>
      </div>
      {tileError && <div className="weather-map__tile-error" role="status">
        <p>The background map couldn’t load. Try another style or check your connection.</p>
        <button className="weather-map__button" onClick={() => {
          if (mapStyle !== "standard") setMapStyle("standard");
          else {
            setTileErrors(errors => ({ ...errors, standard: false }));
            baseLayersRef.current?.standard.getSource()?.refresh();
          }
        }}>{mapStyle === "standard" ? "Retry map" : "Use standard map"}</button>
      </div>}
      <div className="weather-map__canvas" onKeyDown={(event) => {
        if (event.key === "Escape" && (selectedTornado || selectedCluster)) {
          event.stopPropagation();
          closeDetails();
        }
      }}>
        <div ref={mapElement} className="weather-map" tabIndex={0} role="region" aria-label="Historical tornado and waterspout map" aria-describedby="map-instructions" />
        {loadState !== "ready" && <div className="weather-map__message" role={loadState === "error" ? "alert" : "status"}>
          <strong>{loadState === "loading" ? "Loading historical reports…" : "The reports couldn’t be loaded"}</strong>
          <p>{loadState === "loading" ? "Preparing the AEMET SINOBAS dataset." : "Try loading the dataset again."}</p>
          {loadState === "error" && <button className="weather-map__button" onClick={() => setLoadAttempt(value => value + 1)}>Try again</button>}
        </div>}
        {loadState === "ready" && reportCount === 0 && <div className="weather-map__message" role="status"><strong>No reports available</strong><p>The current dataset has no tornado or waterspout reports.</p></div>}

      {selectedTornado && (
        <TornadoInfoCard
          event={selectedTornado}
          onClose={closeDetails}
        />
      )}

      {selectedCluster && (
        <TornadoClusterCard
          events={selectedCluster}
          onClose={closeDetails}
          onSelect={(event) => {
            setSelectedCluster(null);
            setSelectedTornado(event);

            mapRef.current?.getView().animate({
              center: fromLonLat([event.longitude, event.latitude]),
              zoom: 10,
              duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 700,
            });
          }}
        />
      )}
      </div>
      <div className="weather-map__legend" aria-label="Map legend">
        <ul>
          <li><img src={`${import.meta.env.BASE_URL}icons/hurricane.png`} alt="" />Tornado</li>
          <li><img src={`${import.meta.env.BASE_URL}icons/waterspout.png`} alt="" />Waterspout</li>
          <li><span className="weather-map__cluster-key" aria-hidden="true">3</span>Grouped reports</li>
        </ul>
        <button className="weather-map__browse" disabled={loadState !== "ready" || reportCount === 0} onClick={() => {
          setSelectedTornado(null);
          setSelectedCluster(reportsRef.current);
        }}>Browse all reports <span aria-hidden="true">→</span></button>
      </div>
      <div className="weather-map__footer">
        <p id="map-instructions">Select a marker to explore reports. Zoom to separate groups. Use arrow keys to pan and + / − to zoom when the map has focus.</p>
        <span>Data: AEMET SINOBAS</span>
      </div>
    </div>
  );
}

export default WeatherMap;
