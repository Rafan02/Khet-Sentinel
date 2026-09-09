import { useEffect } from "react";
import { useFarmStore } from "@/lib/farm/store";

export function SimulationHost() {
  const hydrate = useFarmStore((s) => s.hydrate);
  const tick = useFarmStore((s) => s.tick);
  const playing = useFarmStore((s) => s.playing);
  const toast = useFarmStore((s) => s.toast);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(tick, 3600);
    return () => window.clearInterval(id);
  }, [playing, tick]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => {
      useFarmStore.setState({ toast: null });
    }, 2800);
    return () => window.clearTimeout(id);
  }, [toast]);

  if (!toast) return null;

  return (
    <div
      role="status"
      className="pointer-events-none fixed bottom-20 left-1/2 z-40 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-sm text-primary-foreground shadow-[var(--shadow-border)] md:bottom-8"
    >
      {toast}
    </div>
  );
}
