import { expect, test } from "@playwright/test";

const pages = ["/", "/work", "/experience", "/resume", "/work/carinfo", "/work/bystander", "/work/timevault", "/work/mizan"];

for (const path of pages) {
  test(`${path} renders cleanly`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();
    const fits = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    expect(fits, "page scrolls sideways").toBe(true);
    expect(errors).toEqual([]);
  });
}

test("unknown pages get the 404 with a suggestion", async ({ page }) => {
  const res = await page.goto("/work/carinf");
  expect(res?.status()).toBe(404);
  await expect(page.locator("[data-suggest-list]")).toContainText("/work/carinfo");
});

test("the shell opens and runs a command", async ({ page, isMobile }) => {
  await page.goto("/");
  // No waiting for the shell to load: an early key press or tap is queued.
  if (isMobile) await page.locator("[data-whoami]").tap();
  else await page.keyboard.press("/");
  const input = page.getByLabel("Console input");
  await expect(input).toBeVisible();
  await input.fill("cat carinfo");
  await input.press("Enter");
  await expect(page.locator("[data-console-open] pre").last()).toContainText("carinfo");
});

test("a ?cmd= link opens the shell and runs it", async ({ page }) => {
  await page.goto("/?cmd=grep%20flask");
  await expect(page.locator("[data-console-open] pre").last()).toContainText("timevault");
  await expect(page).toHaveURL(/\/$/);
});

test("the resume page and `cat resume` agree", async ({ page }) => {
  await page.goto("/resume");
  await expect(page.locator(".term-body h1")).toContainText("Aly Sibak");
  await page.goto("/?cmd=cat%20resume");
  await expect(page.locator("[data-console-open] pre").last()).toContainText("## Work experience");
});

test("the theme choice survives navigation", async ({ page }) => {
  await page.goto("/work");
  const before = await page.evaluate(() => document.documentElement.getAttribute("data-theme"));
  await page.locator(".site-header [data-theme-toggle]").click();
  const after = await page.evaluate(() => document.documentElement.getAttribute("data-theme"));
  expect(after).not.toBe(before);
  await page.locator('.site-header a[href="/experience"]').click();
  await expect(page).toHaveURL(/experience/);
  expect(await page.evaluate(() => document.documentElement.getAttribute("data-theme"))).toBe(after);
});

test("Ctrl+K finds a project by technology", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard shortcut");
  await page.goto("/");
  await page.keyboard.press("Control+k");
  await expect(page.getByRole("combobox")).toBeFocused();
  await page.keyboard.type("flask");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/work\/timevault/);
});

test("the TimeVault demo tells 401 from 403", async ({ page }) => {
  await page.goto("/work/timevault");
  const code = page.locator("[data-code]");
  await expect(code).toHaveText("403");
  await page.locator(".switch-row", { hasText: "Valid token" }).click();
  await expect(code).toHaveText("401");
});

test("cd in the shell goes to a page and the prompt follows", async ({ page }) => {
  await page.goto("/?cmd=cd%20work");
  await expect(page).toHaveURL(/\/work$/);
  await page.goto("/work/carinfo?cmd=pwd");
  await expect(page.locator("[data-console-open] pre").last()).toHaveText("/home/aly/work/carinfo");
  await expect(page.getByLabel("Console input").locator("xpath=../..")).toContainText("~/work/carinfo$");
});

test("shell output links run commands", async ({ page }) => {
  await page.goto("/?cmd=ls%20projects");
  await page.locator("[data-console-open] pre").last().getByRole("button", { name: "mizan" }).click();
  await expect(page.locator("[data-console-open] pre").last()).toContainText("mizan");
});

test("theme green sticks across pages", async ({ page }) => {
  await page.goto("/?cmd=theme%20green");
  await expect(page.locator("html")).toHaveAttribute("data-crt", "green");
  await page.goto("/work");
  await expect(page.locator("html")).toHaveAttribute("data-crt", "green");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("screenshot tabs switch the picture", async ({ page }) => {
  await page.goto("/work/carinfo");
  const shots = page.locator("[data-shots]");
  await expect(shots.locator("[data-shot='0']")).toBeVisible();
  await shots.getByRole("button", { name: "car page" }).click();
  await expect(shots.locator("[data-shot='1']")).toBeVisible();
  await expect(shots.locator("[data-shot='0']")).toBeHidden();
  await expect(shots.locator("[data-shot-path]")).toContainText("/car/");
});

test("g then w goes to the work page", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard shortcut");
  await page.goto("/experience");
  await page.keyboard.press("g");
  await page.keyboard.press("w");
  await expect(page).toHaveURL(/\/work$/);
});

test("a screenshot opens full size and closes", async ({ page }) => {
  await page.goto("/work/mizan");
  await page.getByRole("button", { name: /^Enlarge:/ }).first().click();
  const dialog = page.locator("[data-zoom-dialog]");
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("img")).toHaveAttribute("src", /\.webp$/);
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("/resume.txt is the plain-text resume", async ({ request }) => {
  const res = await request.get("/resume.txt");
  expect(res.headers()["content-type"]).toContain("text/plain");
  expect(await res.text()).toContain("# Aly Sibak");
});

test("pipes filter a command's output", async ({ page }) => {
  await page.goto("/?cmd=" + encodeURIComponent("cat resume | grep flask"));
  const out = page.locator("[data-console-open] pre").last();
  await expect(out).toContainText("Flask");
  await expect(out).not.toContainText("## Education");
  await page.getByLabel("Console input").fill("ls projects | wc -l");
  await page.getByLabel("Console input").press("Enter");
  await expect(page.locator("[data-console-open] pre").last()).toHaveText("4");
});

test("diff compares two projects' stacks", async ({ page }) => {
  await page.goto("/?cmd=" + encodeURIComponent("diff carinfo mizan"));
  const out = page.locator("[data-console-open] pre").last();
  await expect(out).toContainText("--- carinfo");
  await expect(out).toContainText("+++ mizan");
});

test("the footer shows my local time", async ({ page }) => {
  await page.goto("/work");
  await expect(page.locator("[data-local-time]")).toContainText(/\d:\d\d/);
  await expect(page.locator("[data-status-path]")).toHaveText("~/work");
});
