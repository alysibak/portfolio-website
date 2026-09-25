#!/usr/bin/env node
// Aly Sibak's business card, for `npx alysibak`.
// Keep in step with src/lib/data.ts; the site's content check compares them.

const card = {
  name: "Aly Sibak",
  line: "I build and debug production systems",
  school: "Fourth-year Computer Science co-op, University of Guelph",
  status: "Seeking Winter 2027 co-op, January–April",
  links: [
    ["web", "https://alysibak.vercel.app"],
    ["github", "https://github.com/alysibak"],
    ["linkedin", "https://www.linkedin.com/in/aly-sibak-721b85252"],
    ["email", "asibak@uoguelph.ca"],
  ],
};

const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const paint = (code) => (s) => (useColor ? `\x1b[${code}m${s}\x1b[0m` : s);
const bold = paint("1");
const dim = paint("2");
const blue = paint("34");
const green = paint("32");

const lines = [
  bold(card.name),
  card.line,
  dim(card.school),
  "",
  ...card.links.map(([label, value]) => `${dim(label.padEnd(9))}${blue(value)}`),
  "",
  `${green("●")} ${card.status}`,
];

const visible = (s) => s.replace(/\x1b\[[0-9;]*m/g, "");
const width = Math.max(...lines.map((l) => visible(l).length));
const row = (l) => `│  ${l}${" ".repeat(width - visible(l).length)}  │`;

console.log(
  [`╭${"─".repeat(width + 4)}╮`, ...lines.map(row), `╰${"─".repeat(width + 4)}╯`].join("\n")
);
console.log(dim("\n  the site has a shell: press / on any page.\n"));
