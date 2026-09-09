import { create } from "zustand";
import {
  averages,
  buildAdvice,
  createField,
  createHistory,
  createWeather,
  fertilizePlots,
  irrigatePlots,
  predictYield,
  scanPests,
  tickField,
  treatPlots,
} from "./engine";
import type {
  Advice,
  PestFinding,
  Plot,
  SensorSample,
  Weather,
  YieldResult,
} from "./types";

const STORAGE_KEY = "khet-sentinel-v2";

interface FarmState {
  plots: Plot[];
  weather: Weather;
  history: SensorSample[];
  selectedIds: string[];
  playing: boolean;
  yieldResult: YieldResult | null;
  pestFinding: PestFinding | null;
  toast: string | null;
  hydrate: () => void;
  tick: () => void;
  togglePlay: () => void;
  select: (id: string, additive?: boolean) => void;
  clearSelection: () => void;
  selectStatus: (ids: string[]) => void;
  irrigate: () => void;
  fertilize: () => void;
  treat: () => void;
  predict: () => void;
  scan: () => void;
  applyAdvice: (advice: Advice) => void;
  reset: () => void;
}

function persist(state: Pick<FarmState, "plots" | "weather" | "history" | "playing">) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* offline quota */
  }
}

const initialPlots = createField();
const initialWeather = createWeather();

export const useFarmStore = create<FarmState>((set, get) => ({
  plots: initialPlots,
  weather: initialWeather,
  history: createHistory(initialWeather, initialPlots),
  selectedIds: [],
  playing: false,
  yieldResult: null,
  pestFinding: null,
  toast: null,

  hydrate: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as {
        plots?: Plot[];
        weather?: Weather;
        history?: SensorSample[];
        playing?: boolean;
      };
      if (!saved.plots?.length) return;
      set({
        plots: saved.plots,
        weather: saved.weather ?? get().weather,
        history: saved.history ?? get().history,
        playing: saved.playing ?? false,
      });
    } catch {
      /* ignore */
    }
  },

  tick: () => {
    const { plots, weather, history } = get();
    const next = tickField(plots, weather);
    const avg = averages(next.plots);
    const sample: SensorSample = {
      hourLabel: `${String(next.weather.hour).padStart(2, "0")}:00`,
      moisture: Math.round(avg.moisture * 10) / 10,
      temp: Math.round(avg.temperature * 10) / 10,
      humidity: Math.round(avg.humidity * 10) / 10,
      rainfall: next.weather.rainfallMm,
    };
    const nextHistory = [...history.slice(-11), sample];
    persist({
      plots: next.plots,
      weather: next.weather,
      history: nextHistory,
      playing: get().playing,
    });
    set({ plots: next.plots, weather: next.weather, history: nextHistory });
  },

  togglePlay: () => {
    const playing = !get().playing;
    persist({
      plots: get().plots,
      weather: get().weather,
      history: get().history,
      playing,
    });
    set({ playing });
  },

  select: (id, additive) => {
    const current = get().selectedIds;
    if (additive) {
      set({
        selectedIds: current.includes(id)
          ? current.filter((x) => x !== id)
          : [...current, id],
      });
      return;
    }
    set({ selectedIds: current.length === 1 && current[0] === id ? [] : [id] });
  },

  clearSelection: () => set({ selectedIds: [] }),

  selectStatus: (ids) => set({ selectedIds: ids }),

  irrigate: () => {
    const ids = targetIds(get());
    if (!ids.length) {
      set({ toast: "Select dry plots, or tap a recommendation first." });
      return;
    }
    const plots = irrigatePlots(get().plots, ids);
    persist({ ...get(), plots });
    set({ plots, toast: `Canal pulse sent to ${ids.length} plot${ids.length > 1 ? "s" : ""}.` });
  },

  fertilize: () => {
    const ids = targetIds(get());
    if (!ids.length) {
      set({ toast: "Select pale plots before top-dressing." });
      return;
    }
    const plots = fertilizePlots(get().plots, ids);
    persist({ ...get(), plots });
    set({ plots, toast: `Urea top-dress mapped to ${ids.length} plots.` });
  },

  treat: () => {
    const ids = targetIds(get());
    if (!ids.length) {
      set({ toast: "Select the blast pocket first." });
      return;
    }
    const plots = treatPlots(get().plots, ids);
    persist({ ...get(), plots });
    set({
      plots,
      pestFinding: scanPests(plots),
      toast: `Spot fungicide applied on ${ids.length} plots.`,
    });
  },

  predict: () => set({ yieldResult: predictYield(get().plots) }),

  scan: () => {
    const finding = scanPests(get().plots);
    set({
      pestFinding: finding,
      selectedIds: finding.plotIds,
      toast: finding.plotIds.length
        ? `Blast signature on ${finding.plotIds.join(", ")}.`
        : "No outbreak on this pass.",
    });
  },

  applyAdvice: (advice) => {
    set({ selectedIds: advice.plotIds });
    if (advice.action === "irrigate") get().irrigate();
    if (advice.action === "fertilize") get().fertilize();
    if (advice.action === "treat") get().treat();
  },

  reset: () => {
    const plots = createField();
    const weather = createWeather();
    const history = createHistory(weather, plots);
    persist({ plots, weather, history, playing: false });
    set({
      plots,
      weather,
      history,
      playing: false,
      selectedIds: [],
      yieldResult: null,
      pestFinding: null,
      toast: "Field reset to Aman day 62.",
    });
  },
}));

function targetIds(state: FarmState) {
  if (state.selectedIds.length) return state.selectedIds;
  return [];
}

export function fieldAdvice() {
  return buildAdvice(useFarmStore.getState().plots);
}
