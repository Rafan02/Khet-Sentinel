import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { buildAdvice } from "@/lib/farm/engine";
import { useFarmStore } from "@/lib/farm/store";
import type { Plot } from "@/lib/farm/types";

const URGENCY = {
  now: "Act now",
  soon: "This week",
  watch: "Hold",
} as const;

export function AdviceList({ plots }: { plots: Plot[] }) {
  const applyAdvice = useFarmStore((s) => s.applyAdvice);
  const items = buildAdvice(plots);

  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <Card key={item.id}>
          <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                {URGENCY[item.urgency]}
              </p>
              <h3 className="mt-1 font-display text-lg font-medium">{item.title}</h3>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">
                {item.detail}
              </p>
            </div>
            {item.action !== "none" ? (
              <Button
                size="sm"
                variant={item.urgency === "now" ? "default" : "outline"}
                onClick={() => applyAdvice(item)}
              >
                Do this
              </Button>
            ) : null}
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
