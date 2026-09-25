import type { ImageMetadata } from "astro";
import carinfoHome from "../assets/shots/carinfo-home.webp";
import carinfoCar from "../assets/shots/carinfo-car.webp";
import mizanBreakdown from "../assets/shots/mizan-breakdown.webp";
import mizanLedger from "../assets/shots/mizan-ledger.webp";
import timevaultTrends from "../assets/shots/timevault-trends.webp";
import timevaultModels from "../assets/shots/timevault-models.webp";

// Screenshots of each project, taken from the real apps running locally on
// their seeded or public data. Kept apart from data.ts so the shell and search,
// which import data.ts, don't pull in images.

export interface Shot {
  src: ImageMetadata;
  /** Short tab label. */
  label: string;
  /** The page's path, shown in the window's address bar. */
  path: string;
  alt: string;
}

export interface ProjectShots {
  shots: Shot[];
  /** The file in src/assets/shots/ used in link previews (the first shot). */
  preview: string;
  /** Said under the screenshots when they show someone else's work. */
  note?: string;
}

export const projectShots: Record<string, ProjectShots> = {
  carinfo: {
    preview: "carinfo-home.webp",
    shots: [
      {
        src: carinfoHome,
        label: "home",
        path: "/",
        alt: "CarInfo home page in dark mode: a search box for make, model, or VIN beside a car silhouette.",
      },
      {
        src: carinfoCar,
        label: "car page",
        path: "/car/mazda-mx-5-2026-mx-5-manual-6-spd",
        alt: "CarInfo page for the 2026 Mazda MX-5: engine, combined MPG, estimated value, and running cost, with city and highway MPG bars.",
      },
    ],
  },
  mizan: {
    preview: "mizan-breakdown.webp",
    shots: [
      {
        src: mizanBreakdown,
        label: "breakdown",
        path: "/zakat",
        alt: "Mizan zakat breakdown: each zakatable asset with its category and amount, adding up to a gross total.",
      },
      {
        src: mizanLedger,
        label: "ledger",
        path: "/assets",
        alt: "Mizan ledger page: import assets from a CSV statement, or add one by category, value, and hawl start date.",
      },
    ],
  },
  timevault: {
    preview: "timevault-trends.webp",
    shots: [
      {
        src: timevaultTrends,
        label: "trends",
        path: "/overview",
        alt: "TimeVault bar chart of the most common WWI courts martial offences, led by absence without leave.",
      },
      {
        src: timevaultModels,
        label: "models",
        path: "/advanced",
        alt: "TimeVault machine learning page offering decision tree, logistic regression, and naive Bayes analyses.",
      },
    ],
    note: "Screens from the web client my teammates built. The data behind them comes through the Flask API I built.",
  },
};
