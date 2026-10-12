import type { WeatherTopic } from "../types";

const tornadoes: WeatherTopic = {
    title: "Tornadoes & Tornado Formation",
    introduction: "Explore how storm-scale rotation can become a surface vortex, why that outcome is uncertain, and what damage ratings actually tell us.",
    stages: [
      { title: "A favorable environment", description: "Moisture, instability and a lifting mechanism support thunderstorms. Wind changing with height supplies shear; strong low-level shear can favor tornadic supercells, but no single ingredient guarantees a tornado." },
      { title: "A rotating updraft", description: "An updraft can tilt and stretch rotation associated with wind shear. A persistent rotating updraft is a mesocyclone: it is much broader than a tornado and does not by itself imply rotation at the ground." },
      { title: "Near-surface rotation", description: "Inflow, downdrafts and temperature contrasts can contribute to the rotation available near the ground. Its alignment with a strong low-level updraft matters. This is a possible pathway, not a settled recipe for every tornado." },
      { title: "A tornado may develop", description: "Stretching can concentrate near-surface rotation into an intense vortex connected to the cloud. A tornado is in contact with the surface even when its condensation funnel does not visibly reach it. Many storms never reach this stage." },
      { title: "Weakening or a new cycle", description: "Changes in inflow and outflow can weaken the vortex. A narrowing, rope-like funnel sometimes appears, but shape alone does not reveal wind speed. A parent supercell can produce another tornado in a later cycle." },
    ],
    sections: [
      { title: "What counts as a tornado?", paragraphs: ["A tornado is a rotating column of air extending from a cumuliform cloud to the surface. A funnel cloud without surface contact is not a tornado. Dust or debris may reveal a surface circulation below an incomplete condensation funnel.", "Tornadoes can be described by their formation mechanism or rated by damage intensity. Shape, darkness and apparent width are not reliable measures of strength."] },
      { title: "Supercells, landspouts and squall lines", paragraphs: ["Supercell tornadoes occur with a persistent rotating updraft. Landspouts can form when a growing cloud stretches pre-existing vertical rotation along a surface convergence boundary, without a pre-existing mid-level mesocyclone.", "A quasi-linear convective system (QLCS) is a line of storms. Small circulations along its leading edge can produce tornadoes, sometimes quickly and with little visual warning. These processes differ from the supercell pathway shown above."] },
      { title: "Why do most supercells not produce tornadoes?", paragraphs: ["A mesocyclone aloft is not enough: rotation must intensify very close to the surface. Low-level shear, moist inflow, the strength and position of the updraft, and the temperature of storm outflow all influence the outcome.", "Outflow that is too cold can undercut an updraft. Even apparently similar storms can evolve differently. The sources of near-ground rotation and the detailed role of downdrafts remain active research questions; this illustration cannot predict tornadogenesis."] },
      { title: "Reading the Enhanced Fujita scale", paragraphs: ["The US Enhanced Fujita (EF) scale estimates three-second gusts from surveyed damage to buildings and vegetation. EF0–EF1 are often called weak, EF2–EF3 strong, and EF4–EF5 violent; even the lowest categories can be dangerous.", "Construction quality, available damage indicators and survey coverage affect a rating. A tornado crossing open ground may be unrated or have its peak strength underestimated. Ratings are not direct wind measurements. Historical F, US EF and International Fujita (IF) ratings should not be treated as identical; ESSL developed the IF scale for a wider range of construction types."] },
    ],
    sources: [
      { title: "NSSL — Tornado types and open research questions", url: "https://www.nssl.noaa.gov/education/svrwx101/tornadoes/types/" },
      { title: "NSSL — Tornado questions and answers", url: "https://www.nssl.noaa.gov/education/svrwx101/tornadoes/faq/" },
      { title: "NWS — Enhanced Fujita scale", url: "https://www.weather.gov/oun/efscale" },
      { title: "ESSL — International Fujita scale publications", url: "https://www.essl.org/cms/publications/" },
    ],
  };

export default tornadoes;
