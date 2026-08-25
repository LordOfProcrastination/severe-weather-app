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

function getTornadoStyle(event: TornadoEvent) {
  const iconSrc =
    event.vortexType === "Tromba Marina"
      ? "/icons/waterspout.png"
      : "/icons/hurricane.png";

  return new Style({
    image: new Icon({
      src: iconSrc,
      scale: 0.05,
    }),
  });
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

      if (size === 1) {
        const tornadoEvent = clusteredFeatures[0].get(
          "tornadoEvent",
        ) as TornadoEvent;

        return getTornadoStyle(tornadoEvent);
      }

      return new Style({
        image: new CircleStyle({
          radius: 18,
          fill: new Fill({
            color: "#263746",
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
