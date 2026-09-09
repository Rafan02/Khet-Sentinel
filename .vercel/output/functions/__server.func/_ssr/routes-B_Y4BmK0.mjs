import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Pause, i as Play, l as Cloudy, n as Sun, r as RotateCcw, u as CloudRain } from "../_libs/lucide-react.mjs";
import { c as FARM_PLACE, i as averages, l as FARM_SIZE, n as useFarmStore, o as classify, r as STATUS_LABEL, s as FARM_NAME, u as cn } from "./router-Do5juM05.mjs";
import { t as Button } from "./button-za73LMAz.mjs";
import { a as CardTitle, i as CardHeader, n as CardBody, r as CardDescription, t as Card } from "./card-CDTq0Kms.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B_Y4BmK0.js
var import_jsx_runtime = require_jsx_runtime();
var STALK = {
	excellent: "var(--color-plot-excellent)",
	healthy: "var(--color-plot-healthy)",
	dry: "var(--color-plot-dry)",
	waterlogged: "var(--color-plot-wet)",
	pest: "var(--color-plot-pest)",
	nitrogen: "var(--color-plot-nitrogen)"
};
var SOIL = {
	excellent: "var(--color-plot-soil-ok)",
	healthy: "var(--color-plot-soil-ok)",
	dry: "var(--color-plot-soil-dry)",
	waterlogged: "var(--color-plot-soil-wet)",
	pest: "var(--color-plot-soil-pest)",
	nitrogen: "var(--color-plot-soil-ok)"
};
function stalks(plot, status) {
	const count = 9;
	const height = 10 + plot.growth / 100 * 22;
	const lean = status === "dry" ? 3.2 : status === "waterlogged" ? .4 : 1.1;
	const color = STALK[status];
	return Array.from({ length: count }, (_, i) => {
		const x = 3.2 + i * 3.8 + i % 2 * .4;
		const h = height + i * 7 % 5 - 2;
		const tipX = x + (i % 2 === 0 ? -lean : lean);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: `M ${x} 46 Q ${x + (tipX - x) * .4} ${46 - h * .55} ${tipX} ${46 - h}`,
			stroke: color,
			strokeWidth: status === "excellent" ? 1.55 : 1.25,
			strokeLinecap: "round",
			fill: "none"
		}, i);
	});
}
function PlotCell({ plot, selected, highlighted, onClick }) {
	const status = classify(plot);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: (e) => onClick(e.shiftKey || e.metaKey),
		"aria-pressed": selected,
		"aria-label": `Plot ${plot.id}, ${STATUS_LABEL[status]}, moisture ${Math.round(plot.moisture)} percent`,
		className: cn("relative aspect-square overflow-hidden rounded-sm outline-none transition-[box-shadow,transform] duration-[var(--motion-quick)] ease-[var(--ease-out)]", "focus-visible:ring-2 focus-visible:ring-ring", selected && "z-10 ring-2 ring-primary ring-offset-1 ring-offset-bg", highlighted && !selected && "ring-2 ring-danger/80"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 40 48",
			className: "block size-full",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: "40",
					height: "48",
					fill: SOIL[status]
				}),
				plot.moisture > 78 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: "40",
					height: "48",
					fill: "var(--color-canal)",
					opacity: .12 + Math.min(.28, (plot.moisture - 78) / 80)
				}) : null,
				status === "dry" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M4 30 L18 22",
					stroke: "var(--color-soil)",
					strokeWidth: "0.6",
					opacity: "0.45"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M22 38 L34 28",
					stroke: "var(--color-soil)",
					strokeWidth: "0.6",
					opacity: "0.4"
				})] }) : null,
				stalks(plot, status),
				status === "pest" ? [
					8,
					18,
					27,
					14
				].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: x,
					cy: 20 + i * 4,
					r: 2.1,
					fill: "var(--color-plot-lesion)",
					opacity: "0.7"
				}, x)) : null,
				status === "nitrogen" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: "40",
					height: "48",
					fill: "var(--color-plot-nitrogen)",
					opacity: "0.18"
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/45 to-transparent px-1 pb-0.5 pt-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[9px] font-medium tracking-wide text-primary-foreground",
				children: plot.id
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular text-[9px] text-primary-foreground/90",
				children: Math.round(plot.moisture)
			})]
		})]
	});
}
function FieldGrid({ plots, selectedIds, highlightIds, onSelect }) {
	const selected = new Set(selectedIds);
	const highlighted = new Set(highlightIds);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "field-board rounded-xl p-3 shadow-[var(--shadow-border)] sm:p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-ink/70",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "North bund · road" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "1 acre · 48 plots" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden w-5 flex-col justify-around py-1 font-mono text-[10px] text-ink/55 sm:flex",
					children: Array.from({ length: 6 }, (_, r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: String.fromCharCode(65 + r) }, r))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-1",
						style: { gridTemplateColumns: `repeat(8, minmax(0, 1fr))` },
						children: plots.map((plot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlotCell, {
							plot,
							selected: selected.has(plot.id),
							highlighted: highlighted.has(plot.id),
							onClick: (additive) => onSelect(plot.id, additive)
						}, plot.id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1.5 grid grid-cols-8 font-mono text-[10px] text-ink/55",
						children: Array.from({ length: 8 }, (_, c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-center",
							children: c + 1
						}, c))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center justify-between text-[11px] text-ink/70",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "West canal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "South drain" })]
			})
		]
	});
}
var SWATCH = [
	{
		status: "excellent",
		className: "bg-plot-excellent"
	},
	{
		status: "healthy",
		className: "bg-plot-healthy"
	},
	{
		status: "dry",
		className: "bg-plot-dry"
	},
	{
		status: "waterlogged",
		className: "bg-plot-wet"
	},
	{
		status: "pest",
		className: "bg-plot-pest"
	},
	{
		status: "nitrogen",
		className: "bg-plot-nitrogen"
	}
];
function FieldLegend() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted",
		children: SWATCH.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-2.5 rounded-full ${item.className}` }), STATUS_LABEL[item.status]]
		}, item.status))
	});
}
function Meter({ label, value, unit, good }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1 flex items-baseline justify-between text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "tabular font-medium",
			children: [value.toFixed(value >= 20 ? 0 : 1), unit]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-1.5 overflow-hidden rounded-full bg-secondary",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `h-full rounded-full ${good ? "bg-primary" : "bg-warn"}`,
			style: { width: `${Math.max(6, Math.min(100, value))}%` }
		})
	})] });
}
function Inspector({ plots, onIrrigate, onFertilize, onTreat, onClear }) {
	if (!plots.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Walk the field" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Tap a square to inspect that plot. Shift-click to select a cluster. Labels match stakes a farmer would plant on the bund (A1 is the north-west corner)." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardBody, {
		className: "text-sm leading-relaxed text-muted",
		children: "This grid is one acre of Aman rice in Paba, Rajshahi — not a toy map. Each cell is a management zone of about 85 m². Texture is the crop: tall deep-green stalks are filling grain; straw-leaning stalks are thirsty; rusty blotches are blast."
	})] });
	const plot = plots[0];
	const status = classify(plot);
	const many = plots.length > 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] uppercase tracking-[0.16em] text-muted",
			children: many ? `${plots.length} plots selected` : "Plot inspector"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: many ? plots.map((p) => p.id).join(" · ") : plot.id }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: many ? "Actions apply only to the selected cluster — the rest of the acre stays untouched." : STATUS_LABEL[status] })
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardBody, {
		className: "space-y-4",
		children: [
			!many ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						label: "Soil moisture",
						value: plot.moisture,
						unit: "%",
						good: plot.moisture >= 50 && plot.moisture <= 82
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						label: "Canopy nitrogen",
						value: plot.nitrogen,
						unit: "",
						good: plot.nitrogen >= 45
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						label: "Pest load",
						value: plot.pestLoad,
						unit: "",
						good: plot.pestLoad < 28
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						label: "Grain fill",
						value: plot.growth,
						unit: "",
						good: plot.growth >= 55
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							"Air ",
							plot.temperature.toFixed(1),
							"°C · RH ",
							plot.humidity.toFixed(0),
							"%"
						]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Average moisture",
					" ",
					(plots.reduce((a, p) => a + p.moisture, 0) / plots.length).toFixed(0),
					"% across the cluster."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: onIrrigate,
						children: "Irrigate"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: onFertilize,
						children: "Urea"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: onTreat,
						children: "Treat"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onClear,
				className: "text-xs text-muted underline-offset-2 hover:underline",
				children: "Clear selection"
			})
		]
	})] });
}
function SkyIcon({ sky }) {
	if (sky === "rain") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudRain, {
		className: "size-4",
		strokeWidth: 1.75
	});
	if (sky === "cloud") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloudy, {
		className: "size-4",
		strokeWidth: 1.75
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {
		className: "size-4",
		strokeWidth: 1.75
	});
}
var SKY_COPY = {
	clear: "Clear, high evaporative demand",
	haze: "Haze, typical Rajshahi morning",
	cloud: "Building cloud, hold irrigation",
	rain: "Rain on the bund — skip the pump"
};
function WeatherBar({ weather, playing, onToggle, onReset }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center justify-between gap-3 rounded-lg bg-surface-2 px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-9 items-center justify-center rounded-md bg-card text-accent",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkyIcon, { sky: weather.sky })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm font-medium",
				children: [
					"Aman day ",
					weather.day,
					" · ",
					String(weather.hour).padStart(2, "0"),
					":00"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: SKY_COPY[weather.sky]
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-3 text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular",
					children: [
						weather.temp.toFixed(1),
						"°C",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1 text-xs text-muted",
							children: "air"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular",
					children: [
						weather.humidity.toFixed(0),
						"%",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1 text-xs text-muted",
							children: "RH"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular",
					children: [
						weather.rainfallMm.toFixed(1),
						" mm",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1 text-xs text-muted",
							children: "rain"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: onToggle,
					children: [playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), playing ? "Pause clock" : "Run clock"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: onReset,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "Reset field"]
				})
			]
		})]
	});
}
function Home() {
	const plots = useFarmStore((s) => s.plots);
	const weather = useFarmStore((s) => s.weather);
	const selectedIds = useFarmStore((s) => s.selectedIds);
	const playing = useFarmStore((s) => s.playing);
	const pestFinding = useFarmStore((s) => s.pestFinding);
	const select = useFarmStore((s) => s.select);
	const irrigate = useFarmStore((s) => s.irrigate);
	const fertilize = useFarmStore((s) => s.fertilize);
	const treat = useFarmStore((s) => s.treat);
	const clearSelection = useFarmStore((s) => s.clearSelection);
	const togglePlay = useFarmStore((s) => s.togglePlay);
	const reset = useFarmStore((s) => s.reset);
	const selected = plots.filter((p) => selectedIds.includes(p.id));
	const avg = averages(plots);
	const highlightIds = pestFinding?.plotIds ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] uppercase tracking-[0.18em] text-muted",
							children: [
								FARM_NAME,
								" · ",
								FARM_PLACE
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 text-3xl font-medium tracking-tight md:text-4xl",
							children: "Live field grid"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 max-w-xl text-sm leading-relaxed text-muted",
							children: [FARM_SIZE, ". Each square is a real management zone a farmer can walk to. Color and rice texture are the crop — not decoration."]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "grid grid-cols-3 gap-4 text-right",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Moisture",
								value: `${avg.moisture.toFixed(0)}%`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Blast load",
								value: avg.pestLoad.toFixed(0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Grain fill",
								value: `${avg.growth.toFixed(0)}%`
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeatherBar, {
					weather,
					playing,
					onToggle: togglePlay,
					onReset: reset
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldGrid, {
					plots,
					selectedIds,
					highlightIds,
					onSelect: select
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLegend, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Clock runs one field-hour every few seconds. Pause it when you want to talk through a plot. Shift-click to paint a cluster."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "space-y-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inspector, {
				plots: selected,
				onIrrigate: irrigate,
				onFertilize: fertilize,
				onTreat: treat,
				onClear: clearSelection
			})
		})]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-[11px] uppercase tracking-[0.14em] text-muted",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "font-display text-2xl tabular font-medium",
		children: value
	})] });
}
//#endregion
export { Home as component };
