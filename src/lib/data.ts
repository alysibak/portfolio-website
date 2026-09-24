export type ProjectLink = {
  label: string;
  href: string;
};

export type Decision = {
  title: string;
  reasoning: string;
  tradeoff?: string;
};

export type CaseStudy = {
  problem?: string;
  constraints?: string[];
  decisions: Decision[];
  outcome?: string;
};

/** One box in a project diagram. `owned` is false for anything Aly did not build. */
export type DiagramNode = {
  label: string;
  owned: boolean;
  /** The box the diagram is about. */
  key?: boolean;
};

export type Diagram = {
  /** Left to right, joined by arrows. */
  flow: DiagramNode[];
  /** Pieces that sit beside the main flow rather than in it. */
  beside?: DiagramNode[];
};

/** A before/after bar pair for a bug the project caught. */
export type FindingChart = {
  label: string;
  /** Share of the real value shown before the fix, as a [low, high] percent range. */
  before: [number, number];
  after: number;
};

export type Project = {
  id: string;
  title: string;
  tagline: string;
  year?: string;
  role: "solo" | "team";
  teamSize?: number;
  /** Required whenever role === "team". Enforced by scripts/verify-content.ts. */
  ownership?: string;
  context: string;
  links: ProjectLink[];
  openUrl: string;
  award?: string;
  finding?: string;
  findingChart?: FindingChart;
  diagram: Diagram;
  caseStudy: CaseStudy;
  catOutput: string;
};

export type Lane = "school" | "co-op" | "teaching";

/** One commit on the Experience page's graph. */
export type TimelineEntry = {
  lane: Lane;
  /** YYYY-MM. Orders the graph and places co-op terms on the degree bar. */
  start: string;
  /** YYYY-MM, inclusive. Omitted while ongoing. */
  end?: string;
  period: string;
  role: string;
  org: string;
  note?: string;
  current?: boolean;
};

/** Service roles, rendered as badges so they don't read as paid work. */
export type LeadershipItem = {
  /** Two or three letters for the badge. */
  mark: string;
  role: string;
  org: string;
  period: string;
  context: string;
  current?: boolean;
};

export type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

export const site = {
  name: "Aly Sibak",
  roleLine: "I build and debug production systems",
  school: "Fourth-year Computer Science co-op, University of Guelph",
  location: "Mississauga, Ontario",
  availability: "Seeking Winter 2027 co-op, January–April",
  /** The term availability refers to, as YYYY-MM. Drawn on the degree bar. */
  seeking: { label: "Winter 2027", start: "2027-01", end: "2027-04" },
  description:
    "Aly Sibak, Computer Science co-op student at the University of Guelph. Two co-op terms building and debugging production systems. Seeking Winter 2027.",
  email: "asibak@uoguelph.ca",
  github: "https://github.com/alysibak",
  linkedin: "https://www.linkedin.com/in/aly-sibak-721b85252",
  resume: "/Aly_Sibak_Base_Resume_1Page.pdf",
  education: {
    degree: "Bachelor of Computing (Honours), Computer Science, Co-op",
    school: "University of Guelph",
    detail: "Expected April 2028",
    start: "2023-09",
    end: "2028-04",
  },
};

