import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createRootRoute, b as require_jsx_runtime, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Droplets, d as ChartLine, f as BookOpen, o as Map$1, s as LayoutGrid, t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Do5juM05.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var NAV = [
	{
		to: "/",
		label: "Field",
		icon: LayoutGrid
	},
	{
		to: "/sensors",
		label: "Sensors",
		icon: ChartLine
	},
	{
		to: "/advise",
		label: "Advise",
		icon: Droplets
	},
	{
		to: "/guide",
		label: "How it works",
		icon: BookOpen
	}
];
function Shell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border/80 bg-bg/90 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map$1, {
								className: "size-4",
								strokeWidth: 1.75
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-display text-lg font-medium tracking-tight",
								children: "Khet Sentinel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-[11px] uppercase tracking-[0.18em] text-muted",
								children: "Aman field intelligence"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden items-center gap-1 md:flex",
						children: NAV.map((item) => {
							const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex h-10 items-center gap-2 rounded-md px-3 text-sm transition-colors duration-[var(--motion-quick)]", active ? "bg-primary text-primary-foreground" : "text-muted hover:bg-surface-2 hover:text-fg"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
									className: "size-4",
									strokeWidth: 1.75
								}), item.label]
							}, item.to);
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto max-w-6xl px-4 py-6 pb-24 md:pb-10",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 backdrop-blur-sm md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-4",
					children: NAV.map((item) => {
						const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex min-h-14 flex-col items-center justify-center gap-1 text-[11px]", active ? "text-primary" : "text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
								className: "size-4",
								strokeWidth: 1.75
							}), item.label]
						}) }, item.to);
					})
				})
			})
		]
	});
}
var VARIETY = "BRRI dhan48";
var FARM_NAME = "Rajib Khandakar";
var FARM_PLACE = "Paba, Rajshahi";
var FARM_SIZE = "1.0 acre · Aman paddy";
function mulberry32(seed) {
	let a = seed >>> 0;
	return () => {
		a += 1831565813;
		let t = a;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function plotId(row, col) {
	return `${String.fromCharCode(65 + row)}${col + 1}`;
}
function classify(plot) {
	if (plot.pestLoad >= 34) return "pest";
	if (plot.moisture >= 88) return "waterlogged";
	if (plot.moisture <= 42) return "dry";
	if (plot.nitrogen <= 36) return "nitrogen";
	if (plot.growth >= 68 && plot.moisture >= 56 && plot.moisture <= 82 && plot.pestLoad < 14 && plot.nitrogen >= 55) return "excellent";
	return "healthy";
}
var STATUS_LABEL = {
	excellent: "Peak grain fill",
	healthy: "On track",
	dry: "Moisture stress",
	waterlogged: "Standing water",
	pest: "Rice blast risk",
	nitrogen: "Pale canopy"
};
function createField(seed = 20260909) {
	const rand = mulberry32(seed);
	const plots = [];
	for (let row = 0; row < 6; row += 1) for (let col = 0; col < 8; col += 1) {
		const canalBoost = (row === 5 ? 16 : 0) + (col === 0 ? 10 : 0);
		const ridgePenalty = row <= 1 && col >= 5 ? 22 : 0;
		const pestPocket = row >= 2 && row <= 3 && col >= 5 && col <= 6 ? 36 : 0;
		const nLow = row === 0 && col <= 2 ? 30 : 0;
		const moisture = clamp(58 + canalBoost - ridgePenalty + row / 5 * 8 + (rand() - .5) * 10, 18, 96);
		const pestLoad = clamp(6 + pestPocket + (rand() - .4) * 8, 0, 92);
		plots.push({
			id: plotId(row, col),
			row,
			col,
			moisture,
			temperature: 28.4 + (rand() - .5) * 1.6,
			humidity: 64 + (rand() - .5) * 8,
			nitrogen: clamp(62 - nLow + (rand() - .5) * 10, 18, 92),
			pestLoad,
			growth: clamp(61 + (rand() - .5) * 8 - ridgePenalty * .25, 35, 88),
			stressHours: ridgePenalty > 0 ? 14 : pestPocket > 0 ? 9 : 2
		});
	}
	return plots;
}
function createWeather() {
	return {
		day: 62,
		hour: 9,
		temp: 29.2,
		humidity: 66,
		rainfallMm: 0,
		sky: "haze"
	};
}
function createHistory(weather, plots) {
	const avg = averages(plots);
	const samples = [];
	for (let i = 11; i >= 0; i -= 1) {
		const hour = (weather.hour - i + 24) % 24;
		const swing = Math.sin((hour - 6) / 24 * Math.PI * 2);
		samples.push({
			hourLabel: `${String(hour).padStart(2, "0")}:00`,
			moisture: clamp(avg.moisture - swing * 4, 20, 95),
			temp: clamp(avg.temperature + swing * 3.4, 22, 36),
			humidity: clamp(avg.humidity - swing * 10, 40, 92),
			rainfall: hour === 5 ? 4.2 : hour === 6 ? 1.6 : 0
		});
	}
	return samples;
}
function averages(plots) {
	const n = plots.length || 1;
	const sum = plots.reduce((acc, p) => {
		acc.moisture += p.moisture;
		acc.temperature += p.temperature;
		acc.humidity += p.humidity;
		acc.nitrogen += p.nitrogen;
		acc.pestLoad += p.pestLoad;
		acc.growth += p.growth;
		return acc;
	}, {
		moisture: 0,
		temperature: 0,
		humidity: 0,
		nitrogen: 0,
		pestLoad: 0,
		growth: 0
	});
	return {
		moisture: sum.moisture / n,
		temperature: sum.temperature / n,
		humidity: sum.humidity / n,
		nitrogen: sum.nitrogen / n,
		pestLoad: sum.pestLoad / n,
		growth: sum.growth / n
	};
}
function hourClimate(hour) {
	const swing = Math.sin((hour - 6) / 24 * Math.PI * 2);
	const temp = 27.2 + swing * 4.6;
	const humidity = 72 - swing * 14;
	let sky = "haze";
	let rainfallMm = 0;
	if (hour >= 15 && hour <= 17 && swing > .2) sky = "cloud";
	if (hour === 16 || hour === 5) {
		sky = "rain";
		rainfallMm = hour === 5 ? 6.4 : 3.1;
	} else if (hour >= 10 && hour <= 14) sky = "clear";
	return {
		temp,
		humidity,
		sky,
		rainfallMm
	};
}
function tickField(plots, weather) {
	const hour = (weather.hour + 1) % 24;
	const day = weather.day + (hour === 0 ? 1 : 0);
	const climate = hourClimate(hour);
	const nextWeather = {
		day,
		hour,
		...climate
	};
	return {
		plots: plots.map((plot) => {
			const evap = Math.max(0, (climate.temp - 28) * .12);
			const drain = plot.moisture > 84 ? .35 : .08;
			let moisture = plot.moisture - evap - drain + climate.rainfallMm * .55;
			if (plot.col === 0 || plot.row === 5) moisture += .35;
			moisture = clamp(moisture, 12, 98);
			const humidWarm = climate.humidity > 70 && climate.temp > 28;
			let pestLoad = plot.pestLoad + (humidWarm ? .18 : -.04);
			if (moisture > 86) pestLoad += .1;
			pestLoad = clamp(pestLoad, 0, 100);
			let nitrogen = plot.nitrogen - .03;
			if (moisture > 90) nitrogen -= .05;
			nitrogen = clamp(nitrogen, 8, 96);
			const moistureScore = 1 - Math.min(1, Math.abs(moisture - 68) / 48);
			const pestPenalty = pestLoad / 140;
			const nScore = nitrogen / 100;
			const growthDelta = .08 * moistureScore * nScore - pestPenalty * .08;
			const growth = clamp(plot.growth + growthDelta, 8, 100);
			const stressed = moisture < 42 || moisture > 90 || pestLoad > 40 || nitrogen < 32;
			return {
				...plot,
				moisture,
				temperature: climate.temp + (plot.col > 5 ? .4 : 0),
				humidity: climate.humidity + (moisture > 80 ? 3 : 0),
				nitrogen,
				pestLoad,
				growth,
				stressHours: plot.stressHours + (stressed ? 1 : 0)
			};
		}),
		weather: nextWeather
	};
}
function irrigatePlots(plots, ids) {
	const set = new Set(ids);
	return plots.map((p) => {
		if (!set.has(p.id)) return p;
		return {
			...p,
			moisture: clamp(p.moisture + 18, 12, 94),
			temperature: p.temperature - .4
		};
	});
}
function fertilizePlots(plots, ids) {
	const set = new Set(ids);
	return plots.map((p) => {
		if (!set.has(p.id)) return p;
		return {
			...p,
			nitrogen: clamp(p.nitrogen + 16, 8, 96)
		};
	});
}
function treatPlots(plots, ids) {
	const set = new Set(ids);
	return plots.map((p) => {
		if (!set.has(p.id)) return p;
		return {
			...p,
			pestLoad: clamp(p.pestLoad * .35, 0, 100)
		};
	});
}
function predictYield(plots) {
	const base = 6.2;
	const scores = plots.map((p) => {
		const moisture = 1 - Math.min(1, Math.abs(p.moisture - 68) / 50);
		const nitrogen = clamp(p.nitrogen / 100, .25, 1);
		const pest = 1 - p.pestLoad / 130;
		const growth = p.growth / 100;
		const stress = 1 - Math.min(.45, p.stressHours / 180);
		return clamp(moisture * .28 + nitrogen * .18 + pest * .22 + growth * .22 + stress * .1, .25, 1);
	});
	const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
	const tonnesPerHa = Math.round(base * mean * 100) / 100;
	const avg = averages(plots);
	const moistureScore = 1 - Math.min(1, Math.abs(avg.moisture - 68) / 50);
	return {
		tonnesPerHa,
		confidence: Math.round(82 + mean * 12),
		variety: VARIETY,
		drivers: [
			{
				label: "Soil moisture window",
				score: Math.round(moistureScore * 100)
			},
			{
				label: "Canopy nitrogen",
				score: Math.round(avg.nitrogen)
			},
			{
				label: "Pest pressure (inverted)",
				score: Math.round(100 - avg.pestLoad)
			},
			{
				label: "Crop stage / grain fill",
				score: Math.round(avg.growth)
			}
		]
	};
}
function scanPests(plots) {
	const infected = plots.filter((p) => p.pestLoad >= 28);
	const disease = averages(plots).humidity > 62 ? "Rice blast (Magnaporthe oryzae)" : "Brown spot";
	const maxLoad = Math.max(...plots.map((p) => p.pestLoad), 0);
	const confidence = infected.length ? Math.round(70 + Math.min(22, maxLoad * .25)) : 18;
	return {
		disease: infected.length ? disease : "No outbreak signature",
		confidence,
		plotIds: infected.map((p) => p.id),
		note: infected.length ? `${infected.length} plots above blast threshold. Treat the east-center pocket first, then walk the bund.` : "Canopy looks clean. Keep scouting after evening rain."
	};
}
function buildAdvice(plots) {
	const dry = plots.filter((p) => classify(p) === "dry");
	const wet = plots.filter((p) => classify(p) === "waterlogged");
	const pest = plots.filter((p) => classify(p) === "pest");
	const pale = plots.filter((p) => classify(p) === "nitrogen");
	const items = [];
	if (dry.length) items.push({
		id: "irrigate",
		title: `Irrigate ${dry.map((p) => p.id).slice(0, 6).join(", ")}`,
		detail: "Ridge plots on the north-east are below 42% moisture. A short pulse now protects grain fill.",
		urgency: "now",
		action: "irrigate",
		plotIds: dry.map((p) => p.id)
	});
	if (pest.length) items.push({
		id: "treat",
		title: "Spot-treat rice blast pocket",
		detail: `Lesion risk is concentrated on ${pest.map((p) => p.id).join(", ")}. Fungicide on those plots only — not the whole acre.`,
		urgency: "now",
		action: "treat",
		plotIds: pest.map((p) => p.id)
	});
	if (pale.length) items.push({
		id: "n",
		title: "Top-dress nitrogen on pale canopy",
		detail: `${pale.map((p) => p.id).join(", ")} show nitrogen fade. Cut the dose 15% versus blanket application.`,
		urgency: "soon",
		action: "fertilize",
		plotIds: pale.map((p) => p.id)
	});
	if (wet.length) items.push({
		id: "drain",
		title: "Ease canal gate on the south bund",
		detail: `${wet.map((p) => p.id).join(", ")} sit in standing water. Blast likes this. Drop the water 3–4 cm.`,
		urgency: "soon",
		action: "none",
		plotIds: wet.map((p) => p.id)
	});
	if (!items.length) items.push({
		id: "ok",
		title: "Hold the current schedule",
		detail: "Moisture, nitrogen and pest load are inside the Aman window. Scout again after the next rain.",
		urgency: "watch",
		action: "none",
		plotIds: []
	});
	return items;
}
function clamp(n, min, max) {
	return Math.max(min, Math.min(max, n));
}
var STORAGE_KEY = "khet-sentinel-v2";
function persist(state) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	} catch {}
}
var initialPlots = createField();
var initialWeather = createWeather();
var useFarmStore = create((set, get) => ({
	plots: initialPlots,
	weather: initialWeather,
	history: createHistory(initialWeather, initialPlots),
	selectedIds: [],
	playing: false,
	yieldResult: null,
	pestFinding: null,
	toast: null,
	hydrate: () => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return;
			const saved = JSON.parse(raw);
			if (!saved.plots?.length) return;
			set({
				plots: saved.plots,
				weather: saved.weather ?? get().weather,
				history: saved.history ?? get().history,
				playing: saved.playing ?? false
			});
		} catch {}
	},
	tick: () => {
		const { plots, weather, history } = get();
		const next = tickField(plots, weather);
		const avg = averages(next.plots);
		const sample = {
			hourLabel: `${String(next.weather.hour).padStart(2, "0")}:00`,
			moisture: Math.round(avg.moisture * 10) / 10,
			temp: Math.round(avg.temperature * 10) / 10,
			humidity: Math.round(avg.humidity * 10) / 10,
			rainfall: next.weather.rainfallMm
		};
		const nextHistory = [...history.slice(-11), sample];
		persist({
			plots: next.plots,
			weather: next.weather,
			history: nextHistory,
			playing: get().playing
		});
		set({
			plots: next.plots,
			weather: next.weather,
			history: nextHistory
		});
	},
	togglePlay: () => {
		const playing = !get().playing;
		persist({
			plots: get().plots,
			weather: get().weather,
			history: get().history,
			playing
		});
		set({ playing });
	},
	select: (id, additive) => {
		const current = get().selectedIds;
		if (additive) {
			set({ selectedIds: current.includes(id) ? current.filter((x) => x !== id) : [...current, id] });
			return;
		}
		set({ selectedIds: current.length === 1 && current[0] === id ? [] : [id] });
	},
	clearSelection: () => set({ selectedIds: [] }),
	selectStatus: (ids) => set({ selectedIds: ids }),
	irrigate: () => {
		const ids = targetIds(get());
		if (!ids.length) {
			set({ toast: "Select dry plots, or tap a recommendation first." });
			return;
		}
		const plots = irrigatePlots(get().plots, ids);
		persist({
			...get(),
			plots
		});
		set({
			plots,
			toast: `Canal pulse sent to ${ids.length} plot${ids.length > 1 ? "s" : ""}.`
		});
	},
	fertilize: () => {
		const ids = targetIds(get());
		if (!ids.length) {
			set({ toast: "Select pale plots before top-dressing." });
			return;
		}
		const plots = fertilizePlots(get().plots, ids);
		persist({
			...get(),
			plots
		});
		set({
			plots,
			toast: `Urea top-dress mapped to ${ids.length} plots.`
		});
	},
	treat: () => {
		const ids = targetIds(get());
		if (!ids.length) {
			set({ toast: "Select the blast pocket first." });
			return;
		}
		const plots = treatPlots(get().plots, ids);
		persist({
			...get(),
			plots
		});
		set({
			plots,
			pestFinding: scanPests(plots),
			toast: `Spot fungicide applied on ${ids.length} plots.`
		});
	},
	predict: () => set({ yieldResult: predictYield(get().plots) }),
	scan: () => {
		const finding = scanPests(get().plots);
		set({
			pestFinding: finding,
			selectedIds: finding.plotIds,
			toast: finding.plotIds.length ? `Blast signature on ${finding.plotIds.join(", ")}.` : "No outbreak on this pass."
		});
	},
	applyAdvice: (advice) => {
		set({ selectedIds: advice.plotIds });
		if (advice.action === "irrigate") get().irrigate();
		if (advice.action === "fertilize") get().fertilize();
		if (advice.action === "treat") get().treat();
	},
	reset: () => {
		const plots = createField();
		const weather = createWeather();
		const history = createHistory(weather, plots);
		persist({
			plots,
			weather,
			history,
			playing: false
		});
		set({
			plots,
			weather,
			history,
			playing: false,
			selectedIds: [],
			yieldResult: null,
			pestFinding: null,
			toast: "Field reset to Aman day 62."
		});
	}
}));
function targetIds(state) {
	if (state.selectedIds.length) return state.selectedIds;
	return [];
}
function SimulationHost() {
	const hydrate = useFarmStore((s) => s.hydrate);
	const tick = useFarmStore((s) => s.tick);
	const playing = useFarmStore((s) => s.playing);
	const toast = useFarmStore((s) => s.toast);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		if (!playing) return;
		const id = window.setInterval(tick, 3600);
		return () => window.clearInterval(id);
	}, [playing, tick]);
	(0, import_react.useEffect)(() => {
		if (!toast) return;
		const id = window.setTimeout(() => {
			useFarmStore.setState({ toast: null });
		}, 2800);
		return () => window.clearTimeout(id);
	}, [toast]);
	if (!toast) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "status",
		className: "pointer-events-none fixed bottom-20 left-1/2 z-40 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-sm text-primary-foreground shadow-[var(--shadow-border)] md:bottom-8",
		children: toast
	});
}
var styles_default = "/assets/styles-OLTPxPaH.css";
var APP_NAME = "Khet Sentinel";
var Route$4 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Interactive Aman rice field grid for Bangladeshi farmers — moisture, blast, yield, and plot-level action."
			},
			{
				name: "theme-color",
				content: "#2a5634"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulationHost, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$3 = () => import("./routes-B_Y4BmK0.mjs");
var Route$3 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./advise-CpPxjWNu.mjs");
var Route$2 = createFileRoute("/advise")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./guide-Dcu6jwOr.mjs");
var Route$1 = createFileRoute("/guide")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./sensors-DEUsDO68.mjs");
var Route = createFileRoute("/sensors")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$3.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$4
	}),
	AdviseRoute: Route$2.update({
		id: "/advise",
		path: "/advise",
		getParentRoute: () => Route$4
	}),
	GuideRoute: Route$1.update({
		id: "/guide",
		path: "/guide",
		getParentRoute: () => Route$4
	}),
	SensorsRoute: Route.update({
		id: "/sensors",
		path: "/sensors",
		getParentRoute: () => Route$4
	})
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { buildAdvice as a, FARM_PLACE as c, averages as i, FARM_SIZE as l, useFarmStore as n, classify as o, STATUS_LABEL as r, FARM_NAME as s, router_exports as t, cn as u };
