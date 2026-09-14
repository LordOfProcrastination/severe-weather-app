import type { MapStyle } from "../layers/BaseLayers";

import "./MapStyleSelector.css";

interface MapStyleSelectorProps {
  value: MapStyle;
  onChange: (style: MapStyle) => void;
}

function MapStyleSelector({ value, onChange }: MapStyleSelectorProps) {
  return (
    <div className="map-style-selector">
      <label htmlFor="map-style">Map style</label>

      <select
        id="map-style"
        value={value}
        onChange={(event) => onChange(event.target.value as MapStyle)}
      >
        <option value="standard">Standard</option>
        <option value="satellite">Satellite</option>
        <option value="terrain">Terrain</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}

export default MapStyleSelector;
