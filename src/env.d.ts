/// <reference types="astro/client" />

interface Window {
  /** Set by the [data-open-console] click handler in Base.astro. */
  __consoleRequested?: boolean;
  /** A command a [data-cmd] button asked the console to run. */
  __consoleCmd?: string;
  /** Guards for inline scripts, which rerun on client-side navigation. */
  __consoleClicks?: boolean;
  __devtoolsHello?: boolean;
  __themeSwap?: boolean;
}
