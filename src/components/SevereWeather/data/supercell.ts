import type { WeatherTopic } from "../types";

// Complements the formation stages; tornado mechanics and ratings belong to the tornado page.
const supercellInformation: Pick<WeatherTopic, "sections" | "sources"> = {
  sections: [
    {
      title: "Reading the cloud structure",
      paragraphs: [
        "The spreading anvil marks where rising cloudy air spreads outward near the top of the storm. A dome protruding above it, called an overshooting top, can indicate a vigorous updraft. These features also occur in other strong thunderstorms; they do not identify a supercell on their own.",
        "A wall cloud is a localized lowering beneath the main cloud base near the updraft. It can form as rain-cooled, moist air is drawn upward and condenses at a lower height. It is different from the broad shelf cloud commonly found along an advancing gust front. Neither feature alone confirms a tornado.",
      ],
    },
    {
      title: "One storm type, different appearances",
      paragraphs: [
        "Supercells are often described as low-precipitation (LP), classic, or high-precipitation (HP), according to the amount and arrangement of precipitation around the updraft. An LP storm may reveal a sculpted cloud tower, while a classic storm has a more distinct precipitation core beside its updraft.",
        "In an HP supercell, heavy precipitation can wrap around and obscure the low-level circulation. These descriptions are not intensity ratings or successive lifecycle stages. A storm can change appearance, and a clearer view beneath its cloud does not imply weaker winds or smaller hail.",
      ],
    },
    {
      title: "What radar adds to the picture",
      paragraphs: [
        "Radar reflectivity shows the distribution of precipitation. A hook-shaped echo can appear when precipitation wraps around the rotating updraft. Doppler velocity provides a different clue: nearby areas of air moving toward and away from the radar can reveal rotation within the storm.",
        "A hook echo or a radar-detected mesocyclone does not, by itself, establish that a tornado is on the ground. Radar samples air above the surface, and its view depends on distance and beam height. Forecasters combine radar signatures with environmental data and reliable observations.",
      ],
    },
    {
      title: "How to interpret this illustration",
      paragraphs: [
        "The diagram separates processes into steps so they are easier to follow. In a real storm, cloud growth, precipitation, inflow and rotation evolve together in three dimensions. The drawing is not to scale, and the numbered stages are not a forecast timeline or a sequence every supercell follows.",
      ],
    },
  ],
  sources: [
    { title: "NWS — Supercell appearances and wall clouds", url: "https://www.weather.gov/spotterguide/supercell2" },
    { title: "NOAA JetStream — Thunderstorm types and supercell structure", url: "https://www.noaa.gov/jetstream/tstrmtypes" },
    { title: "NSSL — Thunderstorm types", url: "https://www.nssl.noaa.gov/education/svrwx101/thunderstorms/types/" },
    { title: "NSSL — Radar signatures and tornado detection", url: "https://www.nssl.noaa.gov/education/svrwx101/tornadoes/detection/" },
  ],
};

export default supercellInformation;
