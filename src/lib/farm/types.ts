export const COLS = 8;
export const ROWS = 6;

export type PlotStatus =
  | "excellent"
  | "healthy"
  | "dry"
  | "waterlogged"
  | "pest"
  | "nitrogen";

export type Sky = "clear" | "haze" | "cloud" | "rain";

export interface Plot {
  id: string;
  row: number;
  col: number;
  moisture: number;
  temperature: number;
  humidity: number;
  nitrogen: number;
  pestLoad: number;
  growth: number;
  stressHours: number;
}

export interface Weather {
  day: number;
  hour: number;
  temp: number;
  humidity: number;
  rainfallMm: number;
  sky: Sky;
}

export interface SensorSample {
  hourLabel: string;
  moisture: number;
  temp: number;
  humidity: number;
  rainfall: number;
}

export interface Advice {
  id: string;
  title: string;
  detail: string;
  urgency: "now" | "soon" | "watch";
  action: "irrigate" | "fertilize" | "treat" | "none";
  plotIds: string[];
}

export interface PestFinding {
  disease: string;
  confidence: number;
  plotIds: string[];
  note: string;
}

export interface YieldResult {
  tonnesPerHa: number;
  confidence: number;
  variety: string;
  drivers: { label: string; score: number }[];
}

export const VARIETY = "BRRI dhan48";
export const FARM_NAME = "Rajib Khandakar";
export const FARM_PLACE = "Paba, Rajshahi";
export const FARM_SIZE = "1.0 acre · Aman paddy";
