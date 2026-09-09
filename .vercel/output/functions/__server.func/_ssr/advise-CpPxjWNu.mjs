import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as buildAdvice, n as useFarmStore } from "./router-Do5juM05.mjs";
import { t as Button } from "./button-za73LMAz.mjs";
import { a as CardTitle, i as CardHeader, n as CardBody, r as CardDescription, t as Card } from "./card-CDTq0Kms.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/advise-CpPxjWNu.js
var import_jsx_runtime = require_jsx_runtime();
var URGENCY = {
	now: "Act now",
	soon: "This week",
	watch: "Hold"
};
function AdviceList({ plots }) {
	const applyAdvice = useFarmStore((s) => s.applyAdvice);
	const items = buildAdvice(plots);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardBody, {
			className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-[0.16em] text-muted",
					children: URGENCY[item.urgency]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-display text-lg font-medium",
					children: item.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-xl text-sm leading-relaxed text-muted",
					children: item.detail
				})
			] }), item.action !== "none" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: item.urgency === "now" ? "default" : "outline",
				onClick: () => applyAdvice(item),
				children: "Do this"
			}) : null]
		}) }, item.id))
	});
}
function AdvisePage() {
	const plots = useFarmStore((s) => s.plots);
	const yieldResult = useFarmStore((s) => s.yieldResult);
	const pestFinding = useFarmStore((s) => s.pestFinding);
	const predict = useFarmStore((s) => s.predict);
	const scan = useFarmStore((s) => s.scan);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-[0.18em] text-muted",
					children: "Plot-level advice · not a black box"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-3xl font-medium tracking-tight md:text-4xl",
					children: "Yield, blast, next action"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted",
					children: "The models here are transparent scoring rules a judge can read — the same shape a later TinyML model would sit in. They run on the phone. No cloud required."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Aman yield nowcast" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "BRRI dhan48 baseline 6.2 t/ha, scored by moisture window, nitrogen, blast load and grain-fill stage." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardBody, {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: predict,
						children: "Run yield nowcast"
					}), yieldResult ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-5xl tabular font-medium",
							children: [yieldResult.tonnesPerHa.toFixed(2), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-lg text-muted",
								children: "t/ha"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								yieldResult.confidence,
								"% confidence · ",
								yieldResult.variety
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-2",
							children: yieldResult.drivers.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: d.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular",
									children: d.score
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 h-1.5 overflow-hidden rounded-full bg-secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-primary",
									style: { width: `${d.score}%` }
								})
							})] }, d.label))
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Run the nowcast after you irrigate or treat — the number should move."
					})]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Blast scout" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Flags plots whose pest load crossed 28 under humid, warm hours — the same rule a camera model would output as a heat map." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardBody, {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: scan,
						children: "Scan canopy"
					}), pestFinding ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl font-medium",
							children: pestFinding.disease
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								pestFinding.confidence,
								"% confidence",
								pestFinding.plotIds.length ? ` · ${pestFinding.plotIds.join(", ")}` : ""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed",
							children: pestFinding.note
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Scan once, then jump back to the field — infected plots light up on the grid."
					})]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-medium",
					children: "What to do this hour"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdviceList, { plots })]
			})
		]
	});
}
//#endregion
export { AdvisePage as component };
