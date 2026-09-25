import { expect, test } from "@playwright/test";

const pages = ["/", "/work", "/experience", "/work/carinfo", "/work/bystander", "/work/timevault", "/work/mizan"];

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
  if (isMobile) await page.locator("[data-whoami]").tap();
  else {
    await page.waitForFunction(() => document.querySelector("astro-island:not([ssr])"));
    await page.keyboard.press("/");
  }
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
  await page.waitForFunction(() => document.querySelectorAll("astro-island:not([ssr])").length >= 2);
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
