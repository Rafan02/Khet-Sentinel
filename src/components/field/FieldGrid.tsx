import { COLS, ROWS, type Plot } from "@/lib/farm/types";
import { PlotCell } from "./PlotCell";

export function FieldGrid({
  plots,
  selectedIds,
  highlightIds,
  onSelect,
}: {
  plots: Plot[];
  selectedIds: string[];
  highlightIds: string[];
  onSelect: (id: string, additive: boolean) => void;
}) {
  const selected = new Set(selectedIds);
  const highlighted = new Set(highlightIds);
  return (
    <div className="field-board rounded-xl p-3 shadow-[var(--shadow-border)] sm:p-4">
      <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-ink/70">
        <span>North bund · road</span>
        <span>1 acre · 48 plots</span>
      </div>
      <div className="flex gap-2">
        <div className="hidden w-5 flex-col justify-around py-1 font-mono text-[10px] text-ink/55 sm:flex">
          {Array.from({ length: ROWS }, (_, r) => (
            <span key={r}>{String.fromCharCode(65 + r)}</span>
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
          >
            {plots.map((plot) => (
              <PlotCell
                key={plot.id}
                plot={plot}
                selected={selected.has(plot.id)}
                highlighted={highlighted.has(plot.id)}
                onClick={(additive) => onSelect(plot.id, additive)}
              />
            ))}
          </div>
          <div className="mt-1.5 grid grid-cols-8 font-mono text-[10px] text-ink/55">
            {Array.from({ length: COLS }, (_, c) => (
              <span key={c} className="text-center">
                {c + 1}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-ink/70">
        <span>West canal</span>
        <span>South drain</span>
      </div>
    </div>
  );
}
