/// <reference types="astro/client" />

interface Window {
  /** Set by the [data-open-console] click handler in Base.astro. */
  __consoleRequested?: boolean;
}
