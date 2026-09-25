import {
  commandOutputs,
  getProject,
  liveUrl,
  principles,
  projectIds,
  projects,
  site,
  teachingStats,
  timeline,
} from "./data";
import type { ThemeChoice } from "./theme";

export const COMMANDS = [
  "help",
  "whoami",
  "ls",
  "cd",
  "pwd",
  "cat",
  "grep",
  "ping",
  "git",
  "open",
  "neofetch",
  "man",
  "history",
  "theme",
  "mail",
  "tree",
  "uptime",
  "fortune",
  "cowsay",
  "date",
  "echo",
  "sudo",
  "clear",
  "exit",
] as const;

/** Full commands offered as you type, after your own history. */
export const SUGGESTIONS = [
  "help",
  "whoami",
  "cat resume",
  ...projectIds.map((id) => `cat ${id}`),
  "cd work",
  "cd experience",
  "cd resume",
  "git log",
  "grep react",
  "ping carinfo",
  "neofetch",
  "man aly",
  "sudo hire aly",
  "theme green",
  "theme amber",
  "tree",
  "uptime",
  "fortune",
  "cowsay hire aly",
];

export type ShellLine =
  | { type: "prompt" }
  /** cwd: where the command was typed, for its prompt. */
  | { type: "input"; text: string; cwd?: string }
  | { type: "output"; text: string; variant?: "error" | "dim" }
  | { type: "system"; text: string };

export type ShellState = {
  history: string[];
};

export type ExecuteResult = {
  lines: ShellLine[];
  state: ShellState;
  openUrl?: string;
  /** A mailto: link to follow. Separate from openUrl, which opens a tab. */
  mailto?: string;
  theme?: ThemeChoice;
  /** A live site to time; the console prints the answer when it arrives. */
  ping?: { id: string; url: string };
  /** A page on this site to go to (from cd). */
  navigate?: string;
};

/** "/work/carinfo" -> "~/work/carinfo", as a prompt shows it. */
export function promptPath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, "");
  return clean ? `~${clean}` : "~";
}

