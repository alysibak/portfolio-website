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

/** A short excerpt from the project's public repo, shown on its page. */
export type CodeExcerpt = {
  caption: string;
  lang: "ts" | "js" | "python";
  /** Link to the file on GitHub. Must be in the content check's allowlist. */
  source: string;
  code: string;
};

/** How a project reads on the resume page: shorter and more general than its case study. */
export type ProjectResume = {
  label: string;
  stack: string[];
  bullets: string[];
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
  /**
   * What Aly used. On team projects, only the parts in the ownership line,
   * so `grep` in the shell never implies he built a teammate's piece.
   */
  stack: string[];
  code?: CodeExcerpt;
  resume: ProjectResume;
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
  /** Resume detail for paid roles: stack and bullets, as general as the resume. */
  stack?: string[];
  bullets?: string[];
  current?: boolean;
};

/** Service roles, listed apart from paid work so they don't read as jobs. */
export type LeadershipItem = {
  role: string;
  org: string;
  period: string;
  context: string;
  /** The line for this role on the resume page. Omit to leave it off the resume. */
  resume?: string;
  current?: boolean;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

export const site = {
  name: "Aly Sibak",
  /** Keep in step with `site` in astro.config.mjs; the content check compares them. */
  url: "https://alysibak.vercel.app",
  roleLine: "I build and debug production systems",
  school: "Fourth-year Computer Science co-op, University of Guelph",
  location: "Mississauga, Ontario",
  /** For showing visitors what time it is for me. */
  timeZone: "America/Toronto",
  availability: "Seeking Winter 2027 co-op, January–April",
  /** How long a term I can do; shown beside the availability on the home page. */
  termLength: "4 or 8 months",
  /** The term availability refers to, as YYYY-MM. Drawn on the degree bar. */
  seeking: { label: "Winter 2027", start: "2027-01", end: "2027-04" },
  description:
    "Aly Sibak, Computer Science co-op student at the University of Guelph. Two co-op terms building and debugging production systems. Seeking Winter 2027.",
  email: "asibak@uoguelph.ca",
  github: "https://github.com/alysibak",
  linkedin: "https://www.linkedin.com/in/aly-sibak-721b85252",
  resume: "/resume",
  education: {
    degree: "Bachelor of Computing (Honours), Computer Science (Co-op)",
    school: "University of Guelph",
    period: "2023 – Present",
    detail: "Graduating April 2028",
    highlights: ["Major Average 85%", "Dean's Honours List x3"],
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
    stack: ["React", "TypeScript", "Vite", "Express", "PostgreSQL", "Vitest", "Playwright"],
    resume: {
      label: "car discovery and comparison platform",
      stack: ["React", "TypeScript", "Express", "PostgreSQL"],
      bullets: [
        "Built a full-stack comparison platform over a large public vehicle dataset",
        "Found and fixed a data import issue that was skewing cost estimates",
      ],
    },
    code: {
      caption: "The audit check that caught it: an electric car can't have a gas engine.",
      lang: "js",
      source:
        "https://github.com/alysibak/carinfo/blob/main/server/scripts/audit-valuation-integrity.mjs",
      code: `// PHEV misclassification
const electric = cars.filter((c) => c.engine?.fuelType === 'electric');
const shortRange = electric.filter((c) => {
  const r = c.epa?.rangeMiles ?? 0;
  return r > 0 && r < 50;
});
const withDisp = shortRange.filter(
  (c) => c.engine?.displacement && c.engine.displacement >= 1.5
);`,
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
    stack: ["React", "Node.js", "Express", "Gemini API"],
    resume: {
      label: "emergency response tool",
      stack: ["React", "Node.js", "Express", "Google Gemini"],
      bullets: [
        "Won Best Use of Presage Technologies at HackCanada 2026",
        "Built the frontend, backend and AI integration with a four-person team in 36 hours",
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
    year: "2025",
    role: "team",
    teamSize: 8,
    ownership:
      "I built the Flask API layer, access control, and audit logging, trained the machine learning models, and carried integration testing for the team. The web client was built by teammates.",
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
        { label: "3 ML models", owned: true },
      ],
      beside: [
        { label: "Request log", owned: true },
        { label: "QA + integration tests", owned: true },
      ],
    },
    stack: ["Python", "Flask", "PyJWT", "PostgreSQL", "scikit-learn", "pytest"],
    resume: {
      label: "historical records platform",
      stack: ["Python", "Flask", "PostgreSQL"],
      bullets: [
        "Built the API layer, access control and audit logging with an eight-person Agile team",
        "Trained machine learning models and carried integration testing for the team",
      ],
    },
    code: {
      caption: "No valid token is a 401. A known user without the role is a 403.",
      lang: "python",
      source: "https://github.com/alysibak/timevault/blob/main/src/backend/signin/signin.py",
      code: `# route.py: every protected endpoint starts here
payload = _get_user_from_token()
if not payload:
    return jsonify({'error': 'Unauthorized'}), 401

# signin.py: the admin door checks the role, not just the password
if user[3] != 'admin':
    return jsonify({'error': 'This account does not have admin privileges.'}), 403`,
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
    catOutput: `timevault, 2025
records platform over 57,000+ ww1 military records.
8-person agile course team.

  ownership i built the flask api layer, access control,
            and audit logging, trained the machine learning
            models, and carried integration testing for the
            team. the web client was built by teammates.

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
    year: "2026",
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
    stack: ["Next.js", "React", "TypeScript", "Drizzle ORM", "SQLite (libSQL)", "Zod", "bcrypt", "Vitest", "Docker"],
    resume: {
      label: "personal finance tracker",
      stack: ["Next.js", "React", "TypeScript", "Docker"],
      bullets: [
        "Built a full-stack finance tracker with secure, server-verified sessions",
        "Kept the calculation logic isolated and covered by automated tests",
      ],
    },
    code: {
      caption: "Authorization in the query: the row must match the ID and the owner, or nothing changes.",
      lang: "ts",
      source:
        "https://github.com/alysibak/mizan/blob/master/src/app/api/assets/%5Bid%5D/route.ts",
      code: `// The where clause scopes the update to rows this user owns.
const [row] = await db
  .update(assets)
  .set(parsed.data)
  .where(and(eq(assets.id, id), eq(assets.userId, user.id)))
  .returning();
if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });`,
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
    catOutput: `mizan, 2026
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

/** How Aly works, each backed by a project that shows it. */
export const principles = [
  {
    rule: "Check the output, not the import.",
    proof: "419 misclassified hybrids, caught by checking results against what they should be.",
    project: "carinfo",
  },
  {
    rule: "Put authorization in the query.",
    proof: "Every update matches the record and its owner, so a guessed ID reaches nothing.",
    project: "mizan",
  },
  {
    rule: "Say what I didn't build.",
    proof: "Team projects name the parts teammates built, right next to mine.",
    project: "bystander",
  },
];

/** Numbers from projects and teaching only. Employer work stays vague. */
export const highlights: Stat[] = [
  { value: 28000, label: "vehicles in CarInfo" },
  { value: 419, label: "misclassified hybrids caught" },
  { value: 57000, suffix: "+", label: "WWI records in TimeVault" },
  { value: 250, suffix: "+", label: "students supported as a TA" },
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
    role: "Software Developer (Co-op)",
    org: "Township of Centre Wellington",
    note: "Full-stack development on municipal government software.",
    stack: ["C#", "ASP.NET Core", "TypeScript", "SQL Server", "Azure"],
    bullets: [
      "Developed full-stack features from user interface through to database",
      "Built features for a multi-tenant platform shared by several municipalities, keeping each organization's data separate",
      "Built mobile-friendly field tools and real-time collaboration features",
      "Designed data models built for auditing and long-term record keeping",
      "Wrote automated end-to-end tests that run before every release",
      "Diagnosed and fixed critical bugs by systematically ruling out causes against the source",
      "Contributed to security reviews and raised design questions with leadership",
    ],
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
    note: "Full-stack development on a cloud-based inspection platform.",
    stack: ["Python", "React", "TypeScript", "PostgreSQL", "AWS"],
    bullets: [
      "Built and maintained features across the backend, frontend and cloud infrastructure",
      "Improved data pipeline and database performance, cutting processing time from days to minutes",
      "Investigated and resolved production issues spanning multiple services",
      "Strengthened access control in backend services",
      "Automated deployment work, later adopted across all client deployments",
      "Built internal dashboards and bulk-data tools that cut manual work for staff",
      "Took a leading role in release work, from feature tickets to end-to-end testing",
    ],
  },
  {
    lane: "teaching",
    start: "2024-09",
    end: "2024-12",
    period: "Sep–Dec 2024",
    role: "Teaching Assistant",
    org: "Discrete Structures (CIS*1910)",
    note: "Ran the shared support inbox for an online cohort.",
  },
  {
    lane: "school",
    start: "2023-09",
    period: "2023",
    role: "Started Computer Science (Co-op)",
    org: "University of Guelph",
  },
];

/** The TA role as one entry, the way the resume lists it. */
export const teaching = {
  role: "Teaching Assistant",
  org: "University of Guelph",
  period: "Sep 2024 – Present",
  summary: "Object-Oriented Programming in Java, Discrete Structures, Web Design and Development.",
  bullets: [
    "Teach object-oriented programming, discrete structures and web development across three courses",
    "Selected by three different professors for full-term appointments",
    "Support 250+ students through office hours, review sessions and an online support inbox",
  ],
};

export const teachingStats: Stat[] = [
  { value: 3, label: "courses taught" },
  { value: 3, label: "professors who selected me" },
  { value: 250, suffix: "+", label: "students supported" },
];

export const teachingNote = "Office hours, review sessions, and an online support inbox.";

export const leadership: LeadershipItem[] = [
  {
    role: "Technical Organizer",
    org: "HackCanada",
    period: "2026",
    context: "Built the event website and the judge-facing judging portal.",
    resume: "Technical Organizer, HackCanada, building the event website and judging portal",
  },
  {
    role: "Governor of Computing",
    org: "CCMPS Student Council",
    period: "Ongoing",
    context:
      "Elected, representing 2,300 Computing students at the University of Guelph.",
    resume: "Elected Governor of Computing, CCMPS Student Council, representing Computing students",
    current: true,
  },
  {
    role: "Technical Director",
    org: "Muslim Students Association",
    period: "Ongoing",
    context: "Maintain and extend the MSA website.",
    current: true,
  },
  {
    role: "Workshop Lead",
    org: "SOCIS and Google Developer Student Club",
    period: "Ongoing",
    context:
      "Design and lead hands-on full-stack and AI workshops for 50+ students.",
    resume: "Workshop Lead, SOCIS and Google Developer Student Club, running full-stack and AI workshops",
    current: true,
  },
];

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["Java", "Python", "C#", "TypeScript", "JavaScript", "SQL", "C", "HTML", "CSS"] },
  {
    label: "Web and Backend",
    items: ["React", "Next.js", "Node.js", "Express", "ASP.NET Core", ".NET", "Flask", "REST APIs"],
  },
  { label: "Data and Cloud", items: ["PostgreSQL", "SQL Server", "AWS", "Azure", "Docker", "Linux"] },
  {
    label: "Tools",
    items: ["Git", "GitHub", "Bitbucket", "Jira", "Playwright", "Vitest", "JUnit", "Metabase", "gdb"],
  },
  {
    label: "Practices",
    items: ["automated testing", "debugging", "code review", "secure coding", "CI/CD", "Agile"],
  },
];

