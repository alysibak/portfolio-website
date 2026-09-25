# alysibak.vercel.app

Personal portfolio for Aly Sibak. Built with [Astro](https://astro.build), styled with
Tailwind, deployed as a static site on Vercel.

Home, Work (with a page per project), Experience, and Resume, all rendered from one
content file, plus an interactive shell.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

| Script            | Does                                        |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Dev server with HMR                         |
| `npm run build`   | Static build to `dist/` (+ `.vercel/output`) |
| `npm run preview` | Serve the production build locally          |
| `npm run check`   | `astro check` — types and template diagnostics |
| `npm run verify`  | Content check (also runs before every build) |
| `npm test`        | Browser and accessibility (axe) tests on desktop and phone, in every theme (build first) |
| `npm run links`   | Checks every external link still works      |

## Layout

```
src/
  pages/          index, work, experience, resume  (file-based routes)
  layouts/        Base.astro — <head>, nav, footer, console mount
  components/     Nav, Footer, ShellHint, DevToolsEgg, Console.tsx, and the
                  visuals: HomeTerminal, Stats, Flow, BugChart, AwardBadge,
                  GitGraph, DegreeBar, Screenshot, RepoStats, Prompt
  assets/shots/   project screenshots (optimized to AVIF/WebP at build)
  data/           github.json — fallback for the repo stats
  lib/
    data.ts       all site content lives here
    shots.ts      which screenshots each project shows, with alt text
    github.ts     repo languages and last push, fetched once per build
    shell.ts      command parsing for the console
  styles/         global.css — Tailwind entry + component classes
public/           favicon, robots.txt, security.txt
```

## Editing content

Everything user-facing — bio, projects, experience, the resume, and the shell's
command output — lives in `src/lib/data.ts`. Editing that file is usually the
whole job; the pages just map over it. The `/resume` page reads the same records
as the rest of the site, so update the resume there too. `/resume.txt` serves the
same resume as plain text (what `cat resume` prints), for `curl`.

Each project carries a case study (problem, constraints, decisions, outcome), a
diagram, its stack, a shorter `resume` entry, and a `catOutput` string, which is
what the console prints for `cat <project>`. When you edit a project, update each
of these: the pages, the resume, and the console read the same record but render
it differently.

## Screenshots and repo stats

Screenshots are taken from each app running locally on its seeded or public
data, saved as WebP in `src/assets/shots/`, and listed in `src/lib/shots.ts`.
Astro resizes them at build. A project without any (Bystander) shows its
diagram instead.

Project pages show the repository's languages and when it was last pushed to.
`src/lib/github.ts` asks the GitHub API once per build (set `GITHUB_TOKEN` to
avoid the anonymous rate limit); if that fails, it uses `src/data/github.json`.

## The console

Press <kbd>/</kbd> or <kbd>~</kbd> anywhere to open an interactive shell.
Supported commands are defined in `src/lib/shell.ts`: `help`, `whoami`, `ls`,
`cd <page>`, `pwd`, `cat <project>`, `grep <tech>`, `ping <project>`,
`git log`, `open <project>`, `mail`, `neofetch`, `man aly`, `history`,
`theme <mode>` (including `green` and `amber`), `tree`, `uptime`, `fortune`,
`cowsay`, `date`, `echo`, `sudo hire aly`, `clear`, `exit`. Tab completes,
<kbd>→</kbd> takes the greyed-out suggestion, and history is kept between
visits. Commands and links in the output are clickable. Links like
`/?cmd=cat+carinfo` open the shell and run a command.

Keys: <kbd>Ctrl</kbd>+<kbd>K</kbd> opens site search; <kbd>g</kbd> then
<kbd>w</kbd>, <kbd>e</kbd>, <kbd>r</kbd>, or <kbd>h</kbd> goes to Work,
Experience, Resume, or home. There's also a Konami code.

## Deployment

Vercel builds from `main` using `@astrojs/vercel/static`. Redirects for retired
routes (`/projects`, `/skills`, `/contact`, and the old resume PDF) live in
`vercel.json`, along with the security headers.
