export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  year: string;
  sentence: string;
  stat: string;
  diff: string;
  links: ProjectLink[];
  openUrl: string;
  bug: string;
  trace: string;
  fix: string;
  impact: string;
  catOutput: string;
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  context: string;
  current?: boolean;
};

export const site = {
  name: "Aly Sibak",
  roleLine:
    "Source Protection Software Developer, Township of Centre Wellington",
  now: "Currently building government compliance software at Centre Wellington.",
  school: "Fourth-year CS co-op, University of Guelph",
  availability: "Available Fall 2026 co-op",
  email: "asibak@uoguelph.ca",
  github: "https://github.com/alysibak",
  linkedin: "https://linkedin.com/in/aly-sibak-721b85252",
  resume: "/Aly_Sibak_Base_Resume_1Page.pdf",
  education: {
    degree: "B.Comp (Hons), Computer Science (Co-op)",
    school: "University of Guelph",
    detail: "Expected April 2028. 85% GPA. Dean's Honours List x3",
  },
};

export const projects: Project[] = [
  {
    id: "bystander",
    title: "Bystander",
    year: "2026",
    sentence: "AI emergency triage app built at HackCanada.",
    stat: "Best Use of Presage Technologies, 1 of 800+ teams",
    diff: "surface: triage UI, internal: presage capture mode gate",
    links: [
      { label: "Devpost", href: "https://devpost.com/software/bystander" },
      {
        label: "GitHub",
        href: "https://github.com/hackcanada2026-aaaa/bystander",
      },
    ],
    openUrl: "https://devpost.com/software/bystander",
    bug: "Presage biometric capture ran in spot mode while the pipeline assumed continuous sampling. Readings were silently dropped: the SDK returned success, vitals came back empty.",
    trace:
      "End-to-end path sensor -> Presage SDK -> websocket -> triage scorer. SDK returned HTTP 200 with zero-length payload. UI showed 'waiting for data' indefinitely. Only visible in SDK debug logs.",
    fix: "Validated capture mode at init; enforced continuous mode before subscribing; added heartbeat watchdog that surfaces stale streams within 3s.",
    impact:
      "Restored the biometric pipeline before judging. Contributed to Best Use of Presage Technologies, 1 of 800+ teams at HackCanada 2026.",
    catOutput: `bystander, 2026, hackcanada
ai emergency triage app

  bug    presage capture ran in spot mode; pipeline assumed
         continuous. readings dropped silently, sdk returned
         success with empty vitals.
  trace  sensor -> presage sdk -> websocket -> triage scorer.
         http 200, zero-length payload. ui stuck on
         'waiting for data'. only visible in sdk debug logs.
  fix    validated capture mode at init; enforced continuous
         before subscribing; heartbeat watchdog surfaces
         stale streams within 3s.
  impact restored pipeline before judging. best use of
         presage technologies, 1 of 800+ teams.

  -> devpost.com/software/bystander
  -> github.com/hackcanada2026-aaaa/bystander`,
  },
  {
    id: "carinfo",
    title: "CarInfo",
    year: "2024–",
    sentence: "Car comparison and research platform.",
    stat: "28,000-vehicle database",
    diff: "surface: vehicle count, internal: 419 phevs misclassified as ev",
    links: [
      { label: "Live", href: "https://carinfo-client.vercel.app" },
      { label: "GitHub", href: "https://github.com/alysibak/CarInfo" },
    ],
    openUrl: "https://carinfo-client.vercel.app",
    bug: "The import pipeline applied fuel-type rules before plug-in hybrid normalization, so 419 PHEVs were stored as pure electric, breaking their depreciation curves.",
    trace:
      "Valuation engine pulled the EV multiplier for VINs that still carried ICE range metadata. Spot check: a 2018 Prius Prime showed ~$18k; comps cluster $54k–$71k. Silent, no import error, wrong tier in DB.",
    fix: "Reordered normalization before classification; added cross-field validator (fuel_type x battery_kwh x electric_range); backfilled affected rows.",
    impact:
      "419 records corrected. One representative vehicle moved from ~$18k to the $54k–$71k band. Search and compare are now consistent across 28,000 vehicles.",
    catOutput: `carinfo, 2024-present
car comparison and research platform

  bug    import pipeline applied fuel-type rules before
         plug-in hybrid normalization. 419 phevs stored as
         pure electric, breaking depreciation curves.
  trace  valuation engine pulled ev multiplier for vins that
         still carried ice range metadata. 2018 prius prime
         showed ~$18k; comps cluster $54k-$71k. no import
         error, wrong tier in db.
  fix    reordered normalization before classification; added
         cross-field validator (fuel_type x battery_kwh x
         electric_range); backfilled affected rows.
  impact 419 records corrected. one vehicle moved from ~$18k
         to the $54k-$71k band. search and compare now
         consistent across 28,000 vehicles.

  -> carinfo-client.vercel.app
  -> github.com/alysibak/CarInfo`,
  },
  {
    id: "pocketchange",
    title: "PocketChange",
    year: "2024–",
    sentence: "Fintech app for spare-change donations via Plaid and Stripe.",
    stat: "40 charities, offline",
    diff: "surface: donation flow, internal: idempotency key collision on retry",
    links: [],
    openUrl: "",
    bug: "Stripe charge retries reused client-generated idempotency keys tied to the session, not the intent. Network blips caused duplicate charge attempts that failed opaquely in the UI.",
    trace:
      "Plaid link succeeded -> round-up job queued -> Stripe 409 on retry -> frontend showed generic 'payment failed'. Logs had the key collision; users did not.",
    fix: "Server-side idempotency keys derived from user_id + ledger_date + charity_id; exposed structured error codes to the client; dead-letter queue for manual review.",
    impact:
      "Removed duplicate-charge risk across 40 charity endpoints. Donation completion stabilized once the retry path was fixed.",
    catOutput: `pocketchange, 2024-present
fintech app for spare-change donations via plaid and stripe

  bug    stripe charge retries reused client-generated
         idempotency keys tied to the session, not the intent.
         network blips caused duplicate charge attempts that
         failed opaquely in the ui.
  trace  plaid link succeeded -> round-up job queued ->
         stripe 409 on retry -> frontend showed generic
         'payment failed'. logs had the key collision; users
         did not.
  fix    server-side idempotency keys from user_id +
         ledger_date + charity_id; structured error codes to
         client; dead-letter queue for manual review.
  impact removed duplicate-charge risk across 40 charity
         endpoints. donation completion stabilized after the
         retry path fix.

  status live backend offline
  -> github (pocketchange)`,
  },
  {
    id: "timevault",
    title: "TimeVault",
    year: "2026",
    sentence: "WWI military records analysis platform.",
    stat: "8-person team, QA and integration testing",
    diff: "surface: records search, internal: schema drift between ml and api layers",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Luiza-s-classes/project-setup-team-timevault-technologies-g6",
      },
    ],
    openUrl:
      "https://github.com/Luiza-s-classes/project-setup-team-timevault-technologies-g6",
    bug: "The ML team's export schema added nullable rank fields without versioning. Integration tests passed on fixtures but failed on production extracts, where null rank broke sort order silently.",
    trace:
      "Contract tests used hand-made JSON. The real pipeline omitted rank on 12% of records. UI displayed the correct count but wrong ordering. Found during a cross-team integration run, pre-release.",
    fix: "Authored an integration suite against production-shaped fixtures; enforced a schema version header at the API boundary; fail-fast on unknown fields.",
    impact:
      "Blocked a release regression. As QA on an 8-person team, caught a class of bug the unit tests missed.",
    catOutput: `timevault, 2026
ww1 military records analysis platform, 8-person team

  bug    ml team's export schema added nullable rank fields
         without versioning. integration tests passed on
         fixtures but failed on production extracts; null
         rank broke sort order silently.
  trace  contract tests used hand-made json. real pipeline
         omitted rank on 12% of records. ui showed correct
         count, wrong ordering. found during cross-team
         integration run, pre-release.
  fix    authored integration suite against production-shaped
         fixtures; schema version header enforced at api
         boundary; fail-fast on unknown fields.
  impact blocked a release regression. as qa on an 8-person
         team, caught a class of bug unit tests missed.

  -> github.com/Luiza-s-classes/project-setup-team-timevault-technologies-g6`,
  },
];