/** Flat view of every role, for the content checker. */
export const experienceItems = [
  ...timeline.map((t) => ({
    role: t.role,
    company: t.org,
    context: [t.note, ...(t.bullets ?? [])].filter(Boolean).join(" "),
  })),
  { role: teaching.role, company: teaching.org, context: [teaching.summary, ...teaching.bullets].join(" ") },
  ...leadership.map((l) => ({ role: l.role, company: l.org, context: l.context })),
];

/** The resume's work section: co-op terms, then teaching as one entry. */
export const resumeWork = [
  ...timeline
    .filter((t) => t.lane === "co-op")
    .map((t) => ({
      role: t.role,
      org: t.org,
      period: t.period,
      summary: t.note ?? "",
      stack: t.stack ?? [],
      bullets: t.bullets ?? [],
    })),
  { ...teaching, stack: [] as string[] },
];

/** Leadership lines that appear on the resume (not every role does). */
export const resumeCommunity = leadership.flatMap((l) => (l.resume ? [l.resume] : []));

/** The resume as plain text, for `cat resume` in the shell. */
function resumeText() {
  const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");
  const keyWidth = Math.max(...skills.map((g) => g.label.length)) + 3;
  const bullets = (items: string[]) => items.map((b) => `  - ${b}`);
  return [
    `# ${site.name}`,
    `${site.email} · ${site.location} · ${bare(site.github)}`,
    "",
    "## Education",
    site.education.degree,
    `${site.education.school} · ${site.education.period}`,
    [...site.education.highlights, site.education.detail].join(" · "),
    "",
    "## Skills",
    ...skills.map((g) => `  ${g.label.toLowerCase().replace(/ /g, "-").padEnd(keyWidth)}${g.items.join(", ")}`),
    "",
    "## Work experience",
    ...resumeWork.flatMap((job) => [
      `${job.role} @ ${job.org}`,
      [job.period, job.stack.join(", ")].filter(Boolean).join(" · "),
      ...bullets(job.bullets),
      "",
    ]),
    "## Projects",
    ...projects.flatMap((p) => [
      `${p.title} · ${p.resume.label}${p.year ? ` · ${p.year.replace(/–$/, "–present")}` : ""}`,
      `  ${p.resume.stack.join(", ")}`,
      ...bullets(p.resume.bullets),
      "",
    ]),
    "## Leadership and community",
    ...bullets(resumeCommunity),
    "",
    `-> ${bare(site.url)}/resume`,
  ].join("\n");
}

