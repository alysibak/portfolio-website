# Build notes

What was deliberately omitted, and why. Per the build brief: a missing
sentence is invisible, a false one is disqualifying. Anything not backed by
verified content is recorded here instead of being guessed at.

## Content removed

**PocketChange.** Removed from `/work`. It has no verified content: no entry
in the brief's fact-checked section, no approved URL, and every figure it
carried ("40 charities", the idempotency-key narrative) was unsourced. The
old copy is recoverable from git history if the underlying facts can be
confirmed — nothing about the project is disputed, it simply had no
checkable basis to ship on.

**GPA and Dean's Honours List.** `85% GPA. Dean's Honours List x3` removed
from the education block. Both are plausibly true and both appear on the
resume, but neither is in the brief's verified-content section, and the rule
is that a number not in that section does not appear. Restore them if you
want them, they just need to be traceable.

**"80 students in HTML, CSS, and JavaScript."** Removed with the split
Teaching Assistant entries. The number was unsourced, and the brief flags
the Web Design course code and title as unconfirmed. The two TA rows are now
one entry covering September 2024 to present, carrying only the verified
figures: three full 1.0 (140-hour) appointments and 250+ students in
Discrete Structures.

## Content that could not be completed

**Bystander has two decisions, not three.** The acceptance criteria ask for
at least three decisions each with a stated tradeoff. Verified content
supplies exactly two for Bystander (the bounded 8-second analysis window and
the frontend/backend split). A third was not invented.

**TimeVault has no problem, constraints, or outcome.** Verified content
gives three decisions and an ownership line, and nothing else. The case
study renders the decisions alone rather than inventing framing around them.
Two of the three decisions also have no stated tradeoff, so none is shown.

**Bystander's original case file was replaced entirely.** It previously
described debugging a Presage biometric capture-mode bug. That pipeline was
built by teammates, so presenting it as Aly's work absorbed team credit. It
has been replaced with the verified decisions he did own, and an ownership
line now renders above the fold. No substitute defect was invented to fill
the gap.

**Mizan has no date.** Verified content gives no start date, so the project
renders without a year rather than with a guessed one.

**The three ongoing leadership roles have no start dates.** Governor of
Computing, Technical Director, and Workshop Lead all show "Ongoing" rather
than a date range. The resume said 2023 and 2026, but the resume is known to
be out of date and the brief supplies no dates at all.

## Deviations from the brief's technical spec

The brief specifies Next.js 15 with the App Router, pnpm, six routes, and a
`content/` directory. This site is Astro, npm, and three routes. Bringing the
content into compliance did not require changing the stack, so it was left
alone — that is a rebuild decision, not a content one.

Consequences of staying on the current site:

- **Fonts are still loaded from Google Fonts.** The brief requires
  self-hosted `.woff2` with no external font request. The sandbox this was
  built in blocks outbound requests to non-allowlisted hosts, so the font
  files could not be downloaded to vendor them.
- **No OG image, sitemap, robots.txt, 404 page, or JSON-LD.** These map to
  Next.js features (`opengraph-image.tsx`, `sitemap.ts`, `robots.ts`) that
  have Astro equivalents but were out of scope for a content pass.
- **Case studies are one `/work` page, not one route per project.** The
  brief wants `/work/[slug]`.

## Unverified links

Every external URL is on the approved allowlist and `npm run verify`
enforces that. **None of them has been confirmed to return 200.** The build
sandbox blocks outbound HTTPS to everything except a small allowlist, so no
link check was possible. Two were added from the brief and have never been
opened:

- `https://timevault-web.onrender.com`
- `https://github.com/alysibak/TimeVault`

Also worth clicking before this goes in front of anyone:
`https://mizan-sandy-eight.vercel.app` and
`https://github.com/alysibak/mizan`, both added in the same pass.

A dead link on a portfolio is worse than no link. Click all of them.

## Still needs confirmation

From the brief's own "confirm before publishing" list, unresolved:

1. **The third TA course.** Believed to be Web Design and Development
   (CIS\*1050), unconfirmed. The site now avoids naming any course except
   Discrete Structures, so this no longer blocks publishing.
2. **The Java teaching appointment.** The term begins 8 September 2026. The
   site does not mention it yet. When it does, the phrasing is "appointed to
   support", never "led" — `npm run verify` fails the build on the latter.
3. **The award headcount.** The brief says 800 participants; the resume PDF
   in `public/` says 692. The site uses 800. These disagree and only Aly can
   settle which is right.
4. **The resume PDF is out of date.** `site.resume` still points at
   `Aly_Sibak_Base_Resume_1Page.pdf`, which is known stale — it carries the
   692 figure and predates the leadership roles. The repo has no source
   document for it, only the compiled PDF, so it could not be regenerated.

## Content verification

`npm run verify` runs automatically before every build via `prebuild`. It
fails the build on: a team project missing its ownership line, a URL not on
the allowlist, a blocked URL, a banned phrase, an inflated award name,
Governor of Computing described as national or provincial, "led" applied to
a teaching appointment, a "Software Engineer" title without the co-op
qualifier, and a `site.resume` path pointing at a file that is not in
`public/`.

The rules are in `scripts/verify-content.mjs`. Add to them whenever a new
claim needs to stay honest.

The checker is plain ESM and loads the TypeScript content module through
Vite rather than a Node type-stripping flag, so it runs on every Node
version Astro itself supports. That matters because `prebuild` gates the
deploy: if the checker cannot run, the site cannot ship. `engines` and
`.nvmrc` pin the range, and each rule has been tested against a deliberate
violation rather than assumed to work.
