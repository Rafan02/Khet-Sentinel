import { classify, STATUS_LABEL } from "@/lib/farm/engine";
import type { Plot } from "@/lib/farm/types";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function Meter({
  label,
  value,
  unit,
  good,
}: {
  label: string;
  value: number;
  unit: string;
  good: boolean;
}) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between text-xs">
        <span className="text-muted">{label}</span>
        <span className="tabular font-medium">
          {value.toFixed(value >= 20 ? 0 : 1)}
          {unit}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full rounded-full ${good ? "bg-primary" : "bg-warn"}`}
          style={{ width: `${Math.max(6, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}

export function Inspector({
  plots,
  onIrrigate,
  onFertilize,
  onTreat,
  onClear,
}: {
  plots: Plot[];
  onIrrigate: () => void;
  onFertilize: () => void;
  onTreat: () => void;
  onClear: () => void;
}) {
  if (!plots.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Walk the field</CardTitle>
          <CardDescription>
            Tap a square to inspect that plot. Shift-click to select a cluster.
            Labels match stakes a farmer would plant on the bund (A1 is the
            north-west corner).
          </CardDescription>
        </CardHeader>
        <CardBody className="text-sm leading-relaxed text-muted">
          This grid is one acre of Aman rice in Paba, Rajshahi — not a toy map.
          Each cell is a management zone of about 85 m². Texture is the crop:
          tall deep-green stalks are filling grain; straw-leaning stalks are
          thirsty; rusty blotches are blast.
        </CardBody>
      </Card>
    );
  }

  const plot = plots[0];
  const status = classify(plot);
  const many = plots.length > 1;

  return (
    <Card>
      <CardHeader>
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
          {many ? `${plots.length} plots selected` : "Plot inspector"}
        </p>
        <CardTitle>{many ? plots.map((p) => p.id).join(" · ") : plot.id}</CardTitle>
        <CardDescription>
          {many
            ? "Actions apply only to the selected cluster — the rest of the acre stays untouched."
            : STATUS_LABEL[status]}
        </CardDescription>
      </CardHeader>
      <CardBody className="space-y-4">
        {!many ? (
          <div className="grid gap-3">
            <Meter
              label="Soil moisture"
              value={plot.moisture}
              unit="%"
              good={plot.moisture >= 50 && plot.moisture <= 82}
            />
            <Meter
              label="Canopy nitrogen"
              value={plot.nitrogen}
              unit=""
              good={plot.nitrogen >= 45}
            />
            <Meter
              label="Pest load"
              value={plot.pestLoad}
              unit=""
              good={plot.pestLoad < 28}
            />
            <Meter
              label="Grain fill"
              value={plot.growth}
              unit=""
              good={plot.growth >= 55}
            />
            <p className="text-xs text-muted">
              Air {plot.temperature.toFixed(1)}°C · RH {plot.humidity.toFixed(0)}%
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted">
            Average moisture{" "}
            {(plots.reduce((a, p) => a + p.moisture, 0) / plots.length).toFixed(0)}%
            across the cluster.
          </p>
        )}
        <div className="grid grid-cols-3 gap-2">
          <Button size="sm" onClick={onIrrigate}>
            Irrigate
          </Button>
          <Button size="sm" variant="secondary" onClick={onFertilize}>
            Urea
          </Button>
          <Button size="sm" variant="outline" onClick={onTreat}>
            Treat
          </Button>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-muted underline-offset-2 hover:underline"
        >
          Clear selection
        </button>
      </CardBody>
    </Card>
  );
}
