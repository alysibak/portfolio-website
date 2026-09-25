import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { applyTheme } from "../lib/theme";
import { probe } from "../lib/status";
import {
  executeCommand,
  getCompletion,
  type ShellLine,
  type ShellState,
} from "../lib/shell";

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    target.isContentEditable ||
    target.closest("[data-console-open]") !== null
  );
}

/**
 * Column a soft-wrapped row should continue from, so narrow screens keep the
 * hand-set layout: "  problem   text" wraps under "text", not under "problem".
 */
function hangingIndent(row: string): number {
  const label = row.match(/^\s*\S+(?: \S+)?\s{2,}/);
  if (label) return label[0].length;
  const lead = row.length - row.trimStart().length;
  if (lead === 2) {
    const word = row.slice(2).match(/^\S+\s/);
    if (word) return 2 + word[0].length;
  }
  return lead;
}

/** Tappable commands, for phones and for anyone who'd rather not type. */
const QUICK_COMMANDS = [
  "help",
  "whoami",
  "cat carinfo",
  "grep react",
  "ping carinfo",
  "git log",
  "neofetch",
  "man aly",
];

type Queued = { cmd: string; fromLink: boolean };

function bootLines(): ShellLine[] {
  const result = executeCommand({ history: [] }, "help");
  return [
    ...result.lines.filter((l) => l.type === "output"),
    { type: "prompt" },
  ];
}

