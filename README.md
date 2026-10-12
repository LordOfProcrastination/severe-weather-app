# severe-weather

## Educational pages

The Severe Weather section includes the original Supercell visualization and
four topic pages with numbered SVG stages, Previous/Next controls, explanatory
sections, and meteorological source links:

- `#/severe-weather/tornadoes` — formation, storm types, lifecycle and EF ratings.
- `#/severe-weather/thunderstorms` — ingredients, lifecycle, lightning and hazards.
- `#/severe-weather/waterspout` — formation pathways, structure and European occurrence.
- `#/severe-weather/europe` — seasonal ingredients, geography and reporting limitations.

The educational components are organized by responsibility:

```text
src/components/SevereWeather/
  data/         # One content file per topic and the weatherTopics registry
  diagrams/     # Topic SVG diagrams, shared drawing primitives and diagram CSS
  selector/     # Topic selection component and its CSS
  shared/       # Common visualization, stage control and SVG styles
  supercell/    # Original D3 visualization and its specific CSS
  topics/       # Shared educational page component and its CSS
  types.ts      # Shared topic, stage and selection types
```

Each component imports its own styles and the shared styles it needs. Responsive
and reduced-motion rules live with the components they affect. The route-level
layout styles are in `src/pages/SevereWeatherPage.css`, next to the page component.

`topics/WeatherTopicPage.tsx` shares the existing Supercell layout and controls,
and `diagrams/TopicDiagram.tsx` composes the individual topic illustrations.
All five topics use `shared/WeatherInformation.tsx` for their supporting sections
and source links. Supercell-specific reading lives in `data/supercell.ts` and
complements its formation stages with cloud structure, storm appearances and radar interpretation.
The illustrations are conceptual, not simulations or forecasts.
New animations respect reduced-motion settings. On small screens the diagrams
scroll horizontally to keep labels legible, with equivalent stage descriptions
below. The existing Supercell visualization is unchanged.

Run `npm run dev` for local development and `npm run build` for the TypeScript
check and production build. Routing uses hashes for GitHub Pages compatibility.

https://lordofprocrastination.github.io/severe-weather-app/

## Map explorer

The map includes a report count, map-style selector, Spain and Europe view
controls, a marker legend, and a searchable report list. Selecting a marker or
list entry opens its details inside the map; Escape closes the panel. The map
itself supports keyboard panning and zooming when focused.

Report loading failures offer a retry, and background-map failures offer a
Standard-map fallback. Satellite and Dark use the existing `VITE_MAPTILER_KEY`
configuration and require access to the configured MapTiler styles.

## About page and CV

The existing About navigation opens the project story and developer profile.
`src/components/About/CvViewer.tsx` embeds the original CV in a native modal
dialog, with download and new-tab links for browsers without embedded PDF support.
The PDF is stored at `public/documents/Oppdatert_CV.pdf`; replace that file to
update the CV. Its URL uses Vite's `BASE_URL`, so no additional configuration is
needed for the existing GitHub Pages subpath.

## Data Sources

### AEMET SINOBAS

Spanish tornado and waterspout data used in this project is sourced from
AEMET's SINOBAS (Sistema de Notificación de Observaciones Atmosféricas Singulares).

AEMET authorizes the use and reproduction of this information when AEMET is
credited as the author.

The SINOBAS data shown in this project is used for educational and
visualization purposes only and is not intended for administrative or legal use.

The original SINOBAS data is normalized into a common tornado event format so
that additional European data sources can be added in the future.

Source: AEMET SINOBAS