/** Where `cd <arg>` goes from `cwd`, or null if there's no such page. */
export function resolveCd(cwd: string, arg: string): string | null {
  const here = cwd.replace(/\/+$/, "") || "/";
  let target = arg.trim().toLowerCase();
  if (!target || target === "~" || target === "/" || target === "~/") return "/";
  if (target === "..") return here.split("/").slice(0, -1).join("/") || "/";
  if (target === ".") return here;
  target = target.replace(/^~?\//, "").replace(/\/+$/, "").replace(/\.md$/, "");
  // From inside a project, ../mizan is a sibling.
  if (target.startsWith("../") && here.startsWith("/work/")) target = `work/${target.slice(3)}`;
  target = target.replace(/^projects(\/|$)/, "work$1");
  if (target === "work" || target === "experience" || target === "resume") return `/${target}`;
  const id = target.replace(/^work\//, "");
  if (getProject(id)) return `/work/${id}`;
  return null;
}

const CD_TARGETS = ["work/", "experience/", "resume", "..", "~", ...projectIds];

function tree(): string {
  const rows = projects.map((p, i) => `│   ${i === projects.length - 1 ? "└──" : "├──"} ${p.id}`);
  return ["~", "├── work/", ...rows, "├── experience/", "└── resume.md", "", `2 directories, ${projects.length + 1} files`].join("\n");
}

function uptime(now: Date): string {
  const [y, m] = site.education.start.split("-").map(Number);
  const days = Math.floor((now.getTime() - new Date(y, m - 1, 1).getTime()) / 86_400_000);
  const years = Math.floor(days / 365);
  const weeks = Math.floor((days % 365) / 7);
  const coops = timeline.filter((t) => t.lane === "co-op").length;
  const clock = now.toTimeString().slice(0, 8);
  return [
    `${clock} up ${years} years, ${weeks} weeks (since ${new Date(y, m - 1).toLocaleString("en", { month: "short" }).toLowerCase()} ${y} at guelph)`,
    `load average: ${projects.length} projects, ${coops} co-ops, ${teachingStats[0].value} courses taught`,
  ].join("\n");
}

function cowsay(text: string): string {
  const words = text.split(/\s+/).filter(Boolean);
  const rows: string[] = [];
  for (const word of words) {
    const last = rows[rows.length - 1];
    if (last !== undefined && (last + " " + word).length <= 30) rows[rows.length - 1] = `${last} ${word}`;
    else rows.push(word.slice(0, 30));
  }
  const width = Math.max(...rows.map((r) => r.length));
  const body =
    rows.length === 1
      ? [`< ${rows[0]} >`]
      : rows.map((r, i) => {
          const [l, rr] = i === 0 ? ["/", "\\"] : i === rows.length - 1 ? ["\\", "/"] : ["|", "|"];
          return `${l} ${r.padEnd(width)} ${rr}`;
        });
  return [
    ` ${"_".repeat(width + 2)}`,
    ...body,
    ` ${"-".repeat(width + 2)}`,
    "        \\   ^__^",
    "         \\  (oo)\\_______",
    "            (__)\\       )\\/\\",
    "                ||----w |",
    "                ||     ||",
  ].join("\n");
}

function normalizeProjectArg(arg: string): string {
  return arg.toLowerCase().replace(/\.case$/, "").trim();
}

export function getCompletion(input: string): string | null {
  const trimmed = input.trimStart();
  const parts = trimmed.split(/\s+/);
  const endsWithSpace = input.endsWith(" ");

  if (parts.length === 0 || (parts.length === 1 && !endsWithSpace)) {
    const prefix = (parts[0] ?? "").toLowerCase();
    const matches = COMMANDS.filter((c) => c.startsWith(prefix));
    if (matches.length === 1) return matches[0] + " ";
    return null;
  }

  const cmd = parts[0].toLowerCase();
  const last = parts[parts.length - 1]?.toLowerCase() ?? "";

  if ((cmd === "cat" || cmd === "open" || cmd === "ping") && parts.length >= 2 && !endsWithSpace) {
    const names = cmd === "cat" ? [...projectIds, "resume"] : projectIds;
    const matches = names.filter((id) => id.startsWith(last));
    if (matches.length === 1) {
      return parts.slice(0, -1).join(" ") + " " + matches[0];
    }
  }

  if (cmd === "cd" && parts.length >= 2 && !endsWithSpace) {
    const matches = CD_TARGETS.filter((t) => t.startsWith(last) && t !== last);
    if (matches.length === 1) return `cd ${matches[0]}`;
  }

  if (cmd === "ls" && parts.length >= 2 && !endsWithSpace) {
    const path = parts.slice(1).join(" ").toLowerCase();
    if (!path) return null;
    const candidates = [
      "projects/",
      "experience/",
      "contact/",
      ...projectIds.map((id) => `projects/${id}`),
    ];
    const matches = candidates.filter(
      (c) => c.startsWith(path) && c !== path
    );
    if (matches.length === 1) return `ls ${matches[0]}`;
  }

  if (cmd === "git" && parts[1]?.startsWith("l")) {
    return "git log";
  }

  return null;
}

/** Shell-style suggestion for what's typed so far: your history first. */
export function getSuggestion(input: string, history: string[]): string {
  if (!input.trim()) return "";
  const pool = [...history].reverse().concat(SUGGESTIONS);
  const hit = pool.find((c) => c.startsWith(input) && c !== input);
  return hit ? hit.slice(input.length) : "";
}

export function executeCommand(
  state: ShellState,
  input: string,
  cwd = "/"
): ExecuteResult {
  const trimmed = input.trim();
  if (!trimmed) return { lines: [], state };

  const newHistory = [...state.history, trimmed];
  const lines: ShellLine[] = [{ type: "input", text: trimmed, cwd }];
  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const arg = parts.slice(1).join(" ");

  switch (cmd) {
    case "help":
      lines.push({ type: "output", text: commandOutputs.help });
      break;

    case "whoami":
      lines.push({ type: "output", text: commandOutputs.whoami });
      break;

    case "ls": {
      const named = parts.slice(1).filter((p) => !p.startsWith("-")).join(" ");
      let path = named.toLowerCase().replace(/^~?\//, "").replace(/\/$/, "");
      if (!path && cwd.startsWith("/work")) path = "projects";
      if (path === "work") path = "projects";
      if (!path) {
        lines.push({ type: "output", text: commandOutputs.ls });
      } else if (path === "projects") {
        lines.push({ type: "output", text: projectIds.join("  ") });
      } else if (path === "experience") {
        lines.push({ type: "output", text: commandOutputs.lsExperience });
      } else if (path === "contact") {
        lines.push({ type: "output", text: commandOutputs.lsContact });
      } else if (path.startsWith("projects/")) {
        const id = normalizeProjectArg(path.replace("projects/", ""));
        if (getProject(id)) {
          lines.push({
            type: "output",
            text: `${commandOutputs.lsProjectFields}   (try 'cat ${id}')`,
          });
        } else {
          lines.push({
            type: "output",
            text: `ls: cannot access '${arg}': No such file or directory`,
            variant: "error",
          });
        }
      } else {
        lines.push({
          type: "output",
          text: `ls: cannot access '${arg}': No such file or directory`,
          variant: "error",
        });
      }
      break;
    }

    case "cat": {
      if (!arg) {
        lines.push({
          type: "output",
          text: "cat: missing operand. try 'cat bystander'.",
          variant: "error",
        });
        break;
      }
      const id = normalizeProjectArg(arg);
      if (id === "resume" || id === "resume.md") {
        lines.push({ type: "output", text: commandOutputs.resume });
        break;
      }
      const project = getProject(id);
      if (project) {
        lines.push({ type: "output", text: project.catOutput });
      } else {
        lines.push({
          type: "output",
          text: `cat: ${arg}: No such file`,
          variant: "error",
        });
      }
      break;
    }

    case "git":
      if (parts[1] === "log") {
        lines.push({ type: "output", text: commandOutputs.gitLog });
      } else {
        lines.push({
          type: "output",
          text: `git: '${parts[1] ?? ""}' is not a git command. See 'git log'.`,
          variant: "error",
        });
      }
      break;

    case "open": {
      if (!arg) {
        lines.push({
          type: "output",
          text: "open: missing operand. try 'open bystander'.",
          variant: "error",
        });
        break;
      }
      const id = normalizeProjectArg(arg);
      const project = getProject(id);
      if (!project) {
        lines.push({
          type: "output",
          text: "no such project. try 'ls'.",
          variant: "error",
        });
        break;
      }
      if (!project.openUrl) {
        lines.push({
          type: "output",
          text: `${project.id}: no public link available.`,
          variant: "dim",
        });
        break;
      }
      lines.push({
        type: "output",
        text: `opening ${project.openUrl}`,
        variant: "dim",
      });
      return {
        lines,
        state: { history: newHistory },
        openUrl: project.openUrl,
      };
    }

    case "theme": {
      const choice = parts[1]?.toLowerCase();
      if (choice === "dark" || choice === "light" || choice === "system") {
        lines.push({ type: "output", text: `theme: ${choice}`, variant: "dim" });
        return { lines, state: { history: newHistory }, theme: choice };
      }
      if (choice === "green" || choice === "amber") {
        lines.push({
          type: "output",
          text: `theme: ${choice} phosphor. 'theme system' to go back.`,
          variant: "dim",
        });
        return { lines, state: { history: newHistory }, theme: choice };
      }
      lines.push({
        type: "output",
        text: "usage: theme dark | light | system | green | amber",
        variant: "error",
      });
      break;
    }

    case "grep": {
      const term = arg.toLowerCase().replace(/^["']|["']$/g, "").trim();
      if (!term) {
        lines.push({ type: "output", text: "usage: grep <tech>   e.g. grep react", variant: "error" });
        break;
      }
      const hits = projects.filter((p) =>
        [p.title, p.tagline, ...p.stack].some((field) => field.toLowerCase().includes(term))
      );
      if (hits.length === 0) {
        lines.push({ type: "output", text: `grep: no project mentions "${term}"`, variant: "dim" });
        break;
      }
      const width = Math.max(...hits.map((p) => p.id.length)) + 2;
      lines.push({
        type: "output",
        text: [
          `${hits.length} project${hits.length === 1 ? "" : "s"} mention "${term}":`,
          "",
          ...hits.map((p) => `  ${p.id.padEnd(width)}${p.stack.join(", ").toLowerCase()}`),
          "",
          hits.some((p) => p.role === "team")
            ? "team projects list only the parts i built. try 'cat <name>'."
            : "try 'cat <name>'.",
        ].join("\n"),
      });
      break;
    }

    case "ping": {
      if (!arg) {
        lines.push({ type: "output", text: "usage: ping <name>   e.g. ping carinfo", variant: "error" });
        break;
      }
      const project = getProject(normalizeProjectArg(arg));
      if (!project) {
        lines.push({ type: "output", text: `ping: ${arg}: unknown project. try 'ls projects'.`, variant: "error" });
        break;
      }
      const url = liveUrl(project);
      if (!url) {
        lines.push({
          type: "output",
          text: `ping: ${project.id} was a hackathon demo. there's no live server to ping.`,
          variant: "dim",
        });
        break;
      }
      lines.push({ type: "output", text: `PING ${new URL(url).host}`, variant: "dim" });
      return { lines, state: { history: newHistory }, ping: { id: project.id, url } };
    }

    case "cd": {
      const target = resolveCd(cwd, arg);
      if (!target) {
        lines.push({ type: "output", text: `cd: no such file or directory: ${arg}. try 'tree'.`, variant: "error" });
        break;
      }
      if (target === (cwd.replace(/\/+$/, "") || "/")) break;
      return { lines, state: { history: newHistory }, navigate: target };
    }

    case "pwd":
      lines.push({ type: "output", text: `/home/aly${cwd === "/" ? "" : cwd.replace(/\/+$/, "")}` });
      break;

    case "tree":
      lines.push({ type: "output", text: tree() });
      break;

    case "uptime":
      lines.push({ type: "output", text: uptime(new Date()) });
      break;

    case "date":
      lines.push({ type: "output", text: new Date().toString().replace(/ \(.*\)$/, "") });
      break;

    case "echo":
      lines.push({ type: "output", text: arg.replace(/^["']|["']$/g, "") || "\u00a0" });
      break;

    case "fortune": {
      const pick = principles[Math.floor(Math.random() * principles.length)];
      lines.push({ type: "output", text: `${pick.rule}\n  -- ${pick.proof}\n\n(see 'cat ${pick.project}')` });
      break;
    }

    case "cowsay":
      lines.push({ type: "output", text: cowsay(arg.replace(/^["']|["']$/g, "") || "hire aly") });
      break;

    case "mail":
      lines.push({ type: "output", text: `to: ${site.email}\nopening your mail client.`, variant: "dim" });
      return { lines, state: { history: newHistory }, mailto: `mailto:${site.email}` };

    case "vim":
    case "vi":
    case "nano":
    case "emacs":
      lines.push({
        type: "output",
        text: `${cmd}: this shell is read-only. (and you'd never get out of ${cmd === "vim" || cmd === "vi" ? "vim" : "it"}.)\ntry 'cat resume' instead.`,
        variant: "dim",
      });
      break;

    case "rm":
      lines.push({ type: "output", text: trimmed.includes("-rf") ? commandOutputs.sudoRmRf : "rm: permission denied. it's a portfolio.", variant: "dim" });
      break;

    case "neofetch":
      lines.push({ type: "output", text: commandOutputs.neofetch });
      break;

    case "man":
      if (parts[1]?.toLowerCase() === "aly") {
        lines.push({ type: "output", text: commandOutputs.manAly });
      } else {
        lines.push({
          type: "output",
          text: parts[1] ? `No manual entry for ${parts[1]}. try 'man aly'.` : "What manual page do you want? try 'man aly'.",
          variant: "error",
        });
      }
      break;

    case "history":
      lines.push({
        type: "output",
        text: newHistory.map((h, i) => `${String(i + 1).padStart(4)}  ${h}`).join("\n"),
      });
      break;

    case "clear":
      return {
        lines: [{ type: "system", text: "__CLEAR__" }],
        state: { history: newHistory },
      };

    case "exit":
      lines.push({ type: "system", text: "__CLOSE__" });
      break;

    case "sudo":
      if (trimmed.toLowerCase().includes("rm -rf")) {
        lines.push({ type: "output", text: commandOutputs.sudoRmRf });
      } else if (/^sudo\s+hire(\s+aly)?$/i.test(trimmed)) {
        lines.push({ type: "output", text: commandOutputs.sudoHire });
        return {
          lines,
          state: { history: newHistory },
          mailto: `mailto:${site.email}?subject=${encodeURIComponent("Winter 2027 co-op")}`,
        };
      } else {
        lines.push({
          type: "output",
          text: `command not found: ${cmd}. try 'help'.`,
          variant: "error",
        });
      }
      break;

    default:
      lines.push({
        type: "output",
        text: `command not found: ${cmd}. try 'help'.`,
        variant: "error",
      });
  }

  return { lines, state: { history: newHistory } };
}
