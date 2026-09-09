import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/guide")({ component: GuidePage });

function GuidePage() {
  return (
    <article className="space-y-8">
      <header className="max-w-2xl">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
          Track C · Agritech · how to talk about this
        </p>
        <h1 className="mt-1 text-3xl font-medium tracking-tight md:text-4xl">
          What this field is, and how a farmer uses it
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          The grid is the farm. It is not a game board. Say that first in the
          five-minute pitch, then click three plots, irrigate the dry ridge,
          and scan for blast.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>The field</CardTitle>
            <CardDescription>One acre, Paba upazila, Rajshahi</CardDescription>
          </CardHeader>
          <CardBody className="space-y-3 text-sm leading-relaxed">
            <p>
              Aman rice, variety BRRI dhan48, day 62 of the season — panicle
              to early grain fill. The acre is split into an 8 × 6 grid of 48
              plots. Each plot is about 85 m², the size a farmer already walks
              when he checks a bund.
            </p>
            <p>
              Rows A–F run south from the road. Columns 1–8 run east from the
              canal. A1 is the north-west corner. F1 sits on the canal. The
              north-east ridge (A6–B8) dries first. The east-center pocket
              (C6–D7) is where blast starts after humid nights.
            </p>
            <p>
              Texture is the crop. Tall deep-green stalks = grain fill.
              Straw-leaning stalks = moisture stress. Standing-water sheen =
              canal too high. Rust blotches = blast. Pale wash = nitrogen fade.
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How a farmer implements it</CardTitle>
            <CardDescription>Four probes, a phone, no tower required</CardDescription>
          </CardHeader>
          <CardBody className="space-y-3 text-sm leading-relaxed">
            <ol className="list-decimal space-y-2 pl-4">
              <li>Stake the acre into the same 48 labels, or into 6 clusters (A, B, C…).</li>
              <li>
                Push one cheap capacitive moisture + temperature probe into each
                cluster (~৳800–1,200 each).
              </li>
              <li>
                Wire them to an ESP32 with a 6 W solar panel. Data stays on a
                micro-SD card when 4G drops.
              </li>
              <li>
                Open this dashboard on the phone. Plots that need walking are
                already named. The farmer goes to C6, not “the wet bit.”
              </li>
              <li>
                Optional: one phone-camera photo of a sick leaf. The blast scout
                on Advise is the placeholder for that classifier.
              </li>
            </ol>
          </CardBody>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>What it costs to try on one acre</CardTitle>
          <CardDescription>Numbers you can defend in feasibility</CardDescription>
        </CardHeader>
        <CardBody className="overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="text-[11px] uppercase tracking-[0.14em] text-muted">
              <tr>
                <th className="pb-2 font-medium">Piece</th>
                <th className="pb-2 font-medium">Role</th>
                <th className="pb-2 font-medium">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <Row a="4–6 soil probes" b="Moisture + temp per zone" c="৳3,500–6,000" />
              <Row a="ESP32 + solar" b="Edge logger, offline store" c="৳1,800–2,500" />
              <Row a="Phone (existing)" b="This dashboard" c="৳0 extra" />
              <Row a="Optional leaf camera" b="Blast photo" c="৳1,200" />
              <Row a="First season labour" b="Stake plots, one afternoon" c="half a day" />
            </tbody>
          </table>
          <p className="mt-4 text-sm text-muted">
            Water saved on the dry ridge and urea not dumped on healthy plots
            is the payback. The point is not more chemicals — it is fewer, in
            the right squares.
          </p>
        </CardBody>
      </Card>

      <section className="grid gap-4 md:grid-cols-3">
        <PitchCard
          k="0:00–1:00"
          t="Show the acre"
          d="Open the field. Name Rajshahi, Aman, BRRI dhan48. Point at the dry ridge and the blast pocket. Pause the clock."
        />
        <PitchCard
          k="1:00–3:00"
          t="Act on two plots"
          d="Select A7, irrigate. Scan canopy on Advise. Treat C6–D7 only. Yield nowcast should tick up. That is precision, not a blanket spray."
        />
        <PitchCard
          k="3:00–5:00"
          t="Feasibility"
          d="Probes, ESP32, offline store, ৳5–8k per acre. Scale by cloning the grid, not rebuilding software. SDG 2 and 13."
        />
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-medium">GitHub, docs, and the Buildathon packet</h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          Judges want a public repo with real commits, a working prototype,
          architecture, and a one-page feasibility note. They also want every
          AI prompt written down. This app already contains those documents
          in the repo. You do not need a 3-minute video unless you reach the
          on-site final — then walk this same field on a laptop.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Put it on GitHub</CardTitle>
            </CardHeader>
            <CardBody className="space-y-2 text-sm leading-relaxed">
              <p>1. Create an empty public repo named khet-sentinel.</p>
              <p>2. Upload this project folder (or push from PyCharm: Git → GitHub → Share Project).</p>
              <p>3. Commit in small pieces with clear messages: field grid, sensors, yield rules, docs.</p>
              <p>4. Paste the live prototype link in the README.</p>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What to submit</CardTitle>
            </CardHeader>
            <CardBody className="space-y-2 text-sm leading-relaxed">
              <p>Public GitHub link with commit history.</p>
              <p>This running prototype.</p>
              <p>
                <code className="rounded-sm bg-secondary px-1.5 py-0.5 text-xs">docs/ARCHITECTURE.md</code>{" "}
                and{" "}
                <code className="rounded-sm bg-secondary px-1.5 py-0.5 text-xs">docs/FEASIBILITY.md</code>.
              </p>
              <p>
                <code className="rounded-sm bg-secondary px-1.5 py-0.5 text-xs">docs/AI_USAGE.md</code>{" "}
                so undocumented AI cannot disqualify you.
              </p>
            </CardBody>
          </Card>
        </div>
      </section>

      <p className="text-sm text-muted">
        Start on the{" "}
        <Link to="/" className="text-primary underline-offset-2 hover:underline">
          field grid
        </Link>{" "}
        and keep this page open as your pitch script.
      </p>
    </article>
  );
}

function Row({ a, b, c }: { a: string; b: string; c: string }) {
  return (
    <tr>
      <td className="py-2.5 font-medium">{a}</td>
      <td className="py-2.5 text-muted">{b}</td>
      <td className="py-2.5 tabular">{c}</td>
    </tr>
  );
}

function PitchCard({ k, t, d }: { k: string; t: string; d: string }) {
  return (
    <Card>
      <CardHeader>
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted">{k}</p>
        <CardTitle>{t}</CardTitle>
      </CardHeader>
      <CardBody className="text-sm leading-relaxed text-muted">{d}</CardBody>
    </Card>
  );
}
