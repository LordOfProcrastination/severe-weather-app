import type { TornadoEvent } from "../interfaces/TornadoEvent";
import type { SinobasRow } from "../interfaces/sinobasRow";

export function transformSinobasRow(row: SinobasRow): TornadoEvent {
  return {
    id: row["Nº reporte"],
    source: "AEMET SINOBAS",
    sourceUrl: row["Url del reporte"],

    country: "Spain",

    province: cleanOptionalText(row.Provincia),
    locality: cleanOptionalText(row.Localidad),

    date: row["Fecha del evento"],
    time: cleanOptionalText(row["Hora del evento"]),

    latitude: Number(row.Latitud),
    longitude: Number(row.Longitud),

    vortexType: cleanOptionalText(row["Tipo de vórtice"]),
    reliability: transformReliability(row.Fiabilidad),
    intensity: cleanOptionalText(row.Fujita),

    injuries: parseOptionalNumber(row["Nº heridos"]),
    fatalities: parseOptionalNumber(row["Nº muertos"]),

    propertyDamage: cleanOptionalText(row["Daños en bienes"]),
    description: cleanOptionalText(row["Descripción del suceso"]),
    descriptionLanguage: "Spanish",
  };
}

function parseOptionalNumber(value: string): number | undefined {
  const cleaned = value?.trim();

  if (!cleaned || cleaned === "SD" || cleaned === "Sin Datos") {
    return undefined;
  }

  const parsed = Number(cleaned);

  return Number.isNaN(parsed) ? undefined : parsed;
}

function cleanOptionalText(value: string): string | undefined {
  const cleaned = value?.trim();

  if (
    !cleaned ||
    cleaned === "SD" ||
    cleaned === "Sin Datos" ||
    cleaned === "No hay datos"
  ) {
    return undefined;
  }

  return cleaned;
}

function transformReliability(value: string): string | undefined {
  const cleaned = cleanOptionalText(value);

  if (!cleaned) {
    return undefined;
  }

  switch (cleaned) {
    case "Alta":
      return "High";
    case "Media":
      return "Medium";
    case "Baja":
      return "Low";
    case "No Validado":
      return "Not Validated";
    default:
      return cleaned;
  }
}
