# Khet Sentinel

Interactive Aman rice field intelligence for a one-acre paddy in Paba, Rajshahi.
Built for Robofest Buildathon Track C (Agritech).

The acre is an **8 × 6 grid of 48 plots**. Each square is a management zone a
farmer can walk to. Rice texture shows crop condition. Irrigate, top-dress or
spot-treat only the plots that need it. Yield nowcast and blast scout run on
the device.

## What to open first

- **Field** — live grid, pause the clock, click a plot
- **Sensors** — 12-hour probe log
- **Advise** — yield nowcast, blast scan, next action
- **How it works** — farmer implementation, costs, 5-minute pitch script

## Documents for submission

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [docs/FEASIBILITY.md](docs/FEASIBILITY.md)
- [docs/AI_USAGE.md](docs/AI_USAGE.md)

## Stack

React 19, TanStack Start, Tailwind v4, Zustand, Recharts. No account. No cloud
database. Field state persists in the browser so the demo survives a dropped
connection.

## Pitch in one sentence

A Rajshahi rice farmer sees his acre as a labelled grid, acts only on the dry
ridge or the blast pocket, and keeps the log when 4G dies.
