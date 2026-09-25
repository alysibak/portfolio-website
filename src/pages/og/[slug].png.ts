import type { APIRoute, GetStaticPaths } from "astro";
import { readFile } from "node:fs/promises";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { site } from "../../lib/data";
import { ogCards, type OgCard } from "../../lib/og";

// Link-preview images, drawn at build time from the same content as the pages.
// Satori takes plain element objects, so no JSX runtime is needed here.

const font = (pkg: string, file: string) => readFile(`node_modules/@fontsource/${pkg}/files/${file}`);

const colors = {
  paper: "#fafaf8",
  ink: "#16161a",
  muted: "#55555f",
  subtle: "#707079",
  border: "#e4e4e0",
  accent: "#1e3a5f",
  good: "#2f6b3a",
};

type Node = { type: string; props: Record<string, unknown> };
const el = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style: { display: "flex", ...style }, children },
});

// The subset web fonts have no arrow glyph, so draw one.
const arrowSvg = (): Node => ({
  type: "svg",
  props: {
    width: 24,
    height: 16,
    viewBox: "0 0 24 16",
    children: {
      type: "path",
      props: { d: "M1 8h20M14 1l7 7-7 7", stroke: colors.accent, strokeWidth: 2.5, fill: "none" },
    },
  },
});

const chip = (text: string): Node =>
  el(
    "div",
    {
      fontFamily: "JetBrains Mono",
      fontSize: 24,
      padding: "10px 18px",
      borderRadius: 999,
      border: `2px solid ${colors.border}`,
      background: colors.paper,
      color: colors.muted,
    },
    text
  );

function card(c: OgCard): Node {
  const nodes = c.nodes
    ? el(
        "div",
        { flexWrap: "wrap", gap: 12, marginTop: 36, alignItems: "center" },
        c.nodes.flatMap((n, i) => {
          const box = el(
            "div",
            {
              fontFamily: "JetBrains Mono",
              fontSize: 22,
              padding: "10px 16px",
              borderRadius: 8,
              border: `2.5px ${n.owned ? "solid" : "dashed"} ${n.owned ? colors.accent : colors.subtle}`,
              background: n.key ? colors.accent : colors.paper,
              color: n.key ? colors.paper : n.owned ? colors.ink : colors.muted,
            },
            n.label
          );
          const arrow = arrowSvg();
          return i < c.nodes!.length - 1 ? [box, arrow] : [box];
        })
      )
    : null;

  return el(
    "div",
    {
      width: 1200,
      height: 630,
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "64px 72px",
      background: colors.paper,
      backgroundImage: `radial-gradient(${colors.border} 1.5px, transparent 1.5px)`,
      backgroundSize: "28px 28px",
      fontFamily: "Source Sans 3",
      color: colors.ink,
    },
    [
      el("div", { flexDirection: "column" }, [
        el("div", { fontFamily: "JetBrains Mono", fontSize: 26, color: colors.accent }, `aly@portfolio:~$ ${c.command}`),
        el("div", { fontSize: 76, fontWeight: 600, marginTop: 28, lineHeight: 1.05, letterSpacing: -1 }, c.title),
        el("div", { fontSize: 32, color: colors.muted, marginTop: 18, lineHeight: 1.35, maxWidth: 980 }, c.subtitle),
        c.detail
          ? el("div", { fontFamily: "JetBrains Mono", fontSize: 22, color: colors.subtle, marginTop: 10, whiteSpace: "nowrap" }, c.detail)
          : null,
        nodes,
        c.chips ? el("div", { flexWrap: "wrap", gap: 12, marginTop: 34 }, c.chips.map(chip)) : null,
        c.stats
          ? el(
              "div",
              { gap: 14, marginTop: 34 },
              c.stats.map((s) =>
                el(
                  "div",
                  {
                    flexDirection: "column",
                    width: 250,
                    padding: "16px 18px",
                    borderRadius: 10,
                    border: `2px solid ${colors.border}`,
                    background: colors.paper,
                  },
                  [
                    el("div", { fontFamily: "JetBrains Mono", fontSize: 36, color: colors.ink }, s.value),
                    el("div", { fontSize: 20, color: colors.muted, marginTop: 6 }, s.label),
                  ]
                )
              )
            )
          : null,
      ]),
      el(
        "div",
        {
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "JetBrains Mono",
          fontSize: 22,
          color: colors.subtle,
          borderTop: `2px solid ${colors.border}`,
          paddingTop: 24,
        },
        [
          el("div", {}, new URL(site.url).host),
          el("div", { alignItems: "center", gap: 12, color: colors.accent }, [
            el("div", { width: 12, height: 12, borderRadius: 6, background: colors.good }),
            site.availability,
          ]),
        ]
      ),
    ]
  );
}

export const getStaticPaths: GetStaticPaths = () => ogCards.map((c) => ({ params: { slug: c.slug }, props: { card: c } }));

export const GET: APIRoute = async ({ props }) => {
  const fonts = await Promise.all([
    font("source-sans-3", "source-sans-3-latin-400-normal.woff"),
    font("source-sans-3", "source-sans-3-latin-600-normal.woff"),
    font("jetbrains-mono", "jetbrains-mono-latin-400-normal.woff"),
  ]);
  const svg = await satori(card((props as { card: OgCard }).card) as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Source Sans 3", data: fonts[0], weight: 400, style: "normal" },
      { name: "Source Sans 3", data: fonts[1], weight: 600, style: "normal" },
      { name: "JetBrains Mono", data: fonts[2], weight: 400, style: "normal" },
    ],
  });
  const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
