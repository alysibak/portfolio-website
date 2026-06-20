import {
  commandOutputs,
  getProject,
  projectIds,
} from "./data";

export const COMMANDS = [
  "help",
  "whoami",
  "ls",
  "cat",
  "git",
  "open",
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

  if ((cmd === "cat" || cmd === "open") && parts.length >= 2 && !endsWithSpace) {
    const matches = projectIds.filter((id) => id.startsWith(last));
    if (matches.length === 1) {
      return parts.slice(0, -1).join(" ") + " " + matches[0];
    }
  }

  if (cmd === "ls" && parts.length >= 2 && !endsWithSpace) {
    const path = parts.slice(1).join(" ").toLowerCase();
    if ("projects/bystander".startsWith(path) && path.length > 0) {
      if (path === "projects/bystander") return null;
      return "ls projects/bystander";
    }
    if ("projects/".startsWith(path)) return "ls projects/";
    for (const id of projectIds) {
      if (`projects/${id}`.startsWith(path)) {
        return `ls projects/${id}`;
      }
    }
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
      } else if (path === "projects/bystander") {
        lines.push({ type: "output", text: commandOutputs.lsProjectBystander });
      } else if (path.startsWith("projects/")) {
        const id = normalizeProjectArg(path.replace("projects/", ""));
        if (getProject(id)) {
          lines.push({ type: "output", text: commandOutputs.lsProjectBystander });
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
