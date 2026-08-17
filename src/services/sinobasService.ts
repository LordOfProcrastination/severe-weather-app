import Papa from "papaparse";

import type { SinobasRow } from "../interfaces/sinobasRow";
import type { TornadoEvent } from "../interfaces/TornadoEvent";

import { transformSinobasRow } from "../transformers/sinobasTransformer";

export async function getSinobasTornadoEvents(): Promise<TornadoEvent[]> {
  const response = await fetch("/data/reportes.csv");

  if (!response.ok) {
    throw new Error("Failed to load SINOBAS data");
  }

  const buffer = await response.arrayBuffer();
  const csvText = new TextDecoder("windows-1252").decode(buffer);

  const result = Papa.parse<SinobasRow>(csvText, {
    header: true,
    skipEmptyLines: true,
    delimiter: ";",
  });

  const tornadoRows = result.data.filter(
    (row) => row["Tipo de fenómeno"] === "Tornado / Tromba Marina",
  );

  return tornadoRows.map(transformSinobasRow);
}
