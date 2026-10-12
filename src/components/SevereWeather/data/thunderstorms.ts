import type { WeatherTopic } from "../types";

const thunderstorms: WeatherTopic = {
    title: "Thunderstorms",
    introduction: "Follow a thunderstorm cell from its first rising air to its weakening outflow. Explore how air moving up and down shapes its life.",
    stages: [
      { title: "Moisture, instability and lift", description: "Moist air needs a push from a front, converging winds, terrain or surface heating. If the lifted air becomes warmer than its surroundings, buoyancy lets it continue rising. A stable layer can prevent storms despite energy below it." },
      { title: "The growing stage", description: "Rising air expands and cools. Condensation forms cloud droplets and releases latent heat, helping sustain buoyancy. An updraft dominates the developing cell as the cloud grows into colder air." },
      { title: "The mature stage", description: "Precipitation falls and a downdraft develops through precipitation loading and evaporative cooling. Updraft and downdraft coexist. Rain, hail, lightning and strong surface gusts can occur during this stage." },
      { title: "The dissipating stage", description: "In a simple single cell, spreading cool outflow cuts off the supply of warm air. The updraft fades and the remaining precipitation falls out. Outflow may still lift nearby air to start new cells; lightning can persist as a storm weakens." },
    ],
    sections: [
      { title: "The atmosphere as fuel", paragraphs: ["Moisture supplies water for cloud and precipitation. Instability describes whether displaced air can keep rising. Lift starts the process. CAPE (convective available potential energy) describes potential buoyant energy, not a guarantee of storms or a direct measure of damage.", "Wind shear changes the organization of storms. By separating rising air from precipitation and downdrafts, it can help a storm persist beyond the short life of an isolated cell."] },
      { title: "Single cells, multicells and supercells", paragraphs: ["A single cell follows the simplified growing, mature and dissipating sequence above. In a multicell cluster or line, new cells grow as older cells weaken, often along outflow boundaries. The whole system can last much longer than any individual cell.", "A supercell has a persistent rotating updraft. It can produce large hail, damaging winds or tornadoes, but rotation does not guarantee any one hazard. Squall lines can produce extensive damaging straight-line winds as well as brief tornadoes."] },
      { title: "Lightning and thunder", paragraphs: ["Collisions among ice particles and supercooled droplets, together with storm air motions, help separate electric charge. When the electric field becomes strong enough, a discharge can occur within a cloud, between clouds or between cloud and ground.", "Lightning rapidly heats its channel. The surrounding air expands suddenly and produces the sound wave we hear as thunder. A storm is a thunderstorm when it produces lightning and thunder; it does not need a tornado or hail."] },
      { title: "Several hazards, one storm", paragraphs: ["Strong updrafts can support hail growth, while descending air can spread as damaging gusts or downbursts. Repeated cells over the same area can cause flash flooding. Lightning threatens areas outside the heaviest rain, and some organized storms produce tornadoes.", "Severe-weather thresholds and warning systems vary between countries. Consult the local national weather service for current warnings; this page illustrates processes rather than assessing a live storm."] },
    ],
    sources: [
      { title: "NSSL — Thunderstorm ingredients and basics", url: "https://www.nssl.noaa.gov/education/svrwx101/thunderstorms/" },
      { title: "NOAA JetStream — Life cycle of a thunderstorm", url: "https://www.noaa.gov/jetstream/thunderstorms/life-cycle-of-thunderstorm" },
      { title: "NSSL — Lightning basics", url: "https://www.nssl.noaa.gov/education/svrwx101/lightning/" },
    ],
  };

export default thunderstorms;
