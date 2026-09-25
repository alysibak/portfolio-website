export type ThemeChoice = "dark" | "light" | "system";

/** Must match the key read by the inline script in Base.astro's <head>. */
const KEY = "theme";

/** Sets the theme, remembers it, and tells anything listening. */
export function applyTheme(choice: ThemeChoice) {
  const root = document.documentElement;
  if (choice === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", choice);
  try {
    if (choice === "system") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, choice);
  } catch {
    // Private windows can refuse storage; the theme still applies for this page.
  }
  window.dispatchEvent(new Event("themechange"));
}

/** What the visitor is actually seeing right now. */
export function effectiveTheme(): "dark" | "light" {
  const set = document.documentElement.getAttribute("data-theme");
  if (set === "dark" || set === "light") return set;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
