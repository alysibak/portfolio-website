/**
 * Checks that every external link on the site still works.
 * Run with: npm run links   (CI runs it on every push and weekly.)
 *
 * Some sites refuse automated requests (LinkedIn answers 999), so those codes
 * count as "reachable". Free-tier hosts can take a while to wake, hence the
 * long timeout and one retry.
 */
import { ALLOWED_URLS } from "./allowed-urls.mjs";

const TIMEOUT_MS = 60_000;
const BOT_BLOCKED = new Set([403, 429, 999]);

async function check(url) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(url, {
        redirect: "follow",
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: { "user-agent": "alysibak-link-check (+https://alysibak.vercel.app)" },
      });
      if (res.ok) return { url, ok: true, note: String(res.status) };
      if (BOT_BLOCKED.has(res.status)) return { url, ok: true, note: `${res.status} (blocks bots; not a broken link)` };
      if (attempt === 2) return { url, ok: false, note: String(res.status) };
    } catch (err) {
      if (attempt === 2) return { url, ok: false, note: err.name === "TimeoutError" ? "timed out" : err.message };
    }
  }
}

const results = await Promise.all(ALLOWED_URLS.map(check));
for (const r of results) console.log(`${r.ok ? "ok  " : "FAIL"}  ${r.note.padEnd(10)}  ${r.url}`);
const broken = results.filter((r) => !r.ok);
if (broken.length) {
  console.error(`\n${broken.length} broken link(s).`);
  process.exit(1);
}
console.log(`\nall ${results.length} links reachable.`);
