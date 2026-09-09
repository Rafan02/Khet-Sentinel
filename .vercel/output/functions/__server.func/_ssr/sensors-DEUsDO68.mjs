import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as averages, n as useFarmStore } from "./router-Do5juM05.mjs";
import { a as CardTitle, i as CardHeader, n as CardBody, r as CardDescription, t as Card } from "./card-CDTq0Kms.mjs";
import { a as CartesianGrid, c as Legend, i as Line, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as LineChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sensors-DEUsDO68.js
var import_jsx_runtime = require_jsx_runtime();
function SensorsPage() {
	const plots = useFarmStore((s) => s.plots);
	const history = useFarmStore((s) => s.history);
	const weather = useFarmStore((s) => s.weather);
	const avg = averages(plots);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-[0.18em] text-muted",
					children: "Probe network · 48 plots, 6 zone clusters"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-3xl font-medium tracking-tight md:text-4xl",
					children: "What the sensors see"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted",
					children: "In the field, four to six cheap probes sit in the same zones as this grid. The dashboard averages them the way a farmer reads a bund: moisture first, then heat, then humidity that feeds blast."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Soil moisture",
						value: `${avg.moisture.toFixed(0)}%`,
						hint: "Sweet spot 55–80"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Canopy air",
						value: `${avg.temperature.toFixed(1)}°C`,
						hint: `Sky ${weather.sky}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Humidity",
						value: `${avg.humidity.toFixed(0)}%`,
						hint: "Blast likes >70"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Rain this hour",
						value: `${weather.rainfallMm.toFixed(1)} mm`,
						hint: "Skip pump if >2"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Last twelve field-hours" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Simulated probe log stored on-device. This is the same series a farmer would keep when the tower is offline." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardBody, {
				className: "h-72",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data: history,
						margin: {
							top: 8,
							right: 8,
							left: 0,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--color-border)",
								strokeDasharray: "3 6"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "hourLabel",
								tick: {
									fill: "var(--color-muted)",
									fontSize: 11
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: {
								fill: "var(--color-muted)",
								fontSize: 11
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								background: "var(--color-card)",
								border: "1px solid var(--color-border)",
								borderRadius: 8
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "moisture",
								name: "Moisture %",
								stroke: "var(--color-primary)",
								strokeWidth: 2,
								dot: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "temp",
								name: "Temp °C",
								stroke: "var(--color-warn)",
								strokeWidth: 2,
								dot: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "humidity",
								name: "RH %",
								stroke: "var(--color-accent)",
								strokeWidth: 2,
								dot: false
							})
						]
					})
				})
			})] })
		]
	});
}
function Kpi({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardBody, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] uppercase tracking-[0.14em] text-muted",
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-3xl tabular font-medium",
			children: value
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-muted",
			children: hint
		})
	] }) });
}
//#endregion
export { SensorsPage as component };
