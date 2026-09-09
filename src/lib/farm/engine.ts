import {
  COLS,
  ROWS,
  type Advice,
  type PestFinding,
  type Plot,
  type PlotStatus,
  type SensorSample,
  type Sky,
  type Weather,
  type YieldResult,
  VARIETY,
} from "./types";

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function plotId(row: number, col: number) {
  return `${String.fromCharCode(65 + row)}${col + 1}`;
}

export function classify(plot: Plot): PlotStatus {
  if (plot.pestLoad >= 34) return "pest";
  if (plot.moisture >= 88) return "waterlogged";
  if (plot.moisture <= 42) return "dry";
  if (plot.nitrogen <= 36) return "nitrogen";
  if (
    plot.growth >= 68 &&
    plot.moisture >= 56 &&
    plot.moisture <= 82 &&
    plot.pestLoad < 14 &&
    plot.nitrogen >= 55
  ) {
    return "excellent";
  }
  return "healthy";
}

export const STATUS_LABEL: Record<PlotStatus, string> = {
  excellent: "Peak grain fill",
  healthy: "On track",
  dry: "Moisture stress",
  waterlogged: "Standing water",
  pest: "Rice blast risk",
  nitrogen: "Pale canopy",
};

export function createField(seed = 20260909): Plot[] {
  const rand = mulberry32(seed);
  const plots: Plot[] = [];
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const canalBoost = (row === ROWS - 1 ? 16 : 0) + (col === 0 ? 10 : 0);
      const ridgePenalty = row <= 1 && col >= 5 ? 22 : 0;
      const pestPocket = row >= 2 && row <= 3 && col >= 5 && col <= 6 ? 36 : 0;
      const nLow = row === 0 && col <= 2 ? 30 : 0;
      const moisture = clamp(
        58 + canalBoost - ridgePenalty + (row / (ROWS - 1)) * 8 + (rand() - 0.5) * 10,
        18,
        96,
      );
      const pestLoad = clamp(6 + pestPocket + (rand() - 0.4) * 8, 0, 92);
      plots.push({
        id: plotId(row, col),
        row,
        col,
        moisture,
        temperature: 28.4 + (rand() - 0.5) * 1.6,
        humidity: 64 + (rand() - 0.5) * 8,
        nitrogen: clamp(62 - nLow + (rand() - 0.5) * 10, 18, 92),
        pestLoad,
        growth: clamp(61 + (rand() - 0.5) * 8 - ridgePenalty * 0.25, 35, 88),
        stressHours: ridgePenalty > 0 ? 14 : pestPocket > 0 ? 9 : 2,
      });
    }
  }
  return plots;
}

export function createWeather(): Weather {
  return {
    day: 62,
    hour: 9,
    temp: 29.2,
    humidity: 66,
    rainfallMm: 0,
    sky: "haze",
  };
}

export function createHistory(weather: Weather, plots: Plot[]): SensorSample[] {
  const avg = averages(plots);
  const samples: SensorSample[] = [];
  for (let i = 11; i >= 0; i -= 1) {
    const hour = (weather.hour - i + 24) % 24;
    const swing = Math.sin(((hour - 6) / 24) * Math.PI * 2);
    samples.push({
      hourLabel: `${String(hour).padStart(2, "0")}:00`,
      moisture: clamp(avg.moisture - swing * 4, 20, 95),
      temp: clamp(avg.temperature + swing * 3.4, 22, 36),
      humidity: clamp(avg.humidity - swing * 10, 40, 92),
      rainfall: hour === 5 ? 4.2 : hour === 6 ? 1.6 : 0,
    });
  }
  return samples;
}

export function averages(plots: Plot[]) {
  const n = plots.length || 1;
  const sum = plots.reduce(
    (acc, p) => {
      acc.moisture += p.moisture;
      acc.temperature += p.temperature;
      acc.humidity += p.humidity;
      acc.nitrogen += p.nitrogen;
      acc.pestLoad += p.pestLoad;
      acc.growth += p.growth;
      return acc;
    },
    { moisture: 0, temperature: 0, humidity: 0, nitrogen: 0, pestLoad: 0, growth: 0 },
  );
  return {
    moisture: sum.moisture / n,
    temperature: sum.temperature / n,
    humidity: sum.humidity / n,
    nitrogen: sum.nitrogen / n,
    pestLoad: sum.pestLoad / n,
    growth: sum.growth / n,
  };
}