export const projects: Project[] = [
  {
    id: "carinfo",
    title: "CarInfo",
    tagline:
      "Vehicle research platform over a 28,000-vehicle EPA dataset with NHTSA safety enrichment.",
    year: "2024–",
    role: "solo",
    context: "Personal project. Live and open source.",
    links: [
      { label: "Live", href: "https://carinfo-client.vercel.app" },
      { label: "Source", href: "https://github.com/alysibak/carinfo" },
    ],
    openUrl: "https://carinfo-client.vercel.app",
    finding:
      "Caught an import bug misclassifying 419 plug-in hybrids, causing 60–70% valuation errors. Found by checking output against expectations rather than trusting the import.",
    findingChart: {
      label: "419 plug-in hybrids · value shown vs. real value",
      before: [30, 40],
      after: 100,
    },
    diagram: {
      flow: [
        { label: "EPA + NHTSA data", owned: false },
        { label: "Import", owned: true },
        { label: "Trust labels", owned: true, key: true },
        { label: "Research UI", owned: true },
      ],
      beside: [{ label: "Ontario cost config", owned: true }],
    },
    caseStudy: {
      problem:
        "Public vehicle data is spread across federal datasets of differing shape and quality. Merging them naively produces confident-looking numbers that are wrong.",
      constraints: [
        "Source data has classification inconsistencies that are not flagged.",
        "Ownership-cost modelling is regional. A national average misleads.",
        "A research tool that shows a wrong number without signalling uncertainty is worse than one showing nothing.",
      ],
      decisions: [
        {
          title: "Provenance and trust system",
          reasoning:
            "Every field is labelled verified, curated, or estimated. Surface confidence rather than laundering it.",
          tradeoff: "A denser interface and more schema surface.",
        },
        {
          title: "Ownership-cost model recalibrated to Ontario assumptions",
          reasoning: "Regional assumptions live behind one centralized config.",
          tradeoff:
            "Accurate for one region and explicitly not others, which the config makes visible instead of hiding.",
        },
        {
          title: "UI redesign across 15 routes and 25+ components",
          reasoning: "Three-tier progressive disclosure.",
          tradeoff: "Three tiers means three states to maintain per surface.",
        },
      ],
      outcome:
        "Live, open source, with per-field trust levels visible to the reader.",
    },
    catOutput: `carinfo, 2024-present
vehicle research platform over a 28,000-vehicle epa dataset
with nhtsa safety enrichment. solo. live and open source.

  problem   federal datasets differ in shape and quality.
            merging them naively produces confident-looking
            numbers that are wrong.

  finding   an import bug misclassified 419 plug-in hybrids,
            causing 60-70% valuation errors. caught by checking
            output against expectations rather than trusting
            the import.

  decisions provenance system labels every field verified,
            curated, or estimated.
            ownership-cost model recalibrated to ontario behind
            one centralized regional config.
            ui redesign across 15 routes and 25+ components.

  outcome   per-field trust levels visible to the reader.

  -> carinfo-client.vercel.app
  -> github.com/alysibak/carinfo`,
  },
  {
    id: "bystander",
    title: "Bystander",
    tagline: "Emergency response assistant built in 36 hours.",
    year: "2026",
    role: "team",
    teamSize: 4,
    ownership:
      "I personally owned the React frontend, the Node/Express backend, and the Google Gemini integration. The contactless vitals pipeline, voice coach, and SMS alerting were built by teammates.",
    context: "36-hour hackathon, team of 4.",
    award: "Best Use of Presage Technologies, out of 800 participants",
    links: [
      { label: "Devpost", href: "https://devpost.com/software/bystander" },
      {
        label: "Source",
        href: "https://github.com/hackcanada2026-aaaa/bystander",
      },
    ],
    openUrl: "https://devpost.com/software/bystander",
    diagram: {
      flow: [
        { label: "8-second clip", owned: true },
        { label: "Express API", owned: true },
        { label: "Gemini analysis", owned: true },
        { label: "Severity 1–10", owned: true, key: true },
        { label: "React UI", owned: true },
      ],
      beside: [
        { label: "Contactless vitals", owned: false },
        { label: "Voice coach", owned: false },
        { label: "SMS alerts", owned: false },
      ],
    },
    caseStudy: {
      problem:
        "A bystander at an emergency does not know what they are looking at or what to do first.",
      constraints: [
        "36 hours.",
        "Four people.",
        "A live demo at the end.",
        "A hard dependency on APIs nobody had used before.",
      ],
      decisions: [
        {
          title:
            "8-second video scene analysis returning a 1–10 severity score",
          reasoning:
            "Built on the Gemini API with a deliberately bounded window, because unbounded video is slow and unreliable under demo conditions.",
          tradeoff: "Misses context outside the window.",
        },
        {
          title: "Frontend and backend split so the team could parallelize",
          reasoning:
            "Splitting the surfaces let the vitals and alerting work proceed independently of mine.",
          tradeoff:
            "Interface contracts had to be agreed early, with no time to revise them.",
        },
      ],
      outcome: "Shipped and demoed in 36 hours, and won the named award.",
    },
    catOutput: `bystander, 2026
emergency response assistant built in 36 hours. team of 4.

  ownership i owned the react frontend, the node/express
            backend, and the google gemini integration. the
            contactless vitals pipeline, voice coach, and sms
            alerting were built by teammates.

  problem   a bystander at an emergency does not know what
            they are looking at or what to do first.

  decisions 8-second video scene analysis returning a 1-10
            severity score on the gemini api. bounded window
            because unbounded video is slow and unreliable
            under demo conditions.
            frontend/backend split so the team could
            parallelize against vitals and alerting.

  outcome   shipped and demoed in 36 hours. won best use of
            presage technologies, out of 800 participants.

  -> devpost.com/software/bystander
  -> github.com/hackcanada2026-aaaa/bystander`,
  },
  {
    id: "timevault",
    title: "TimeVault",
    tagline: "Records platform over 57,000+ WWI military records.",
    year: "2026",
    role: "team",
    teamSize: 8,
    ownership:
      "I owned the Flask REST API layer serving three ML models and carried QA and integration testing. I did not build the ML models.",
    context: "Course project, 8-person agile team.",
    links: [
      { label: "Live", href: "https://timevault-web.onrender.com" },
      { label: "Source", href: "https://github.com/alysibak/TimeVault" },
    ],
    openUrl: "https://timevault-web.onrender.com",
    diagram: {
      flow: [
        { label: "Web client", owned: false },
        { label: "JWT roles", owned: true },
        { label: "Flask REST API", owned: true, key: true },
        { label: "3 ML models", owned: false },
      ],
      beside: [
        { label: "Request log", owned: true },
        { label: "QA + integration tests", owned: true },
      ],
    },
    caseStudy: {
      decisions: [
        {
          title: "Three roles enforced through JWT",
          reasoning:
            "Admin endpoints return 401 without a token and 403 without the role. The distinction is deliberate: 401 answers who are you, 403 answers you are known and still not allowed.",
        },
        {
          title: "API request log behind an admin view",
          reasoning:
            "Records method, path, status, and latency on every call, indexed descending by timestamp for recency reads, with a hook that no-ops so un-migrated databases still run.",
          tradeoff:
            "A no-op path is a silent failure mode and needs its own test.",
        },
        {
          title: "Recharts dashboards behind role-based access",
          reasoning:
            "Reporting surfaces are gated by the same role check as the admin endpoints.",
        },
      ],
    },
    catOutput: `timevault, 2026
records platform over 57,000+ ww1 military records.
8-person agile course team.

  ownership i owned the flask rest api layer serving three ml
            models and carried qa and integration testing. i
            did not build the ml models.

  decisions three roles enforced through jwt. admin endpoints
            return 401 without a token and 403 without the
            role; the distinction is deliberate.
            api request log behind an admin view: method,
            path, status, latency on every call, indexed
            descending by timestamp, with a hook that no-ops
            so un-migrated databases still run.
            recharts dashboards behind role-based access.

  -> timevault-web.onrender.com
  -> github.com/alysibak/TimeVault`,
  },
  {
    id: "mizan",
    title: "Mizan",
    tagline: "Personal wealth and asset tracker with a rules-based calculation engine.",
    role: "solo",
    context: "Personal project. Live and open source.",
    links: [
      { label: "Live", href: "https://mizan-sandy-eight.vercel.app" },
      { label: "Source", href: "https://github.com/alysibak/mizan" },
    ],
    openUrl: "https://mizan-sandy-eight.vercel.app",
    diagram: {
      flow: [
        { label: "Server components", owned: true },
        { label: "User-scoped REST", owned: true },
        { label: "Logic core, zero I/O", owned: true, key: true },
      ],
      beside: [
        { label: "Vitest suite", owned: true },
        { label: "Hashed sessions", owned: true },
      ],
    },
    caseStudy: {
      problem:
        "Wealth-obligation calculation under a specific ruleset requires tracking assets over a lunar year, applying threshold tests, and screening holdings against structural criteria. The domain is Islamic wealth calculation, or zakat. A spreadsheet is error-prone and loses history.",
      constraints: [
        "One developer, no budget for paid services.",
        "Correctness outranks features. A wrong number is worse than a missing one.",
        "The rules are not arbitrary. They must be encoded faithfully and stay testable in isolation.",
      ],
      decisions: [
        {
          title: "Pure calculation core with zero I/O",
          reasoning:
            "A dependency-free module covered by Vitest across threshold, holding-period, and screening logic.",
          tradeoff:
            "More plumbing between layers than reading the database inside the calculation.",
        },
        {
          title: "Authorization by construction, not by check",
          reasoning:
            "Every update and delete matches on both record ID and owner ID, so a guessed UUID cannot reach another account. Not a middleware guard a future handler might forget: it is in the query itself. Cross-account access is one of the most common bugs in multi-tenant apps, and this design rules it out.",
          tradeoff:
            "More verbose queries, and no single place to audit the policy.",
        },
        {
          title: "Sessions hashed at rest",
          reasoning:
            "bcrypt for passwords, and session tokens stored as SHA-256 behind httpOnly cookies.",
          tradeoff: "Active sessions cannot be displayed in human-readable form.",
        },
        {
          title: "No expiring dependencies on critical paths",
          reasoning:
            "Every critical path runs locally, so no feature dies when a third-party trial lapses. That includes a self-contained calendar converter rather than an external service.",
          tradeoff: "More code to own, and no vendor SLA.",
        },
        {
          title: "Three-layer split",
          reasoning:
            "Server components, user-scoped REST handlers, and a dependency-free logic core.",
          tradeoff: "Indirection cost on simple reads.",
        },
      ],
      outcome:
        "Live and open source. The engine is testable without a database, and the authorization model has no reachable cross-account path.",
    },
    catOutput: `mizan
personal wealth and asset tracker with a rules-based
calculation engine. solo. live and open source.

  problem   wealth-obligation calculation (zakat) needs assets
            tracked over a lunar year, threshold tests, and
            structural screening. a spreadsheet is error-prone
            and loses history.

  decisions pure calculation core with zero i/o, covered by
            vitest.
            authorization by construction: every update and
            delete matches on record id AND owner id, so a
            guessed uuid cannot reach another account.
            sessions hashed at rest (bcrypt + sha-256).
            no expiring dependencies on critical paths.
            three-layer split.

  outcome   engine testable without a database. no reachable
            cross-account path.

  note      cross-account access is one of the most common
            bugs in multi-tenant apps. this design rules it out.

  -> mizan-sandy-eight.vercel.app
  -> github.com/alysibak/mizan`,
  },
];

