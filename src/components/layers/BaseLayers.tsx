import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";

export type MapStyle = "standard" | "satellite" | "terrain" | "dark";

export function createBaseLayers() {
  const standard = new TileLayer({
    source: new OSM(),
    visible: true,
  });

  const satellite = new TileLayer({
    source: new XYZ({
      url: `https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=${
        import.meta.env.VITE_MAPTILER_KEY
      }`,
      attributions:
        '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>',
    }),
    visible: false,
  });

  const terrain = new TileLayer({
    source: new XYZ({
      url: "https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png",
      attributions:
        'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
    }),
    visible: false,
  });

  const dark = new TileLayer({
    source: new XYZ({
      url: `https://api.maptiler.com/maps/dataviz-dark/{z}/{x}/{y}.png?key=${
        import.meta.env.VITE_MAPTILER_KEY
      }`,
      attributions:
        '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>',
    }),
    visible: false,
  });

  return {
    standard,
    satellite,
    terrain,
    dark,
  };
}
