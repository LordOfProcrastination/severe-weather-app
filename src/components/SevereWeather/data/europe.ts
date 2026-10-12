import type { WeatherTopic } from "../types";

const europe: WeatherTopic = {
    title: "Severe Weather in Europe",
    introduction: "Explore the seasonal overlap of moisture, instability and wind shear across Europe. Geography changes the setting, but the storm physics is shared.",
    stages: [
      { title: "Spring: ingredients return", description: "Increasing sunlight warms land while fronts and upper-level disturbances still bring lift and shear. The overlap of moisture and instability is uneven: severe storms can occur, but no season makes every region equally favorable." },
      { title: "Summer: continental convection", description: "Land heating and moisture support frequent convection across much of continental Europe. Central and northern European tornado records peak broadly in summer. Terrain and convergence boundaries help determine where storms initiate." },
      { title: "Autumn: a warm sea", description: "The Mediterranean retains warmth as cooler air and stronger disturbances return. Moisture, instability and shear can overlap around its coasts. Western and central Mediterranean tornado records have an autumn maximum." },
      { title: "Winter: fewer storms, continuing risk", description: "Continental instability is often limited, but strong wind shear can accompany low-topped storms. Eastern Mediterranean tornado records peak in winter. Severe convection is possible outside a region’s usual season." },
    ],
    sections: [
      { title: "A continent with many storm environments", paragraphs: ["Europe experiences damaging hail, convective winds, flash floods and tornadoes. Their distributions differ, so a tornado report map cannot stand in for all severe weather. Broad seasonal patterns describe historical records, not a forecast for a location.", "Severe storms need an overlap of ingredients: moisture, instability and lift, with wind shear helping organization. Strongly sheared cool-season storms can be dangerous even when buoyant energy is modest."] },
      { title: "The Mediterranean, Alps and Atlantic", paragraphs: ["The Mediterranean can supply heat and moisture, especially when cooler air arrives above a still-warm sea. The Alps and other mountain ranges force air upward, channel winds and create local convergence. They can help initiate storms or alter inflow; mountains do not make a place immune to tornadoes.", "Atlantic fronts and low-pressure systems transport moisture and bring lift and changing winds. The balance between maritime air, continental heating and local terrain produces sharp contrasts over relatively short distances."] },
      { title: "Europe and North America", paragraphs: ["The same physical processes produce storms on both continents. The central United States has a broad corridor where Gulf moisture, continental air and strong winds aloft often meet, east of the north–south Rocky Mountains.", "Europe has more fragmented seas, peninsulas and mountain barriers, so favorable environments are often smaller and more varied. Violent tornadoes still occur in Europe. Raw report totals cannot establish a physical risk ratio without accounting for area, population, observing systems and reporting practices."] },
      { title: "Reports are evidence, not a complete census", paragraphs: ["The European Severe Weather Database (ESWD), maintained by ESSL, combines quality-controlled reports from weather services, observers and other sources. Historical documents extend the record, but descriptions and damage evidence vary in detail.", "Events at night, offshore or in sparsely populated places can be missed. Reporting networks, cameras and public awareness have also changed. An increase in reports alone does not establish a climate trend. Compare like periods, quality levels and geographic coverage before interpreting patterns."] },
    ],
    sources: [
      { title: "Groenemeijer & Kühne — A climatology of tornadoes in Europe", url: "https://doi.org/10.1175/MWR-D-14-00107.1" },
      { title: "ESSL — European Severe Weather Database and usage guidance", url: "https://www.essl.org/cms/european-severe-weather-database/" },
      { title: "ESSL — Severe-storm research publications", url: "https://www.essl.org/cms/publications/scientific-publications/" },
    ],
  };

export default europe;
