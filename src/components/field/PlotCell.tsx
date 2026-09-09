import { classify, STATUS_LABEL } from "@/lib/farm/engine";
import type { Plot, PlotStatus } from "@/lib/farm/types";
import { cn } from "@/lib/utils";

const STALK: Record<PlotStatus, string> = {
  excellent: "var(--color-plot-excellent)",
  healthy: "var(--color-plot-healthy)",
  dry: "var(--color-plot-dry)",
  waterlogged: "var(--color-plot-wet)",
  pest: "var(--color-plot-pest)",
  nitrogen: "var(--color-plot-nitrogen)",
};

const SOIL: Record<PlotStatus, string> = {
  excellent: "var(--color-plot-soil-ok)",
  healthy: "var(--color-plot-soil-ok)",
  dry: "var(--color-plot-soil-dry)",
  waterlogged: "var(--color-plot-soil-wet)",
  pest: "var(--color-plot-soil-pest)",
  nitrogen: "var(--color-plot-soil-ok)",
};

function stalks(plot: Plot, status: PlotStatus) {
  const count = 9;
  const height = 10 + (plot.growth / 100) * 22;
  const lean = status === "dry" ? 3.2 : status === "waterlogged" ? 0.4 : 1.1;
  const color = STALK[status];
  return Array.from({ length: count }, (_, i) => {
    const x = 3.2 + i * 3.8 + (i % 2) * 0.4;
    const h = height + ((i * 7) % 5) - 2;
    const tipX = x + (i % 2 === 0 ? -lean : lean);
    return (
      <path
        key={i}
        d={`M ${x} 46 Q ${x + (tipX - x) * 0.4} ${46 - h * 0.55} ${tipX} ${46 - h}`}
        stroke={color}
        strokeWidth={status === "excellent" ? 1.55 : 1.25}
        strokeLinecap="round"
        fill="none"
      />
    );
  });
}

export function PlotCell({
  plot,
  selected,
  highlighted,
  onClick,
}: {
  plot: Plot;
  selected: boolean;
  highlighted: boolean;
  onClick: (additive: boolean) => void;
}) {
  const status = classify(plot);
  return (
    <button
      type="button"
      onClick={(e) => onClick(e.shiftKey || e.metaKey)}
      aria-pressed={selected}
      aria-label={`Plot ${plot.id}, ${STATUS_LABEL[status]}, moisture ${Math.round(plot.moisture)} percent`}
      className={cn(
        "relative aspect-square overflow-hidden rounded-sm outline-none transition-[box-shadow,transform] duration-[var(--motion-quick)] ease-[var(--ease-out)]",
        "focus-visible:ring-2 focus-visible:ring-ring",
        selected && "z-10 ring-2 ring-primary ring-offset-1 ring-offset-bg",
        highlighted && !selected && "ring-2 ring-danger/80",
      )}
    >
      <svg viewBox="0 0 40 48" className="block size-full" aria-hidden="true">
        <rect width="40" height="48" fill={SOIL[status]} />
        {plot.moisture > 78 ? (
          <rect
            width="40"
            height="48"
            fill="var(--color-canal)"
            opacity={0.12 + Math.min(0.28, (plot.moisture - 78) / 80)}
          />
        ) : null}
        {status === "dry" ? (
          <>
            <path
              d="M4 30 L18 22"
              stroke="var(--color-soil)"
              strokeWidth="0.6"
              opacity="0.45"
            />
            <path
              d="M22 38 L34 28"
              stroke="var(--color-soil)"
              strokeWidth="0.6"
              opacity="0.4"
            />
          </>
        ) : null}
        {stalks(plot, status)}
        {status === "pest"
          ? [8, 18, 27, 14].map((x, i) => (
              <circle
                key={x}
                cx={x}
                cy={20 + i * 4}
                r={2.1}
                fill="var(--color-plot-lesion)"
                opacity="0.7"
              />
            ))
          : null}
        {status === "nitrogen" ? (
          <rect width="40" height="48" fill="var(--color-plot-nitrogen)" opacity="0.18" />
        ) : null}
      </svg>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/45 to-transparent px-1 pb-0.5 pt-3">
        <span className="font-mono text-[9px] font-medium tracking-wide text-primary-foreground">
          {plot.id}
        </span>
        <span className="tabular text-[9px] text-primary-foreground/90">
          {Math.round(plot.moisture)}
        </span>
      </span>
    </button>
  );
}
