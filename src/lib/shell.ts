import {
  commandOutputs,
  getProject,
  liveUrl,
  projectIds,
  projects,
  site,
} from "./data";
import type { ThemeChoice } from "./theme";

export const COMMANDS = [
  "help",
  "whoami",
  "ls",
  "cat",
  "grep",
  "ping",
  "git",
  "open",
  "neofetch",
  "man",
  "history",
  "theme",
  "sudo",
  "clear",
  "exit",
] as const;

export type ShellLine =
  | { type: "prompt" }
  | { type: "input"; text: string }
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
};

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
    const matches = projectIds.filter((id) => id.startsWith(last));
    if (matches.length === 1) {
      return parts.slice(0, -1).join(" ") + " " + matches[0];
    }
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

export function executeCommand(
  state: ShellState,
  input: string
): ExecuteResult {
  const trimmed = input.trim();
  if (!trimmed) return { lines: [], state };

  const newHistory = [...state.history, trimmed];
  const lines: ShellLine[] = [{ type: "input", text: trimmed }];
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
      const path = arg.toLowerCase().replace(/\/$/, "");
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
      lines.push({
        type: "output",
        text: "usage: theme dark | light | system",
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
