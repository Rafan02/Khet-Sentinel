import { STATUS_LABEL } from "@/lib/farm/engine";
import type { PlotStatus } from "@/lib/farm/types";

const SWATCH: { status: PlotStatus; className: string }[] = [
  { status: "excellent", className: "bg-plot-excellent" },
  { status: "healthy", className: "bg-plot-healthy" },
  { status: "dry", className: "bg-plot-dry" },
  { status: "waterlogged", className: "bg-plot-wet" },
  { status: "pest", className: "bg-plot-pest" },
  { status: "nitrogen", className: "bg-plot-nitrogen" },
];

export function FieldLegend() {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
      {SWATCH.map((item) => (
        <li key={item.status} className="flex items-center gap-2">
          <span className={`size-2.5 rounded-full ${item.className}`} />
          {STATUS_LABEL[item.status]}
        </li>
      ))}
    </ul>
  );
}