export const coursework = {
  title: "Systems and data structures coursework",
  items: [
    "BFS, DFS, and Dijkstra's shortest path over adjacency matrices and adjacency lists (C).",
    "Expression trees, a max-heap, an RPN stack calculator, and a binary-file record manager (C).",
    "Manual memory management with pointers. Segmentation faults and leaks debugged with gdb.",
    "Investment portfolio manager with buy/sell logic, fee handling, and multi-field search (Java).",
    "Discussion board with registration, posts, and polls persisted through file I/O (Java).",
  ],
  links: [
    { label: "Graph traversal (C)", href: "https://github.com/alysibak/GraphTraversal-ShortestPath" },
    { label: "Expression parser (C)", href: "https://github.com/alysibak/ExpressionParser-HeapSort" },
    { label: "ePortfolio (Java)", href: "https://github.com/alysibak/ePortfolio" },
    { label: "Discussion board (Java)", href: "https://github.com/alysibak/DiscussionBoard" },
  ],
};

/** Numbers from personal projects only. Employer work stays vague. */
export const highlights: Stat[] = [
  { value: 28000, label: "vehicles in CarInfo" },
  { value: 419, label: "misclassified hybrids caught" },
  { value: 36, suffix: " h", label: "to build Bystander" },
  { value: 57000, suffix: "+", label: "WWI records in TimeVault" },
];

