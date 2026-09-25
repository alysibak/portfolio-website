export type ProbeResult = { ok: boolean; ms: number };

/**
 * Times a request to a project's live site. It is a no-cors request, so the
 * response is opaque: this proves the server answered, not what it said.
 * A free-tier host that is asleep shows up as slow or as no reply.
 */
export async function probe(url: string, timeoutMs = 8000): Promise<ProbeResult> {
  const start = performance.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    await fetch(url, { mode: "no-cors", cache: "no-store", signal: controller.signal });
    return { ok: true, ms: Math.round(performance.now() - start) };
  } catch {
    return { ok: false, ms: Math.round(performance.now() - start) };
  } finally {
    clearTimeout(timer);
  }
}