export const experience: ExperienceItem[] = [
  {
    role: "Source Protection Software Developer Co-op",
    company: "Township of Centre Wellington",
    period: "May–Sep 2026",
    context: "Compliance and permitting software for municipal staff.",
    current: true,
  },
  {
    role: "Software Developer Co-op",
    company: "P&P Optica",
    period: "May–Dec 2025",
    context: "AI food-safety systems, Gemini API, AWS.",
  },
  {
    role: "Teaching Assistant, Web Design",
    company: "University of Guelph",
    period: "Jan–Apr 2026",
    context: "80 students in HTML, CSS, and JavaScript.",
  },
  {
    role: "Teaching Assistant, Discrete Structures",
    company: "University of Guelph",
    period: "Sep–Dec 2024",
    context: "250 students in logic and combinatorics.",
  },
];

export const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Experience", href: "/experience" },
] as const;

export const commandOutputs = {
  help: `available commands

  whoami        who I am
  ls            list sections
  cat <name>    read a project case file
  git log       career history
  open <name>   open a project link
  clear         clear the console
  exit          close the console

tip: tab completes. most things you'd guess will work.`,

  whoami: `aly sibak
fourth-year computer science co-op, university of guelph
source protection software developer, township of centre wellington
currently: building government compliance software
available: fall 2026

i find what's broken. you're in the part of the site that proves it.`,

  ls: `projects/     bystander  carinfo  pocketchange  timevault
experience/   centre-wellington  pp-optica  teaching
contact/      email  github  linkedin  resume.pdf`,

  lsProjectBystander: `bug  trace  fix  impact   (try 'cat bystander')`,

  gitLog: `commit 7f3a9c2  (HEAD -> main, origin/main)
Author: Aly Sibak
Date:   May 2026

    feat: source protection software at centre wellington
    building compliance + permitting software for ontario
    municipalities. configurable inspection forms, real-time
    chat, fixed a broken access-control vuln.

commit c41b8e0
Date:   May 2025

    feat: software developer co-op at p&p optica
    ai food-safety dashboard, 20+ facilities. shipped gemini
    eval pipeline. eliminated 200+ monthly support tickets.

commit a90f12d
Date:   Sep 2024

    feat: teaching assistant, discrete structures + web design
    330 students across two terms.

commit 1e7d4b5
Date:   2023

    init: started b.comp computer science (co-op) at guelph`,

  sudoRmRf: "nice try.",
} as const;

export const projectIds = projects.map((p) => p.id);

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