/** Newest first. The graph draws one lane per `lane`. */
export const timeline: TimelineEntry[] = [
  {
    lane: "teaching",
    start: "2026-09",
    period: "From Sep 2026",
    role: "Teaching Assistant",
    org: "Object-Oriented Programming in Java (CIS*2430)",
    note: "Appointed to support lab sections, office hours, and grading.",
    current: true,
  },
  {
    lane: "co-op",
    start: "2026-05",
    end: "2026-09",
    period: "May–Sep 2026",
    role: "Source Protection Software Developer (Co-op)",
    org: "Township of Centre Wellington",
    note: "LSWIMS, a multi-tenant Clean Water Act compliance platform used by municipalities and conservation authorities across Ontario.",
  },
  {
    lane: "teaching",
    start: "2026-01",
    end: "2026-04",
    period: "Jan–Apr 2026",
    role: "Teaching Assistant",
    org: "Web Design and Development (CIS*1050)",
    note: "HTML, CSS, and JavaScript.",
  },
  {
    lane: "co-op",
    start: "2025-05",
    end: "2025-12",
    period: "May–Dec 2025",
    role: "Software Developer (Co-op)",
    org: "P&P Optica",
    note: "PPO Insights, a foreign-object detection platform for food processing serving 20+ enterprise facilities.",
  },
  {
    lane: "teaching",
    start: "2024-09",
    end: "2024-12",
    period: "Sep–Dec 2024",
    role: "Teaching Assistant",
    org: "Discrete Structures (CIS*1910)",
    note: "Supported 250+ students and ran the shared support inbox for an online cohort.",
  },
  {
    lane: "school",
    start: "2023-09",
    period: "2023",
    role: "Started Computer Science (Co-op)",
    org: "University of Guelph",
  },
];

