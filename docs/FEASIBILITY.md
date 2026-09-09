# Khet Sentinel — feasibility & scalability

**Farm:** 1.0 acre Aman paddy, Paba, Rajshahi, BRRI dhan48.
**User:** smallholder with a feature Android and intermittent 4G.
**Constraint:** must work after the tower drops.

## Feasible this season

| Need | How this build answers it |
| --- | --- |
| Know which part of the acre is dry | Grid labels + moisture texture |
| Avoid blanket urea / fungicide | Actions scoped to selected plots |
| Keep a log without internet | `localStorage` / micro-SD on ESP32 |
| Afford a trial | ৳5–8k hardware on one acre |
| Explain the “AI” | Scoring rules in `src/lib/farm/engine.ts` |

Hardware: 4–6 capacitive probes, ESP32, 6 W solar, existing phone. Labour: one
afternoon to stake A1–F8. Power: solar + sleep cycle, not a mains pump house.

## Sustainable

Spot irrigation on the north-east ridge and spot fungicide on C6–D7 cut water
and chemistry versus flooding the whole acre. Data stays on the device. Aligns
with SDG 2 (yield, less loss) and SDG 13 (fewer diesel pump hours).

## Scalable

- 1 acre → 10 acres by repeating the 48-plot pattern per acre.
- Village roll-out: one dashboard, many field IDs.
- Model slot: replace the scoring functions with a `.tflite` later; the grid
  contract does not change.
- Offline-first means the product still functions in haor and char pockets.

## Risks we already designed around

- Probe drift → farmer still walks the named plot; the grid never replaces eyes.
- Rain/flood → waterlogged classifier tells them to drop the canal gate.
- Over-trust in a number → confidence and drivers are shown, not a single score.

## Economics (order-of-magnitude)

If the nowcast prevents one wasted irrigation on a diesel pump and one blanket
fungicide pass, the trial kit pays back inside a single Aman season on a
typical Rajshahi acre.
