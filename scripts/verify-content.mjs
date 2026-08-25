/**
 * Content integrity check. Runs on `npm run build` via the prebuild script.
 *
 * The site makes claims a recruiter can check against the resume, the repos,
 * and the live deployments. These rules are the structural guard against a
 * claim drifting out of line with what is actually verified.
 *
 * Plain ESM on purpose: the content module is TypeScript, so it is loaded
 * through Vite (already present via Astro) rather than a Node type-stripping
 * flag. If Astro can build on this Node version, this check can run on it.
 *
 * Run directly with:  npm run verify
 */
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));

async function loadContent() {
  const server = await createServer({
    root,
    configFile: false,
    logLevel: "silent",
    server: { middlewareMode: true, watch: null },
    appType: "custom",
  });
  try {
    return await server.ssrLoadModule("/src/lib/data.ts");
  } finally {
    await server.close();
  }
}

const { site, projects, experience, experienceItems, coursework, commandOutputs } =
  await loadContent();

/** The only external URLs permitted anywhere in site content. */
const ALLOWED_URLS = [
  "https://github.com/alysibak",
  "https://www.linkedin.com/in/aly-sibak-721b85252",
  "https://carinfo-client.vercel.app",
  "https://github.com/alysibak/carinfo",
  "https://timevault-web.onrender.com",
  "https://github.com/alysibak/TimeVault",
  "https://devpost.com/software/bystander",
  "https://github.com/hackcanada2026-aaaa/bystander",
  "https://mizan-sandy-eight.vercel.app",
  "https://github.com/alysibak/mizan",
  "https://github.com/alysibak/ePortfolio",
  "https://github.com/alysibak/DiscussionBoard",
  "https://github.com/alysibak/GraphTraversal-ShortestPath",
  "https://github.com/alysibak/ExpressionParser-HeapSort",
];

/** Dead or not-ours. Must never render. */
const BLOCKED_URL_SUBSTRINGS = ["hackcanada-judging", "mizan-app.fly.dev"];

const BANNED_PHRASES = [
  "passionate about",
  "i love building things that matter",
  "turning ideas into reality",
  "bringing ideas to life",
  "let's build something amazing",
  "innovative solutions",
  "cutting-edge",
  "leverage my skills",
  "tech enthusiast",
  "problem solver at heart",
  "always learning",
  "wearing many hats",
  "seamless",
  "robust and scalable",
  "delve",
  "in today's fast-paced world",
];

const errors = [];
const fail = (rule, detail) => errors.push(`[${rule}] ${detail}`);

/** Every string reachable from the content modules, with a path label. */
function collectStrings(value, path) {
  if (typeof value === "string") return [[path, value]];
  if (Array.isArray(value)) {
    return value.flatMap((v, i) => collectStrings(v, `${path}[${i}]`));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) =>
      collectStrings(v, `${path}.${k}`)
    );
  }
  return [];
}

const content = { site, projects, experience, coursework, commandOutputs };
const allStrings = collectStrings(content, "content");

// 1. ownership is mandatory on team projects.
for (const p of projects) {
  if (p.role === "team" && !p.ownership?.trim()) {
    fail(
      "ownership",
      `project "${p.id}" is role:team but has no ownership line. A team project must state what Aly personally built.`
    );
  }
  if (p.role === "team" && p.teamSize == null) {
    fail("ownership", `project "${p.id}" is role:team but has no teamSize.`);
  }
  if (p.role === "solo" && p.ownership) {
    fail(
      "ownership",
      `project "${p.id}" is role:solo but carries an ownership line.`
    );
  }
}

// 2. Every decision needs a title and reasoning.
for (const p of projects) {
  if (p.caseStudy.decisions.length === 0) {
    fail("decisions", `project "${p.id}" has no decisions.`);
  }
  p.caseStudy.decisions.forEach((d, i) => {
    if (!d.title?.trim() || !d.reasoning?.trim()) {
      fail(
        "decisions",
        `project "${p.id}" decision ${i} is missing title or reasoning.`
      );
    }
  });
}

