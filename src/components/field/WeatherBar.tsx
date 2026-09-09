import { CloudRain, Pause, Play, RotateCcw, Sun, Cloudy } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Weather } from "@/lib/farm/types";

function SkyIcon({ sky }: { sky: Weather["sky"] }) {
  if (sky === "rain") return <CloudRain className="size-4" strokeWidth={1.75} />;
  if (sky === "cloud") return <Cloudy className="size-4" strokeWidth={1.75} />;
  return <Sun className="size-4" strokeWidth={1.75} />;
}

const SKY_COPY: Record<Weather["sky"], string> = {
  clear: "Clear, high evaporative demand",
  haze: "Haze, typical Rajshahi morning",
  cloud: "Building cloud, hold irrigation",
  rain: "Rain on the bund — skip the pump",
};

export function WeatherBar({
  weather,
  playing,
  onToggle,
  onReset,
}: {
  weather: Weather;
  playing: boolean;
  onToggle: () => void;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-surface-2 px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-md bg-card text-accent">
          <SkyIcon sky={weather.sky} />
        </span>
        <div>
          <p className="text-sm font-medium">
            Aman day {weather.day} · {String(weather.hour).padStart(2, "0")}:00
          </p>
          <p className="text-xs text-muted">{SKY_COPY[weather.sky]}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="tabular">
          {weather.temp.toFixed(1)}°C
          <span className="ml-1 text-xs text-muted">air</span>
        </span>
        <span className="tabular">
          {weather.humidity.toFixed(0)}%
          <span className="ml-1 text-xs text-muted">RH</span>
        </span>
        <span className="tabular">
          {weather.rainfallMm.toFixed(1)} mm
          <span className="ml-1 text-xs text-muted">rain</span>
        </span>
        <Button size="sm" variant="outline" onClick={onToggle}>
          {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          {playing ? "Pause clock" : "Run clock"}
        </Button>
        <Button size="sm" variant="ghost" onClick={onReset}>
          <RotateCcw className="size-3.5" />
          Reset field
        </Button>
      </div>
    </div>
  );
}
