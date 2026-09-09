# Khet Sentinel — system architecture

## What the system is

A phone-first field map for one acre of Aman rice. The acre is an 8×6 grid of
management plots. Each plot carries soil moisture, temperature, humidity,
nitrogen, pest load and grain-fill stage. The UI is the farmer's map; the
engine is a transparent scoring layer that can later be swapped for on-device
TinyML without changing the grid.

```
[Soil probes + optional leaf photo]
            │  ESP32 / solar / micro-SD
            ▼
   Edge log (offline-first)
            │  Bluetooth / opportunistic 4G
            ▼
   Khet Sentinel dashboard (this app)
     ├─ Field grid (plot texture = crop condition)
     ├─ Sensor strip + 12-hour log
     └─ Advise (yield nowcast, blast scout, actions)
```

## Layers

1. **Field layer** — 48 labelled plots (A1–F8). Spatial story: west/south canal
   wetter, north-east ridge dries, east-center blast pocket.
2. **Clock** — one simulated field-hour every ~2.2 s. Weather drives evaporation,
   rain and humidity. Farmer can pause.
3. **Decision layer** — irrigate / urea / spot fungicide apply only to the
   selected cluster. Advice is generated from plot classifiers, not a hidden net.
4. **Store** — Zustand + `localStorage`. Survives a dropped radio.

## Yield nowcast (replaceable)

`tonnes/ha = 6.2 × mean(moistureWindow, nitrogen, 1−pest, grainFill, stress)`

BRRI dhan48 baseline 6.2 t/ha. Confidence is a function of score tightness, not
a fake 99%.

## Blast scout (replaceable)

Plots with pest load ≥ 28 under humid-warm hours flag as rice blast. In
production this slot is a MobileNet-class leaf image model at the edge.

## Why this scales

- Same grid for 10 acres: more probes, same labels.
- LoRaWAN later for villages with no 4G.
- No personal data. No cloud bill on day one.