// 3. Every URL in content is on the allowlist.
const URL_RE = /https?:\/\/[^\s"'`,)\]]+/g;
for (const [path, str] of allStrings) {
  for (const url of str.match(URL_RE) ?? []) {
    const clean = url.replace(/[.,]$/, "");
    if (!ALLOWED_URLS.includes(clean)) {
      fail("url-allowlist", `${path} contains a non-allowlisted URL: ${clean}`);
    }
  }
}

// 4. No blocked URL anywhere, in any form (including bare hostnames).
for (const [path, str] of allStrings) {
  for (const blocked of BLOCKED_URL_SUBSTRINGS) {
    if (str.toLowerCase().includes(blocked)) {
      fail("blocked-url", `${path} references a blocked URL: ${blocked}`);
    }
  }
}

// 5. No banned phrase.
for (const [path, str] of allStrings) {
  const lower = str.toLowerCase();
  for (const phrase of BANNED_PHRASES) {
    if (lower.includes(phrase)) {
      fail("banned-phrase", `${path} contains a banned phrase: "${phrase}"`);
    }
  }
}

// 6. Award naming is exact where it appears.
const AWARD = "Best Use of Presage Technologies";
const bystander = projects.find((p) => p.id === "bystander");
if (bystander && bystander.award !== `${AWARD}, out of 800 participants`) {
  fail(
    "award-name",
    `Bystander award must read "${AWARD}, out of 800 participants". Found: "${bystander.award}"`
  );
}
for (const [path, str] of allStrings) {
  if (/1st place|first place|best overall/i.test(str)) {
    fail("award-name", `${path} inflates the award: "${str.slice(0, 80)}"`);
  }
}

// 7. Governor of Computing is university-level, never national or provincial.
//    Checked per whole record, not per field: the role title and the
//    description that miscasts it live in two different strings.
const scopeScopes = [
  ...experienceItems.map((e, i) => [
    `experienceItems[${i}]`,
    `${e.role} ${e.company} ${e.context} ${(e.details ?? []).join(" ")}`,
  ]),
  ...allStrings,
];
for (const [path, str] of scopeScopes) {
  if (/governor of computing/i.test(str) && /national|provincial/i.test(str)) {
    fail(
      "governor-scope",
      `${path} describes Governor of Computing as national or provincial. It is university-level: 2,300 Computing students at Guelph.`
    );
  }
}

// 8. Never "led" for the Java teaching appointment.
for (const [path, str] of allStrings) {
  if (/\bled\b[^.]{0,40}(lab|java)/i.test(str)) {
    fail(
      "teaching-verb",
      `${path} uses "led" for a teaching appointment. Use "appointed to support".`
    );
  }
}

// 9. Titles stay honest: no bare "Software Engineer".
for (const [path, str] of allStrings) {
  if (/software engineer(?!ing)/i.test(str)) {
    fail(
      "title-inflation",
      `${path} uses "Software Engineer". He is a CS co-op student.`
    );
  }
  if (/software engineering major/i.test(str)) {
    fail("title-inflation", `${path} says "Software Engineering major".`);
  }
}

// 10. The resume link must point at a file that exists.
const resumePath = fileURLToPath(
  new URL(`../public${site.resume}`, import.meta.url)
);
if (!existsSync(resumePath)) {
  fail(
    "resume",
    `site.resume points at ${site.resume}, which is not in public/.`
  );
}

if (errors.length > 0) {
  console.error(`\ncontent verification failed (${errors.length}):\n`);
  for (const e of errors) console.error(`  ${e}`);
  console.error("");
  process.exit(1);
}

console.log(
  `content verified: ${projects.length} projects, ${experienceItems.length} roles in ${experience.length} groups, ${allStrings.length} strings checked.`
);
