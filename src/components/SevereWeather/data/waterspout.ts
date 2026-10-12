import type { WeatherTopic } from "../types";

const waterspout: WeatherTopic = {
    title: "Waterspouts",
    introduction: "Explore a surface-based waterspout pathway and compare it with a tornado over water. A visible funnel is only part of the circulation.",
    stages: [
      { title: "A boundary over water", description: "Converging winds can create small areas of vertical rotation near the water surface. Moist air and instability beneath a growing cumulus cloud provide a setting for non-mesocyclonic, often called fair-weather, waterspouts." },
      { title: "Rotation is stretched", description: "An updraft over the boundary can stretch and strengthen the near-surface vortex. Fair-weather waterspouts usually develop with relatively weak background winds; they do not require the deep rotating updraft of a supercell." },
      { title: "Spray and condensation", description: "An organized vortex may lift a ring of spray from the surface while condensation makes a funnel visible below the cloud. The funnel consists mainly of condensed water droplets, not a column of seawater sucked up to the cloud." },
      { title: "The circulation weakens", description: "A change in the cloud updraft or an encounter with cool outflow can disrupt the vortex. Surface contact may persist after part of the funnel disappears. Some waterspouts move ashore and cause tornado damage." },
    ],
    sections: [
      { title: "Two formation pathways", paragraphs: ["A waterspout is a rotating air column connecting a convective cloud with the water surface. Tornadic waterspouts are tornadoes over water associated with severe thunderstorms; they can form over water or move there from land.", "Fair-weather waterspouts usually grow from surface rotation beneath developing clouds without a mesocyclone. The name does not mean harmless or necessarily clear weather. The staged diagram illustrates this second pathway only."] },
      { title: "Water, air and growing clouds", paragraphs: ["Relatively warm water beneath cooler air can help create an unstable lower atmosphere. Surface convergence, abundant moisture and a suitable cloud updraft matter together; warm water alone is not enough.", "This stretching of existing surface rotation resembles landspout formation. The surface beneath the vortex changes what we see: spray over water, and dust or debris over land. Neither a visible funnel nor its shape reliably measures the wind speed."] },
      { title: "Waterspouts in Europe", paragraphs: ["Waterspouts are documented over the Mediterranean as well as the North and Baltic Seas. Seasonal timing varies: relatively warm water beneath arriving colder air can support events after the warmest part of summer. Mediterranean tornado records show later seasonal peaks than central and northern European land records.", "Strong winds and spray threaten small boats and coastal areas; tornadic waterspouts can accompany hail and lightning. Remote offshore events are easily missed, so reported locations are not a complete map of occurrence. Follow local marine forecasts and warnings."] },
    ],
    sources: [
      { title: "NWS — Waterspout types and hazards", url: "https://www.weather.gov/tbw/waterspouts" },
      { title: "NWS — Waterspout science", url: "https://www.weather.gov/apx/waterspout" },
      { title: "ESSL — Research on North and Baltic Sea waterspouts", url: "https://www.essl.org/cms/publications/scientific-publications/" },
      { title: "Groenemeijer & Kühne — European tornado climatology", url: "https://doi.org/10.1175/MWR-D-14-00107.1" },
    ],
  };

export default waterspout;