function hourClimate(hour: number) {
  const swing = Math.sin(((hour - 6) / 24) * Math.PI * 2);
  const temp = 27.2 + swing * 4.6;
  const humidity = 72 - swing * 14;
  let sky: Sky = "haze";
  let rainfallMm = 0;
  if (hour >= 15 && hour <= 17 && swing > 0.2) {
    sky = "cloud";
  }
  if (hour === 16 || hour === 5) {
    sky = "rain";
    rainfallMm = hour === 5 ? 6.4 : 3.1;
  } else if (hour >= 10 && hour <= 14) {
    sky = "clear";
  }
  return { temp, humidity, sky, rainfallMm };
}

export function tickField(plots: Plot[], weather: Weather): { plots: Plot[]; weather: Weather } {
  const hour = (weather.hour + 1) % 24;
  const day = weather.day + (hour === 0 ? 1 : 0);
  const climate = hourClimate(hour);
  const nextWeather: Weather = { day, hour, ...climate };

  const nextPlots = plots.map((plot) => {
    const evap = Math.max(0, (climate.temp - 28) * 0.12);
    const drain = plot.moisture > 84 ? 0.35 : 0.08;
    let moisture = plot.moisture - evap - drain + climate.rainfallMm * 0.55;
    if (plot.col === 0 || plot.row === ROWS - 1) moisture += 0.35;
    moisture = clamp(moisture, 12, 98);

    const humidWarm = climate.humidity > 70 && climate.temp > 28;
    let pestLoad = plot.pestLoad + (humidWarm ? 0.18 : -0.04);
    if (moisture > 86) pestLoad += 0.1;
    pestLoad = clamp(pestLoad, 0, 100);

    let nitrogen = plot.nitrogen - 0.03;
    if (moisture > 90) nitrogen -= 0.05;
    nitrogen = clamp(nitrogen, 8, 96);

    const moistureScore = 1 - Math.min(1, Math.abs(moisture - 68) / 48);
    const pestPenalty = pestLoad / 140;
    const nScore = nitrogen / 100;
    const growthDelta = 0.08 * moistureScore * nScore - pestPenalty * 0.08;
    const growth = clamp(plot.growth + growthDelta, 8, 100);

    const stressed =
      moisture < 42 || moisture > 90 || pestLoad > 40 || nitrogen < 32;
    return {
      ...plot,
      moisture,
      temperature: climate.temp + (plot.col > 5 ? 0.4 : 0),
      humidity: climate.humidity + (moisture > 80 ? 3 : 0),
      nitrogen,
      pestLoad,
      growth,
      stressHours: plot.stressHours + (stressed ? 1 : 0),
    };
  });

  return { plots: nextPlots, weather: nextWeather };
}

export function irrigatePlots(plots: Plot[], ids: string[]): Plot[] {
  const set = new Set(ids);
  return plots.map((p) => {
    if (!set.has(p.id)) return p;
    return {
      ...p,
      moisture: clamp(p.moisture + 18, 12, 94),
      temperature: p.temperature - 0.4,
    };
  });
}

export function fertilizePlots(plots: Plot[], ids: string[]): Plot[] {
  const set = new Set(ids);
  return plots.map((p) => {
    if (!set.has(p.id)) return p;
    return { ...p, nitrogen: clamp(p.nitrogen + 16, 8, 96) };
  });
}

export function treatPlots(plots: Plot[], ids: string[]): Plot[] {
  const set = new Set(ids);
  return plots.map((p) => {
    if (!set.has(p.id)) return p;
    return { ...p, pestLoad: clamp(p.pestLoad * 0.35, 0, 100) };
  });
}

