import { createFileRoute } from "@tanstack/react-router";
import { AdviceList } from "@/components/advise/AdviceList";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFarmStore } from "@/lib/farm/store";

export const Route = createFileRoute("/advise")({ component: AdvisePage });

function AdvisePage() {
  const plots = useFarmStore((s) => s.plots);
  const yieldResult = useFarmStore((s) => s.yieldResult);
  const pestFinding = useFarmStore((s) => s.pestFinding);
  const predict = useFarmStore((s) => s.predict);
  const scan = useFarmStore((s) => s.scan);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
          Plot-level advice · not a black box
        </p>
        <h1 className="mt-1 text-3xl font-medium tracking-tight md:text-4xl">
          Yield, blast, next action
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          The models here are transparent scoring rules a judge can read — the
          same shape a later TinyML model would sit in. They run on the phone.
          No cloud required.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Aman yield nowcast</CardTitle>
            <CardDescription>
              BRRI dhan48 baseline 6.2 t/ha, scored by moisture window,
              nitrogen, blast load and grain-fill stage.
            </CardDescription>
          </CardHeader>
          <CardBody className="space-y-4">
            <Button onClick={predict}>Run yield nowcast</Button>
            {yieldResult ? (
              <div>
                <p className="font-display text-5xl tabular font-medium">
                  {yieldResult.tonnesPerHa.toFixed(2)}
                  <span className="ml-2 text-lg text-muted">t/ha</span>
                </p>
                <p className="mt-1 text-sm text-muted">
                  {yieldResult.confidence}% confidence · {yieldResult.variety}
                </p>
                <ul className="mt-4 space-y-2">
                  {yieldResult.drivers.map((d) => (
                    <li key={d.label}>
                      <div className="flex justify-between text-xs">
                        <span>{d.label}</span>
                        <span className="tabular">{d.score}</span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${d.score}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-muted">
                Run the nowcast after you irrigate or treat — the number should
                move.
              </p>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blast scout</CardTitle>
            <CardDescription>
              Flags plots whose pest load crossed 28 under humid, warm hours —
              the same rule a camera model would output as a heat map.
            </CardDescription>
          </CardHeader>
          <CardBody className="space-y-4">
            <Button variant="outline" onClick={scan}>
              Scan canopy
            </Button>
            {pestFinding ? (
              <div>
                <p className="font-display text-2xl font-medium">{pestFinding.disease}</p>
                <p className="mt-1 text-sm text-muted">
                  {pestFinding.confidence}% confidence
                  {pestFinding.plotIds.length
                    ? ` · ${pestFinding.plotIds.join(", ")}`
                    : ""}
                </p>
                <p className="mt-3 text-sm leading-relaxed">{pestFinding.note}</p>
              </div>
            ) : (
              <p className="text-sm text-muted">
                Scan once, then jump back to the field — infected plots light
                up on the grid.
              </p>
            )}
          </CardBody>
        </Card>
      </div>

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-medium">What to do this hour</h2>
        <AdviceList plots={plots} />
      </section>
    </div>
  );
}
