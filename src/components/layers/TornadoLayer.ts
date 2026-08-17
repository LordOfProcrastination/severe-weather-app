import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
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
    feature.setStyle(getTornadoStyle(event));

    return feature;
  });

  const source = new VectorSource({
    features,
  });

  return new VectorLayer({
    source,
  });
}