export function predictYield(plots: Plot[]): YieldResult {
  const base = 6.2;
  const scores = plots.map((p) => {
    const moisture = 1 - Math.min(1, Math.abs(p.moisture - 68) / 50);
    const nitrogen = clamp(p.nitrogen / 100, 0.25, 1);
    const pest = 1 - p.pestLoad / 130;
    const growth = p.growth / 100;
    const stress = 1 - Math.min(0.45, p.stressHours / 180);
    return clamp(moisture * 0.28 + nitrogen * 0.18 + pest * 0.22 + growth * 0.22 + stress * 0.1, 0.25, 1);
  });
  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  const tonnesPerHa = Math.round(base * mean * 100) / 100;
  const avg = averages(plots);
  const moistureScore = 1 - Math.min(1, Math.abs(avg.moisture - 68) / 50);
  return {
    tonnesPerHa,
    confidence: Math.round(82 + mean * 12),
    variety: VARIETY,
    drivers: [
      { label: "Soil moisture window", score: Math.round(moistureScore * 100) },
      { label: "Canopy nitrogen", score: Math.round(avg.nitrogen) },
      { label: "Pest pressure (inverted)", score: Math.round(100 - avg.pestLoad) },
      { label: "Crop stage / grain fill", score: Math.round(avg.growth) },
    ],
  };
}

export function scanPests(plots: Plot[]): PestFinding {
  const infected = plots.filter((p) => p.pestLoad >= 28);
  const humid = averages(plots).humidity > 62;
  const disease = humid ? "Rice blast (Magnaporthe oryzae)" : "Brown spot";
  const maxLoad = Math.max(...plots.map((p) => p.pestLoad), 0);
  const confidence = infected.length
    ? Math.round(70 + Math.min(22, maxLoad * 0.25))
    : 18;
  return {
    disease: infected.length ? disease : "No outbreak signature",
    confidence,
    plotIds: infected.map((p) => p.id),
    note: infected.length
      ? `${infected.length} plots above blast threshold. Treat the east-center pocket first, then walk the bund.`
      : "Canopy looks clean. Keep scouting after evening rain.",
  };
}

export function buildAdvice(plots: Plot[]): Advice[] {
  const dry = plots.filter((p) => classify(p) === "dry");
  const wet = plots.filter((p) => classify(p) === "waterlogged");
  const pest = plots.filter((p) => classify(p) === "pest");
  const pale = plots.filter((p) => classify(p) === "nitrogen");
  const items: Advice[] = [];
  if (dry.length) {
    items.push({
      id: "irrigate",
      title: `Irrigate ${dry.map((p) => p.id).slice(0, 6).join(", ")}`,
      detail: "Ridge plots on the north-east are below 42% moisture. A short pulse now protects grain fill.",
      urgency: "now",
      action: "irrigate",
      plotIds: dry.map((p) => p.id),
    });
  }
  if (pest.length) {
    items.push({
      id: "treat",
      title: "Spot-treat rice blast pocket",
      detail: `Lesion risk is concentrated on ${pest.map((p) => p.id).join(", ")}. Fungicide on those plots only — not the whole acre.`,
      urgency: "now",
      action: "treat",
      plotIds: pest.map((p) => p.id),
    });
  }
  if (pale.length) {
    items.push({
      id: "n",
      title: "Top-dress nitrogen on pale canopy",
      detail: `${pale.map((p) => p.id).join(", ")} show nitrogen fade. Cut the dose 15% versus blanket application.`,
      urgency: "soon",
      action: "fertilize",
      plotIds: pale.map((p) => p.id),
    });
  }
  if (wet.length) {
    items.push({
      id: "drain",
      title: "Ease canal gate on the south bund",
      detail: `${wet.map((p) => p.id).join(", ")} sit in standing water. Blast likes this. Drop the water 3–4 cm.`,
      urgency: "soon",
      action: "none",
      plotIds: wet.map((p) => p.id),
    });
  }
  if (!items.length) {
    items.push({
      id: "ok",
      title: "Hold the current schedule",
      detail: "Moisture, nitrogen and pest load are inside the Aman window. Scout again after the next rain.",
      urgency: "watch",
      action: "none",
      plotIds: [],
    });
  }
  return items;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
