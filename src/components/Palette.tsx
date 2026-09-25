import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { navigate } from "astro:transitions/client";
import { projects, site } from "../lib/data";
import { applyTheme, effectiveTheme } from "../lib/theme";

type Item = {
  id: string;
  label: string;
  hint: string;
  group: "Pages" | "Projects" | "Actions";
  /** Extra words that should find this item, e.g. a project's stack. */
  keywords: string;
  run: () => void | Promise<void>;
};

function openTab(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

/** Every word typed must appear somewhere in the item. */
function matches(item: Item, query: string) {
  const hay = `${item.label} ${item.hint} ${item.keywords}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => hay.includes(word));
}

export default function Palette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [note, setNote] = useState("");
  const returnFocusRef = useRef<HTMLElement | null>(null);
  // Read by the global key handler, which shouldn't re-subscribe on every open.
  const openRef = useRef(false);
  openRef.current = open;

  const show = useCallback(() => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setQuery("");
    setActive(0);
    setNote("");
    setOpen(true);
  }, []);

  const hide = useCallback(() => setOpen(false), []);

  const items = useMemo<Item[]>(
    () => [
      { id: "home", label: "Home", hint: "/", group: "Pages", keywords: "start whoami", run: () => navigate("/") },
      { id: "work", label: "Work", hint: "/work", group: "Pages", keywords: "projects case studies", run: () => navigate("/work") },
      {
        id: "experience",
        label: "Experience",
        hint: "/experience",
        group: "Pages",
        keywords: "co-op teaching leadership education timeline",
        run: () => navigate("/experience"),
      },
      ...projects.map<Item>((p) => ({
        id: `project-${p.id}`,
        label: p.title,
        hint: p.tagline,
        group: "Projects",
        keywords: p.stack.join(" "),
        run: () => navigate(`/work/${p.id}`),
      })),
      {
        id: "shell",
        label: "Open the shell",
        hint: "/ or ~",
        group: "Actions",
        keywords: "terminal console command",
        run: () => {
          window.dispatchEvent(new Event("console:open"));
        },
      },
      {
        id: "email",
        label: "Copy email address",
        hint: site.email,
        group: "Actions",
        keywords: "contact mail hire",
        run: async () => {
          try {
            await navigator.clipboard.writeText(site.email);
            setNote(`Copied ${site.email}`);
          } catch {
            window.location.href = `mailto:${site.email}`;
          }
        },
      },
      { id: "resume", label: "Resume (PDF)", hint: "opens in a new tab", group: "Actions", keywords: "cv", run: () => openTab(site.resume) },
      {
        id: "theme",
        label: "Toggle dark mode",
        hint: "or 'theme dark' in the shell",
        group: "Actions",
        keywords: "light theme colour color",
        run: () => applyTheme(effectiveTheme() === "dark" ? "light" : "dark"),
      },
      { id: "github", label: "GitHub", hint: "github.com/alysibak", group: "Actions", keywords: "code source", run: () => openTab(site.github) },
      { id: "linkedin", label: "LinkedIn", hint: "opens in a new tab", group: "Actions", keywords: "profile", run: () => openTab(site.linkedin) },
    ],
    []
  );

  const results = useMemo(() => items.filter((item) => matches(item, query)), [items, query]);

  const choose = useCallback(
    async (item: Item | undefined) => {
      if (!item) return;
      await item.run();
      // Stay open briefly so "Copied" is readable; close for everything else.
      if (item.id === "email") setTimeout(hide, 900);
      else {
        returnFocusRef.current = null;
        hide();
      }
    },
    [hide]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (openRef.current) setOpen(false);
        else show();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest("[data-open-palette]")) show();
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [show]);

  // The input focuses itself on mount (autoFocus), so typing straight after
  // Ctrl+K lands in it. This only hands focus back on close.
  useEffect(() => {
    if (!open && returnFocusRef.current) {
      returnFocusRef.current.focus();
      returnFocusRef.current = null;
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  if (!open) return null;

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(results.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(results[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      hide();
    }
  };

  let lastGroup = "";
  return (
    <div className="fixed inset-0 z-[110] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Search the site">
      <button type="button" className="console-backdrop absolute inset-0 bg-black/40" aria-label="Close search" onClick={hide} />
      <div className="console-panel relative w-full max-w-lg overflow-hidden rounded-md border border-border bg-paper shadow-xl">
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onInputKey}
          placeholder="Search pages, projects, or a technology…"
          className="w-full border-b border-border bg-transparent px-4 py-3.5 text-base text-ink outline-none placeholder:text-subtle"
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-results"
          aria-activedescendant={results[active] ? `palette-${results[active].id}` : undefined}
          aria-autocomplete="list"
          autoComplete="off"
          spellCheck={false}
        />
        <ul id="palette-results" role="listbox" className="max-h-[50vh] overflow-y-auto py-2">
          {results.length === 0 && <li className="meta px-4 py-3 text-subtle">No matches. Try "react" or "experience".</li>}
          {results.map((item, i) => {
            const heading = item.group !== lastGroup ? item.group : null;
            lastGroup = item.group;
            return (
              <li key={item.id} role="presentation">
                {heading && <p className="meta px-4 pb-1 pt-2 text-[0.6875rem] uppercase tracking-wider text-subtle">{heading}</p>}
                <div
                  id={`palette-${item.id}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseMove={() => setActive(i)}
                  onClick={() => choose(item)}
                  className={`flex cursor-pointer items-baseline justify-between gap-4 px-4 py-2 ${i === active ? "bg-accent/10" : ""}`}
                >
                  <span className="shrink-0 text-[0.9375rem] text-ink">{item.label}</span>
                  <span className="meta truncate text-subtle">{item.id === "email" && note ? note : item.hint}</span>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="meta flex gap-4 border-t border-border px-4 py-2 text-[0.6875rem] text-subtle">
          <span>↑↓ to move</span>
          <span>enter to open</span>
          <span>esc to close</span>
        </p>
      </div>
    </div>
  );
}
