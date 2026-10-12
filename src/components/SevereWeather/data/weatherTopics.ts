import type { TopicId, WeatherTopic } from "../types";
import tornadoes from "./tornadoes";
import thunderstorms from "./thunderstorms";
import waterspout from "./waterspout";
import europe from "./europe";

export const weatherTopics: Record<TopicId, WeatherTopic> = {
  tornadoes,
  thunderstorms,
  waterspout,
  europe,
};