/** Three full 1.0 (140-hour) paid appointments across three courses. */
export const teachingStats: Stat[] = [
  { value: 3, label: "paid TA appointments" },
  { value: 420, label: "paid hours" },
  { value: 250, suffix: "+", label: "students in one course" },
];

export const teachingNote =
  "Graded assignments and exams with detailed written feedback, and ran exam review sessions.";

export const leadership: LeadershipItem[] = [
  {
    mark: "HC",
    role: "Tech Organizer",
    org: "HackCanada",
    period: "2026",
    context: "Built the event website and the judge-facing judging portal.",
  },
  {
    mark: "CC",
    role: "Governor of Computing",
    org: "CCMPS Student Council",
    period: "Ongoing",
    context:
      "Elected, representing 2,300 Computing students at the University of Guelph.",
    current: true,
  },
  {
    mark: "MSA",
    role: "Technical Director",
    org: "Muslim Students Association",
    period: "Ongoing",
    context: "Maintain and extend the MSA website.",
    current: true,
  },
  {
    mark: "GD",
    role: "Workshop Lead",
    org: "SOCIS and Google Developer Student Club",
    period: "Ongoing",
    context:
      "Design and lead hands-on full-stack and AI workshops for 50+ students.",
    current: true,
  },
];

/** Flat view of every role, for the content checker. */
export const experienceItems = [
  ...timeline.map((t) => ({ role: t.role, company: t.org, context: t.note ?? "" })),
  ...leadership.map((l) => ({ role: l.role, company: l.org, context: l.context })),
];

export const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Experience", href: "/experience" },
] as const;

export const commandOutputs = {
  help: `available commands

  whoami        who I am
  ls            list sections
  cat <name>    read a project case study
  git log       career history
  open <name>   open a project link
  clear         clear the console
  exit          close the console

tip: tab completes. most things you'd guess will work.`,

  whoami: `aly sibak
fourth-year computer science co-op, university of guelph
mississauga, ontario

two co-op terms on production systems: a multi-tenant
compliance platform for ontario municipalities, and a
foreign-object detection platform for food processing.

seeking: winter 2027 co-op (january-april), 4 or 8 months

i find what's broken. you're in the part of the site that
proves it.`,

  ls: `projects/     ${projects.map((p) => p.id).join("  ")}
experience/   co-op/  teaching/  leadership/
contact/      email  github  linkedin  resume.pdf`,

  lsExperience: `co-op/        centre-wellington  pp-optica
teaching/     university-of-guelph
leadership/   hackcanada  ccmps  msa  socis

(try 'git log')`,

  lsContact: `${site.email}
${site.github}
${site.linkedin}
${site.resume}`,

  lsProjectFields: `problem  constraints  decisions  outcome`,

  gitLog: `commit 9d4e1a7  (HEAD -> main, origin/main)
Author: Aly Sibak
Date:   Sep 2026

    feat: back at guelph for the fall term
    fourth-year coursework. governor of computing on the
    ccmps student council, technical director at the msa,
    workshop lead for socis and gdsc.

commit 7f3a9c2
Date:   May 2026

    feat: source protection software at centre wellington
    lswims, a multi-tenant clean water act compliance
    platform for ontario municipalities and conservation
    authorities.

commit c41b8e0
Date:   May 2025

    feat: software developer co-op at p&p optica
    ppo insights, foreign-object detection for food
    processing across 20+ enterprise facilities.

commit a90f12d
Date:   Sep 2024

    feat: teaching assistant at guelph
    three 1.0 appointments across three courses. 250+
    students in discrete structures.

commit 1e7d4b5
Date:   2023

    init: started b.comp computer science (co-op) at guelph`,

  sudoRmRf: "nice try.",
} as const;

export const projectIds = projects.map((p) => p.id);

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