export default function Console() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<ShellLine[]>([]);
  const [shell, setShell] = useState<ShellState>({ history: [] });
  const [input, setInput] = useState("");
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const draftRef = useRef("");
  const returnFocusRef = useRef<HTMLElement | null>(null);
  /** A command to run as soon as the console is open (from a link or button). */
  const queuedRef = useRef<Queued | null>(null);
  const runRef = useRef<(cmd: string, fromLink?: boolean) => void>(() => {});

  const openWithHelp = useCallback(() => {
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setOpen(true);
    setLines(bootLines());
    setInput("");
    setHistoryIdx(-1);
    draftRef.current = "";
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setInput("");
    setHistoryIdx(-1);
  }, []);

  useEffect(() => {
    if (!open && returnFocusRef.current) {
      returnFocusRef.current.focus();
      returnFocusRef.current = null;
    }
  }, [open]);

  // Opened from a button rather than the keyboard. Rendering synchronously and
  // focusing inside the tap is what lets mobile browsers raise the keyboard.
  // A button can carry a command (data-cmd) to run once the console is open.
  useEffect(() => {
    const takeCommand = () => {
      const cmd = window.__consoleCmd;
      window.__consoleCmd = undefined;
      if (cmd) queuedRef.current = { cmd, fromLink: false };
    };
    const onRequest = () => {
      window.__consoleRequested = false;
      takeCommand();
      flushSync(openWithHelp);
      inputRef.current?.focus();
    };
    window.__consoleReady = true;
    if (window.__consoleRequested) {
      window.__consoleRequested = false;
      takeCommand();
      openWithHelp();
    }
    window.addEventListener("console:open", onRequest);
    return () => window.removeEventListener("console:open", onRequest);
  }, [openWithHelp]);

  // Links like /?cmd=cat+carinfo open the shell and run the command. Commands
  // that would open a tab or a mail client only print when run from a link.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cmd = params.get("cmd");
    if (!cmd) return;
    params.delete("cmd");
    const query = params.toString();
    window.history.replaceState(
      window.history.state,
      "",
      window.location.pathname + (query ? `?${query}` : "") + window.location.hash
    );
    queuedRef.current = { cmd: cmd.slice(0, 200), fromLink: true };
    openWithHelp();
  }, [openWithHelp]);

  const scrollBottom = useCallback(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  // Focus once on open, not on every new line: tapping a quick command on a
  // phone shouldn't pull the keyboard up over the output.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (open) scrollBottom();
  }, [open, lines, scrollBottom]);

  const runCommand = useCallback(
    (cmd: string, fromLink = false) => {
      const { lines: newLines, state, openUrl, mailto, theme, ping } = executeCommand(shell, cmd);
      if (theme) applyTheme(theme);

      for (const line of newLines) {
        if (line.type === "system" && line.text === "__CLOSE__") {
          close();
          return;
        }
        if (line.type === "system" && line.text === "__CLEAR__") {
          setLines([{ type: "prompt" }]);
          setShell(state);
          setInput("");
          setHistoryIdx(-1);
          return;
        }
      }

      if (openUrl && !fromLink) {
        window.open(openUrl, "_blank", "noopener,noreferrer");
      }
      if (mailto && !fromLink) {
        window.location.href = mailto;
      }
      if (ping) {
        const host = new URL(ping.url).host;
        probe(ping.url).then(({ ok, ms }) => {
          const reply: ShellLine = ok
            ? {
                type: "output",
                text:
                  `reply from ${host}: time=${ms} ms` +
                  (ms > 3000 ? "\n(slow start: free-tier hosts sleep when idle)" : ""),
              }
            : {
                type: "output",
                text:
                  ms < 1500
                    ? `ping: couldn't reach ${host}. check your connection.`
                    : `no reply from ${host} after ${Math.round(ms / 1000)} s. free-tier hosts sleep; try again.`,
                variant: "error",
              };
          // Keep the prompt last.
          setLines((prev) =>
            prev[prev.length - 1]?.type === "prompt"
              ? [...prev.slice(0, -1), reply, prev[prev.length - 1]]
              : [...prev, reply]
          );
        });
      }

      setLines((prev) => [...prev, ...newLines, { type: "prompt" }]);
      setShell(state);
      setInput("");
      setHistoryIdx(-1);
      draftRef.current = "";
    },
    [shell, close]
  );

  useEffect(() => {
    runRef.current = runCommand;
  }, [runCommand]);

  useEffect(() => {
    if (!open || !queuedRef.current) return;
    const { cmd, fromLink } = queuedRef.current;
    queuedRef.current = null;
    runRef.current(cmd, fromLink);
  }, [open]);

  const handleGlobalKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open && !isEditableTarget(e.target)) {
        if (
          e.key === "~" ||
          e.key === "?" ||
          (e.key === "/" && !e.metaKey && !e.ctrlKey)
        ) {
          e.preventDefault();
          openWithHelp();
        }
        return;
      }

      if (!open) return;

      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    },
    [open, openWithHelp, close]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [handleGlobalKeyDown]);

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (input.trim()) runCommand(input);
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const completion = getCompletion(input);
      if (completion) setInput(completion);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (shell.history.length === 0) return;
      if (historyIdx === -1) draftRef.current = input;
      const next =
        historyIdx === -1
          ? shell.history.length - 1
          : Math.max(0, historyIdx - 1);
      setHistoryIdx(next);
      setInput(shell.history[next]);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const next = historyIdx + 1;
      if (next >= shell.history.length) {
        setHistoryIdx(-1);
        setInput(draftRef.current);
      } else {
        setHistoryIdx(next);
        setInput(shell.history[next]);
      }
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
      data-console-open
      role="dialog"
      aria-label="Portfolio console"
      aria-modal="true"
    >
      <button
        type="button"
        className="console-backdrop absolute inset-0 bg-black/40"
        aria-label="Close console"
        onClick={close}
      />

      <div className="console-panel relative flex h-[min(88vh,520px)] w-full max-w-2xl flex-col overflow-hidden border border-border bg-paper shadow-xl sm:rounded-sm">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <span className="meta text-accent">aly@portfolio shell</span>
          <button
            type="button"
            onClick={close}
            className="meta text-subtle transition-colors hover:text-ink"
          >
            exit
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-4 font-mono text-[0.75rem] leading-relaxed sm:text-[0.8125rem]"
          aria-live="polite"
        >
          {lines.map((line, i) => {
            if (line.type === "prompt") {
              return (
                <div key={i} className="flex items-center gap-2 text-ink">
                  <span className="shrink-0 text-accent">
                    aly@portfolio:~$
                  </span>
                  {i === lines.length - 1 && (
                    <span className="console-cursor" aria-hidden="true" />
                  )}
                </div>
              );
            }
            if (line.type === "input") {
              return (
                <div key={i} className="mb-2 flex gap-2 text-ink">
                  <span className="shrink-0 text-accent">
                    aly@portfolio:~$
                  </span>
                  <span>{line.text}</span>
                </div>
              );
            }
            // System lines are control signals (clear, close), never printed.
            if (line.type === "system") return null;
            const color =
              line.variant === "error"
                ? "text-bad"
                : line.variant === "dim"
                  ? "text-subtle"
                  : "text-muted";
            return (
              <pre key={i} className={`mb-3 ${color}`}>
                {line.text.split("\n").map((row, j) => {
                  const hang = hangingIndent(row);
                  return (
                    <span
                      key={j}
                      className="block whitespace-pre-wrap"
                      style={{ paddingLeft: `${hang}ch`, textIndent: `-${hang}ch` }}
                    >
                      {row || "\u00a0"}
                    </span>
                  );
                })}
              </pre>
            );
          })}
        </div>

        <div className="flex gap-1.5 overflow-x-auto border-t border-border px-4 py-2 [scrollbar-width:none]">
          {QUICK_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => runCommand(cmd)}
              className="shrink-0 rounded-full border border-border px-2.5 py-1 font-mono text-[0.75rem] text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {cmd}
            </button>
          ))}
        </div>

        <form
          className="flex items-center gap-2 border-t border-border px-4 py-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) runCommand(input);
          }}
        >
          <span className="shrink-0 font-mono text-[0.8125rem] text-accent">
            aly@portfolio:~$
          </span>
          <input
            ref={inputRef}
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onInputKeyDown}
            className="min-w-0 flex-1 bg-transparent font-mono text-base text-ink outline-none sm:text-[0.8125rem]"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            aria-label="Console input"
          />
        </form>
      </div>
    </div>
  );
}
