import snapshot from "../data/github.json";

// Each project's repository at build time: when it was last pushed to and
// its languages. Asked of the GitHub API once per build; if that fails
// (offline, rate limited), the saved snapshot in src/data/github.json is used,
// so a build never breaks over it.

export type RepoStats = {
  repo: string;
  pushedAt: string;
  /** Bytes of code per language, as GitHub counts them. */
  languages: Record<string, number>;
};

type Repos = Record<string, RepoStats>;

let cached: Promise<Repos> | undefined;

export function repoStats(): Promise<Repos> {
  return (cached ??= load());
}

async function gh<T>(path: string): Promise<T> {
  const token = process.env.GITHUB_TOKEN;
  const res = await fetch(`https://api.github.com/${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "aly-portfolio-build",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  return res.json() as Promise<T>;
}

async function load(): Promise<Repos> {
  const saved: Repos = snapshot.repos;
  const entries = await Promise.all(
    Object.entries(saved).map(async ([id, old]): Promise<[string, RepoStats]> => {
      try {
        const [repo, languages] = await Promise.all([
          gh<{ pushed_at?: string }>(`repos/${old.repo}`),
          gh<Record<string, number>>(`repos/${old.repo}/languages`),
        ]);
        return [
          id,
          {
            repo: old.repo,
            pushedAt: repo.pushed_at ?? old.pushedAt,
            languages: Object.keys(languages).length ? languages : old.languages,
          },
        ];
      } catch {
        return [id, old];
      }
    })
  );
  return Object.fromEntries(entries);
}

/** GitHub's colours for the languages these repos use; grey for the rest. */
const COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  CSS: "#663399",
  HTML: "#e34c26",
  Shell: "#89e051",
  PLpgSQL: "#336790",
  Dockerfile: "#384d54",
};

/** The top languages by share, with the rest folded into "Other". */
export function languageShares(languages: Record<string, number>, top = 4) {
  const total = Object.values(languages).reduce((a, b) => a + b, 0) || 1;
  const sorted = Object.entries(languages).sort((a, b) => b[1] - a[1]);
  const shown = sorted.slice(0, top).map(([name, bytes]) => ({
    name,
    pct: (bytes / total) * 100,
    color: COLORS[name] ?? "#8b8b95",
  }));
  const rest = sorted.slice(top).reduce((a, [, b]) => a + b, 0);
  if (rest > 0) shown.push({ name: "Other", pct: (rest / total) * 100, color: "#8b8b95" });
  return shown.filter((l) => l.pct >= 0.1);
}
