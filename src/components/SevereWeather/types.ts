export type TopicId = "tornadoes" | "thunderstorms" | "waterspout" | "europe";
export interface WeatherStage {
  title: string;
  description: string;
}
export interface WeatherTopic {
  title: string;
  introduction: string;
  stages: WeatherStage[];
  sections: { title: string; paragraphs: string[] }[];
  sources: { title: string; url: string }[];
}

export type WeatherSystem = "supercell" | TopicId;