export const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Experience", href: "/experience" },
  { label: "Resume", href: "/resume" },
] as const;

/** The technologies used most across projects, most-used first. */
const topStack = Object.entries(
  projects
    .flatMap((p) => p.stack)
    .reduce<Record<string, number>>((n, t) => ((n[t] = (n[t] ?? 0) + 1), n), {})
)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .map(([tech]) => tech.toLowerCase());

// Kept under ~40 columns so it fits a phone without wrapping.
const neofetchLogo = ["    /\\    ", "   /  \\   ", "  / /\\ \\  ", " / ____ \\ ", "/_/    \\_\\"];
const neofetchInfo = [
  "aly@portfolio",
  "-------------",
  `school   ${site.education.school.replace("University of ", "").toLowerCase()}, year 4`,
  "degree   cs co-op",
  `stack    ${topStack.slice(0, 2).join(", ")}`,
  `projects ${projects.length}, try 'ls projects'`,
  `status   seeking ${site.seeking.label.toLowerCase()}`,
  "shell    'help' for commands",
];

export const commandOutputs = {
  help: `available commands

  whoami         who I am
  ls             list sections
  cd <dir>       go to a page: cd work, cd carinfo, cd ~
  cat <name>     read a case study, or 'cat resume'
  grep <tech>    projects that use a technology
  ping <name>    check a live project answers
  git log        career history
  open <name>    open a project link
  mail           write to me
  neofetch       the one-screen summary
  man aly        the manual
  theme <mode>   dark, light, system, green, or amber
  clear          clear the console
  exit           close the console

also: pwd tree uptime fortune cowsay diff history date echo
pipes: cat resume | grep react   fortune | cowsay

keys: g w  work        g e  experience
      g r  resume      g h  home
      ctrl k  search   / or ~  this shell

tip: tab completes, → takes a suggestion.
try 'sudo hire aly'.`,

  whoami: `aly sibak
fourth-year computer science co-op, university of guelph
mississauga, ontario

two co-op terms of full-stack development: municipal
government software, and a cloud-based inspection
platform.

seeking: winter 2027 co-op (january-april), 4 or 8 months

i find what's broken. you're in the part of the site that
proves it.`,

  ls: `projects/     ${projects.map((p) => p.id).join("  ")}
experience/   co-op/  teaching/  leadership/
contact/      email  github  linkedin  resume`,

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

    feat: software developer co-op at centre wellington
    full-stack development on municipal government
    software.

commit c41b8e0
Date:   May 2025

    feat: software developer co-op at p&p optica
    full-stack development on a cloud-based inspection
    platform.

commit a90f12d
Date:   Sep 2024

    feat: teaching assistant at guelph
    three courses, selected by three professors. 250+
    students supported.

commit 1e7d4b5
Date:   2023

    init: started b.comp computer science (co-op) at guelph`,

  neofetch: neofetchInfo.map((info, i) => (neofetchLogo[i] ?? "").padEnd(12) + info).join("\n"),

  manAly: `ALY(1)                  User Commands                  ALY(1)

NAME
       aly - builds and debugs production systems

SYNOPSIS
       aly [--co-op winter-2027] [--from mississauga]

DESCRIPTION
       Fourth-year computer science co-op at the University
       of Guelph. Two co-op terms on production systems.
       Checks the output instead of trusting the import.

OPTIONS
       --hire    see 'sudo hire aly'

SEE ALSO
       cat(1): ${projects.map((p) => p.id).join(", ")}
       git-log(1), grep(1)`,

  sudoHire: `[sudo] password for recruiter: ********
permission granted.

opening your mail client. if it doesn't open:
  ${site.email}`,

  resume: resumeText(),

  sudoRmRf: "nice try.",
} as const;

export const projectIds = projects.map((p) => p.id);

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

/** The project's running deployment, if it has one. Bystander was a demo. */
export function liveUrl(project: Project): string | undefined {
  return project.links.find((l) => l.label === "Live")?.href;
}
