/// <reference types="astro/client" />

interface Window {
  /** Set by the [data-open-console] click handler in Base.astro. */
  __consoleRequested?: boolean;
  /** Guards for inline scripts, which rerun on client-side navigation. */
  __consoleClicks?: boolean;
  __devtoolsHello?: boolean;
}
