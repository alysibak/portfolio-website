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
| `npm test`        | Browser tests on desktop and phone (build first) |
| `npm run links`   | Checks every external link still works      |

## Layout

```
src/
  pages/          index, work, experience  (file-based routes)
  layouts/        Base.astro — <head>, nav, footer, console mount
  components/     Nav, Footer, ShellHint, DevToolsEgg, Console.tsx, and the
                  visuals: HomeTerminal, Stats, Flow, BugChart, AwardBadge,
                  GitGraph, DegreeBar
  lib/
    data.ts       all site content lives here
    shell.ts      command parsing for the console
  styles/         global.css — Tailwind entry + component classes
public/           favicon, robots.txt, security.txt
```

## Editing content

Everything user-facing — bio, projects, experience, the resume, and the shell's
command output — lives in `src/lib/data.ts`. Editing that file is usually the
whole job; the pages just map over it. The `/resume` page reads the same records
as the rest of the site, so update the resume there too.

Each project carries a case study (problem, constraints, decisions, outcome), a
diagram, its stack, a shorter `resume` entry, and a `catOutput` string, which is
what the console prints for `cat <project>`. When you edit a project, update each
of these: the pages, the resume, and the console read the same record but render
it differently.

## The console

Press <kbd>/</kbd> or <kbd>~</kbd> anywhere to open an interactive shell.
Supported commands are defined in `src/lib/shell.ts`: `help`, `whoami`, `ls`,
`cat <project>`, `grep <tech>`, `ping <project>`, `git log`, `open <project>`,
`neofetch`, `man aly`, `history`, `theme <mode>`, `sudo hire aly`, `clear`,
`exit`. Tab completes. Links like `/?cmd=cat+carinfo` open the shell and run a
command. <kbd>Ctrl</kbd>+<kbd>K</kbd> opens site search.

## Deployment

Vercel builds from `main` using `@astrojs/vercel/static`. Redirects for retired
routes (`/projects`, `/skills`, `/contact`, and the old resume PDF) live in
`vercel.json`, along with the security headers.
