import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Cluster from "ol/source/Cluster";

import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import CircleStyle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Text from "ol/style/Text";

import { fromLonLat } from "ol/proj";

import type { TornadoEvent } from "../../interfaces/TornadoEvent";

function getTornadoStyle(event: TornadoEvent, hovered = false) {
  const baseUrl = import.meta.env.BASE_URL;

  const iconSrc =
    event.vortexType === "Tromba Marina"
      ? `${baseUrl}icons/waterspout.png`
      : `${baseUrl}icons/hurricane.png`;

  const opacity = hovered ? 0.6 : 1;

  return [
    new Style({
      image: new CircleStyle({
        radius: 14,
        fill: new Fill({
          color: hovered
            ? "rgba(255, 255, 255, 0.55)"
            : "rgba(255, 255, 255, 0.8)",
        }),
        stroke: new Stroke({
          color: "rgba(38, 55, 70, 0.8)",
          width: 1.5,
        }),
      }),
    }),

    new Style({
      image: new Icon({
        src: iconSrc,
        scale: 0.05,
        opacity,
      }),
    }),
  ];
}

export function createTornadoLayer(events: TornadoEvent[]) {
  const features = events.map((event) => {
    const feature = new Feature({
      geometry: new Point(fromLonLat([event.longitude, event.latitude])),
    });

    feature.set("tornadoEvent", event);

    return feature;
  });

  const source = new VectorSource({
    features,
  });

  const clusterSource = new Cluster({
    distance: 40,
    source,
  });

  return new VectorLayer({
    source: clusterSource,

    style: (feature) => {
      const clusteredFeatures = feature.get("features") as Feature[];
      const size = clusteredFeatures.length;

      const hovered = feature.get("hovered") === true;

      if (size === 1) {
        const tornadoEvent = clusteredFeatures[0].get(
          "tornadoEvent",
        ) as TornadoEvent;

        return getTornadoStyle(tornadoEvent, hovered);
      }

      return new Style({
        image: new CircleStyle({
          radius: 18,
          fill: new Fill({
            color: hovered ? "rgba(38, 55, 70, 0.6)" : "rgba(38, 55, 70, 1)",
          }),
          stroke: new Stroke({
            color: "#ffffff",
            width: 2,
          }),
        }),

        text: new Text({
          text: size.toString(),
          fill: new Fill({
            color: "#ffffff",
          }),
        }),
      });
    },
  });
}
