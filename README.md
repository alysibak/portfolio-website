# alysibak.vercel.app

Personal portfolio for Aly Sibak. Built with [Astro](https://astro.build), styled with
Tailwind, deployed as a static site on Vercel.

The site is small on purpose: three pages, one content file, and an interactive shell.

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

## Layout

```
src/
  pages/          index, work, experience  (file-based routes)
  layouts/        Base.astro — <head>, nav, footer, console mount
  components/     Nav, Footer, ShellHint, DevToolsEgg, Console.tsx
  lib/
    data.ts       all site content lives here
    shell.ts      command parsing for the console
  styles/         global.css — Tailwind entry + component classes
public/           resume PDF, favicon, images
```

## Editing content

Everything user-facing — bio, projects, experience, and the shell's command
output — lives in `src/lib/data.ts`. Editing that file is usually the whole job;
the pages just map over it.

Each project carries a `bug` / `trace` / `fix` / `impact` case file plus a
`catOutput` string, which is what the console prints for `cat <project>`. When
you add or edit a project, update both — the page and the console read the same
record but render it differently.

## The console

Press <kbd>/</kbd> or <kbd>~</kbd> anywhere to open an interactive shell.
Supported commands are defined in `src/lib/shell.ts`: `help`, `whoami`, `ls`,
`cat <project>`, `git log`, `open <project>`, `clear`, `exit`. Tab completes.

## Deployment

Vercel builds from `main` using `@astrojs/vercel/static`. Redirects for retired
routes (`/projects`, `/skills`, `/contact`) live in `vercel.json`.
