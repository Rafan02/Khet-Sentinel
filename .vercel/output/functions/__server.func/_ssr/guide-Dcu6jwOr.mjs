import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as CardTitle, i as CardHeader, n as CardBody, r as CardDescription, t as Card } from "./card-CDTq0Kms.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guide-Dcu6jwOr.js
var import_jsx_runtime = require_jsx_runtime();
function GuidePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] uppercase tracking-[0.18em] text-muted",
						children: "Track C · Agritech · how to talk about this"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 text-3xl font-medium tracking-tight md:text-4xl",
						children: "What this field is, and how a farmer uses it"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-base leading-relaxed text-muted",
						children: "The grid is the farm. It is not a game board. Say that first in the five-minute pitch, then click three plots, irrigate the dry ridge, and scan for blast."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "The field" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "One acre, Paba upazila, Rajshahi" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardBody, {
					className: "space-y-3 text-sm leading-relaxed",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Aman rice, variety BRRI dhan48, day 62 of the season — panicle to early grain fill. The acre is split into an 8 × 6 grid of 48 plots. Each plot is about 85 m², the size a farmer already walks when he checks a bund." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Rows A–F run south from the road. Columns 1–8 run east from the canal. A1 is the north-west corner. F1 sits on the canal. The north-east ridge (A6–B8) dries first. The east-center pocket (C6–D7) is where blast starts after humid nights." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Texture is the crop. Tall deep-green stalks = grain fill. Straw-leaning stalks = moisture stress. Standing-water sheen = canal too high. Rust blotches = blast. Pale wash = nitrogen fade." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "How a farmer implements it" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Four probes, a phone, no tower required" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardBody, {
					className: "space-y-3 text-sm leading-relaxed",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "list-decimal space-y-2 pl-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Stake the acre into the same 48 labels, or into 6 clusters (A, B, C…)." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Push one cheap capacitive moisture + temperature probe into each cluster (~৳800–1,200 each)." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Wire them to an ESP32 with a 6 W solar panel. Data stays on a micro-SD card when 4G drops." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Open this dashboard on the phone. Plots that need walking are already named. The farmer goes to C6, not “the wet bit.”" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Optional: one phone-camera photo of a sick leaf. The blast scout on Advise is the placeholder for that classifier." })
						]
					})
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "What it costs to try on one acre" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Numbers you can defend in feasibility" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardBody, {
				className: "overflow-x-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[32rem] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-[11px] uppercase tracking-[0.14em] text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Piece"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Role"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Cost"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
						className: "divide-y divide-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								a: "4–6 soil probes",
								b: "Moisture + temp per zone",
								c: "৳3,500–6,000"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								a: "ESP32 + solar",
								b: "Edge logger, offline store",
								c: "৳1,800–2,500"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								a: "Phone (existing)",
								b: "This dashboard",
								c: "৳0 extra"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								a: "Optional leaf camera",
								b: "Blast photo",
								c: "৳1,200"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								a: "First season labour",
								b: "Stake plots, one afternoon",
								c: "half a day"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "Water saved on the dry ridge and urea not dumped on healthy plots is the payback. The point is not more chemicals — it is fewer, in the right squares."
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PitchCard, {
						k: "0:00–1:00",
						t: "Show the acre",
						d: "Open the field. Name Rajshahi, Aman, BRRI dhan48. Point at the dry ridge and the blast pocket. Pause the clock."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PitchCard, {
						k: "1:00–3:00",
						t: "Act on two plots",
						d: "Select A7, irrigate. Scan canopy on Advise. Treat C6–D7 only. Yield nowcast should tick up. That is precision, not a blanket spray."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PitchCard, {
						k: "3:00–5:00",
						t: "Feasibility",
						d: "Probes, ESP32, offline store, ৳5–8k per acre. Scale by cloning the grid, not rebuilding software. SDG 2 and 13."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-medium",
						children: "GitHub, docs, and the Buildathon packet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-2xl text-sm leading-relaxed text-muted",
						children: "Judges want a public repo with real commits, a working prototype, architecture, and a one-page feasibility note. They also want every AI prompt written down. This app already contains those documents in the repo. You do not need a 3-minute video unless you reach the on-site final — then walk this same field on a laptop."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Put it on GitHub" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardBody, {
							className: "space-y-2 text-sm leading-relaxed",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "1. Create an empty public repo named khet-sentinel." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "2. Upload this project folder (or push from PyCharm: Git → GitHub → Share Project)." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "3. Commit in small pieces with clear messages: field grid, sensors, yield rules, docs." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "4. Paste the live prototype link in the README." })
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "What to submit" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardBody, {
							className: "space-y-2 text-sm leading-relaxed",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Public GitHub link with commit history." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This running prototype." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "rounded-sm bg-secondary px-1.5 py-0.5 text-xs",
										children: "docs/ARCHITECTURE.md"
									}),
									" ",
									"and",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "rounded-sm bg-secondary px-1.5 py-0.5 text-xs",
										children: "docs/FEASIBILITY.md"
									}),
									"."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "rounded-sm bg-secondary px-1.5 py-0.5 text-xs",
										children: "docs/AI_USAGE.md"
									}),
									" ",
									"so undocumented AI cannot disqualify you."
								] })
							]
						})] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Start on the",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-primary underline-offset-2 hover:underline",
						children: "field grid"
					}),
					" ",
					"and keep this page open as your pitch script."
				]
			})
		]
	});
}
function Row({ a, b, c }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: "py-2.5 font-medium",
			children: a
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: "py-2.5 text-muted",
			children: b
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: "py-2.5 tabular",
			children: c
		})
	] });
}
function PitchCard({ k, t, d }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-[11px] uppercase tracking-[0.16em] text-muted",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: t })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardBody, {
		className: "text-sm leading-relaxed text-muted",
		children: d
	})] });
}
//#endregion
export { GuidePage as component };
