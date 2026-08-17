export interface TornadoEvent {
  id: string;
  source: string;
  sourceUrl: string;

  country: string;
  province?: string;
  locality?: string;

  date: string;
  time?: string;

  latitude: number;
  longitude: number;

  vortexType?: string;
  reliability?: string;
  intensity?: string;

  injuries?: number;
  fatalities?: number;

  propertyDamage?: string;
  description?: string;
  descriptionLanguage?: string;
}
