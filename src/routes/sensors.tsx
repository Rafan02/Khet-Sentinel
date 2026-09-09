import { createFileRoute } from "@tanstack/react-router";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { averages } from "@/lib/farm/engine";
import { useFarmStore } from "@/lib/farm/store";

export const Route = createFileRoute("/sensors")({ component: SensorsPage });

function SensorsPage() {
  const plots = useFarmStore((s) => s.plots);
  const history = useFarmStore((s) => s.history);
  const weather = useFarmStore((s) => s.weather);
  const avg = averages(plots);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
          Probe network · 48 plots, 6 zone clusters
        </p>
        <h1 className="mt-1 text-3xl font-medium tracking-tight md:text-4xl">
          What the sensors see
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          In the field, four to six cheap probes sit in the same zones as this
          grid. The dashboard averages them the way a farmer reads a bund:
          moisture first, then heat, then humidity that feeds blast.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Soil moisture" value={`${avg.moisture.toFixed(0)}%`} hint="Sweet spot 55–80" />
        <Kpi label="Canopy air" value={`${avg.temperature.toFixed(1)}°C`} hint={`Sky ${weather.sky}`} />
        <Kpi label="Humidity" value={`${avg.humidity.toFixed(0)}%`} hint="Blast likes >70" />
        <Kpi label="Rain this hour" value={`${weather.rainfallMm.toFixed(1)} mm`} hint="Skip pump if >2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Last twelve field-hours</CardTitle>
          <CardDescription>
            Simulated probe log stored on-device. This is the same series a
            farmer would keep when the tower is offline.
          </CardDescription>
        </CardHeader>
        <CardBody className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 6" />
              <XAxis dataKey="hourLabel" tick={{ fill: "var(--color-muted)", fontSize: 11 }} />
              <YAxis tick={{ fill: "var(--color-muted)", fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="moisture"
                name="Moisture %"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="temp"
                name="Temp °C"
                stroke="var(--color-warn)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="humidity"
                name="RH %"
                stroke="var(--color-accent)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </div>
  );
}

function Kpi({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <Card>
      <CardBody>
        <p className="text-[11px] uppercase tracking-[0.14em] text-muted">{label}</p>
        <p className="mt-1 font-display text-3xl tabular font-medium">{value}</p>
        <p className="mt-1 text-xs text-muted">{hint}</p>
      </CardBody>
    </Card>
  );
}
