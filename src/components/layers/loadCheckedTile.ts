import ImageTile from "ol/ImageTile";
import TileState from "ol/TileState";
import type { LoadFunction } from "ol/Tile";

// Some providers return a valid error image with HTTP 403. Checking the response
// prevents that image from being treated as a successfully loaded map tile.
export const loadCheckedTile: LoadFunction = (tile, url) => {
  if (!(tile instanceof ImageTile)) {
    tile.setState(TileState.ERROR);
    return;
  }

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Map tile unavailable");
      return response.blob();
    })
    .then(blob => {
      const objectUrl = URL.createObjectURL(blob);
      const image = new Image();
      const release = () => {
        URL.revokeObjectURL(objectUrl);
        image.onload = null;
        image.onerror = null;
      };
      image.onload = () => {
        release();
        tile.setImage(image);
      };
      image.onerror = () => {
        release();
        tile.setState(TileState.ERROR);
      };
      image.src = objectUrl;
    })
    .catch(() => tile.setState(TileState.ERROR));
};
