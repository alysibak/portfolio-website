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
  caseStudy: CaseStudy;
  catOutput: string;
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  context: string;
  /** Optional breakdown rendered as a sub-list, e.g. individual appointments. */
  details?: string[];
  current?: boolean;
};

export type ExperienceGroup = {
  label: string;
  /** Rendered small and dense, so paid roles are not visually flattened against service roles. */
  compact?: boolean;
  items: ExperienceItem[];
};

export const site = {
  name: "Aly Sibak",
  roleLine: "I build and debug production systems",
  now: "Most recently a multi-tenant compliance platform used by Ontario municipalities, and a foreign-object detection platform for food processing.",
  school: "Fourth-year Computer Science co-op, University of Guelph",
  location: "Mississauga, Ontario",
  availability: "Seeking Winter 2027 co-op, January–April",
  description:
    "Aly Sibak, Computer Science co-op student at the University of Guelph. Two co-op terms building and debugging production systems. Seeking Winter 2027.",
  email: "asibak@uoguelph.ca",
  github: "https://github.com/alysibak",
  linkedin: "https://www.linkedin.com/in/aly-sibak-721b85252",
  resume: "/Aly_Sibak_Base_Resume_1Page.pdf",
  education: {
    degree: "Bachelor of Computing (Honours), Computer Science, Co-op",
    school: "University of Guelph",
    detail: "Expected April 2028. Fourth year.",
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
            "Every update and delete matches on both record ID and owner ID, so a guessed UUID cannot reach another account. Not a middleware guard a future handler might forget: it is in the query itself. I have found this exact vulnerability class twice in production systems, once while auditing my own shipped feature. This is the design that prevents it.",
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

  note      i have found this authorization bug class twice in
            production. this is the design that prevents it.

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

export const experience: ExperienceGroup[] = [
  {
    label: "Co-op terms",
    items: [
      {
        role: "Source Protection Software Developer (Co-op)",
        company: "Township of Centre Wellington",
        period: "May–Sep 2026",
        context:
          "LSWIMS, a multi-tenant Clean Water Act compliance platform used by municipalities and conservation authorities across Ontario.",
      },
      {
        role: "Software Developer (Co-op)",
        company: "P&P Optica",
        period: "May–Dec 2025",
        context:
          "PPO Insights, a foreign-object detection platform for food processing serving 20+ enterprise facilities.",
      },
    ],
  },
  {
    label: "Teaching",
    items: [
      {
        role: "Teaching Assistant",
        company: "University of Guelph",
        period: "Sep 2024–present",
        context:
          "Selected for three full 1.0 (140-hour) paid appointments across three different courses. Graded assignments and exams with detailed written feedback, and ran exam review sessions.",
        details: [
          "Discrete Structures (CIS*1910). Supported 250+ students and ran the shared support inbox for an online cohort.",
          "Object-Oriented Programming in Java (CIS*2430). Appointed to support lab sections, office hours, and grading; the term begins September 2026.",
        ],
        current: true,
      },
    ],
  },
  {
    label: "Leadership and activities",
    compact: true,
    items: [
      {
        role: "Tech Organizer",
        company: "HackCanada",
        period: "2026",
        context: "Built the event website and the judge-facing judging portal.",
      },
      {
        role: "Governor of Computing",
        company: "CCMPS Student Council",
        period: "Ongoing",
        context:
          "Elected, representing 2,300 Computing students at the University of Guelph.",
        current: true,
      },
      {
        role: "Technical Director",
        company: "Muslim Students Association",
        period: "Ongoing",
        context: "Maintain and extend the MSA website.",
        current: true,
      },
      {
        role: "Workshop Lead",
        company: "SOCIS and Google Developer Student Club",
        period: "Ongoing",
        context:
          "Design and lead hands-on full-stack and AI workshops for 50+ students.",
        current: true,
      },
    ],
  },
];

/** Flat view, for the shell and the content checker. */
export const experienceItems: ExperienceItem[] = experience.flatMap(
  (group) => group.items
);

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
    authorities. shipped a threat inspection module, built
    real-time messaging on signalr, closed five security
    defects.

commit c41b8e0
Date:   May 2025

    feat: software developer co-op at p&p optica
    ppo insights, foreign-object detection for food
    processing across 20+ enterprise facilities. cut a
    processing job from 3 days to 5 minutes. found a live
    authorization vulnerability while auditing my own
    feature.

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
