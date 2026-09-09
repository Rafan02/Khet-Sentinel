import { createFileRoute } from "@tanstack/react-router";
import { FieldGrid } from "@/components/field/FieldGrid";
import { FieldLegend } from "@/components/field/Legend";
import { Inspector } from "@/components/field/Inspector";
import { WeatherBar } from "@/components/field/WeatherBar";
import { averages } from "@/lib/farm/engine";
import { useFarmStore } from "@/lib/farm/store";
import { FARM_NAME, FARM_PLACE, FARM_SIZE } from "@/lib/farm/types";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const plots = useFarmStore((s) => s.plots);
  const weather = useFarmStore((s) => s.weather);
  const selectedIds = useFarmStore((s) => s.selectedIds);
  const playing = useFarmStore((s) => s.playing);
  const pestFinding = useFarmStore((s) => s.pestFinding);
  const select = useFarmStore((s) => s.select);
  const irrigate = useFarmStore((s) => s.irrigate);
  const fertilize = useFarmStore((s) => s.fertilize);
  const treat = useFarmStore((s) => s.treat);
  const clearSelection = useFarmStore((s) => s.clearSelection);
  const togglePlay = useFarmStore((s) => s.togglePlay);
  const reset = useFarmStore((s) => s.reset);

  const selected = plots.filter((p) => selectedIds.includes(p.id));
  const avg = averages(plots);
  const highlightIds = pestFinding?.plotIds ?? [];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
              {FARM_NAME} · {FARM_PLACE}
            </p>
            <h1 className="mt-1 text-3xl font-medium tracking-tight md:text-4xl">
              Live field grid
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              {FARM_SIZE}. Each square is a real management zone a farmer can
              walk to. Color and rice texture are the crop — not decoration.
            </p>
          </div>
          <dl className="grid grid-cols-3 gap-4 text-right">
            <Stat label="Moisture" value={`${avg.moisture.toFixed(0)}%`} />
            <Stat label="Blast load" value={avg.pestLoad.toFixed(0)} />
            <Stat label="Grain fill" value={`${avg.growth.toFixed(0)}%`} />
          </dl>
        </div>

        <WeatherBar
          weather={weather}
          playing={playing}
          onToggle={togglePlay}
          onReset={reset}
        />
        <FieldGrid
          plots={plots}
          selectedIds={selectedIds}
          highlightIds={highlightIds}
          onSelect={select}
        />
        <FieldLegend />
        <p className="text-xs text-muted">
          Clock runs one field-hour every few seconds. Pause it when you want
          to talk through a plot. Shift-click to paint a cluster.
        </p>
      </section>

      <aside className="space-y-4">
        <Inspector
          plots={selected}
          onIrrigate={irrigate}
          onFertilize={fertilize}
          onTreat={treat}
          onClear={clearSelection}
        />
      </aside>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.14em] text-muted">{label}</dt>
      <dd className="font-display text-2xl tabular font-medium">{value}</dd>
    </div>
  );
}
