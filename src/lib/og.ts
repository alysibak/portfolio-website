import { highlights, leadership, projects, site, timeline } from "./data";

/** One link-preview card per page. Base.astro picks the card by URL path. */
export type OgCard = {
  slug: string;
  path: string;
  command: string;
  title: string;
  subtitle: string;
  /** A short mono line under the subtitle that must not wrap. */
  detail?: string;
  nodes?: { label: string; owned: boolean; key?: boolean }[];
  chips?: string[];
  stats?: { value: string; label: string }[];
};

const count = (lane: string) => timeline.filter((t) => t.lane === lane).length;

export const ogCards: OgCard[] = [
  {
    slug: "home",
    path: "/",
    command: "whoami",
    title: site.name,
    subtitle: `${site.roleLine}.`,
    detail: `${site.school} · ${site.location}`,
    stats: highlights.map((h) => ({ value: h.value.toLocaleString("en-US") + (h.suffix ?? ""), label: h.label })),
  },
  {
    slug: "work",
    path: "/work",
    command: "ls projects/",
    title: "Selected work",
    subtitle: "Each project: the problem, the constraints, the decisions, and what they cost.",
    chips: projects.map((p) => p.title),
  },
  {
    slug: "experience",
    path: "/experience",
    command: "git log",
    title: "Experience",
    subtitle: "Co-op terms, teaching at Guelph, and leadership.",
    chips: [
      `${count("co-op")} co-op terms`,
      `${count("teaching")} TA appointments`,
      `${leadership.length} leadership roles`,
    ],
  },
  ...projects.map((p) => ({
    slug: `work-${p.id}`,
    path: `/work/${p.id}`,
    command: `cat ${p.id}`,
    title: p.title,
    subtitle: p.tagline,
    nodes: p.diagram.flow,
  })),
];

/** The card for a path, falling back to the home card. */
export function ogCardFor(pathname: string): OgCard {
  const path = pathname.replace(/\/$/, "") || "/";
  return ogCards.find((c) => c.path === path) ?? ogCards[0];
}
