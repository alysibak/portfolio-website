import { useCallback, useEffect, useRef, useState } from "react";
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

  const openWithHelp = useCallback(() => {
    setOpen(true);
    setLines(bootLines());
    setShell({ history: [] });
    setInput("");
    setHistoryIdx(-1);
    draftRef.current = "";
  }, []);

  const scrollBottom = useCallback(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      scrollBottom();
    }
  }, [open, lines, scrollBottom]);

  const runCommand = useCallback(
    (cmd: string) => {
      const { lines: newLines, state, openUrl } = executeCommand(shell, cmd);

      for (const line of newLines) {
        if (line.type === "system" && line.text === "__CLOSE__") {
          setOpen(false);
          setInput("");
          setHistoryIdx(-1);
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

      if (openUrl) {
        window.open(openUrl, "_blank", "noopener,noreferrer");
      }

      setLines((prev) => [...prev, ...newLines, { type: "prompt" }]);
      setShell(state);
      setInput("");
      setHistoryIdx(-1);
      draftRef.current = "";
    },
    [shell]
  );

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
        setOpen(false);
        setInput("");
        setHistoryIdx(-1);
      }
    },
    [open, openWithHelp]
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
        className="absolute inset-0 bg-ink/30"
        aria-label="Close console"
        onClick={() => setOpen(false)}
      />

      <div className="relative flex h-[min(88vh,520px)] w-full max-w-2xl flex-col overflow-hidden border border-border bg-paper shadow-xl sm:rounded-sm">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <span className="meta text-accent">aly@portfolio shell</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="meta text-subtle transition-colors hover:text-ink"
          >
            exit
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-4 font-mono text-[0.8125rem] leading-relaxed"
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
            const color =
              line.variant === "error"
                ? "text-red-700"
                : line.variant === "dim"
                  ? "text-subtle"
                  : "text-muted";
            return (
              <pre
                key={i}
                className={`mb-3 whitespace-pre-wrap ${color}`}
              >
                {line.text}
              </pre>
            );
          })}
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
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onInputKeyDown}
            className="flex-1 bg-transparent font-mono text-[0.8125rem] text-ink outline-none"
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
