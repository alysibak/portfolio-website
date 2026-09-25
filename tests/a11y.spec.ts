import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Automated accessibility checks (contrast, labels, landmarks, ARIA) on every
// page, in each theme. Catches regressions, not everything a person would.
const pages = ["/", "/work", "/experience", "/resume", "/work/carinfo", "/work/bystander", "/work/timevault", "/work/mizan"];
const themes = ["light", "dark", "green", "amber"] as const;

for (const theme of themes) {
  for (const path of pages) {
    test(`${path} in ${theme} passes axe`, async ({ page, isMobile }) => {
      test.skip(isMobile && theme !== "light", "themes checked on desktop");
      await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
      const summary = results.violations.map(
        (v) => `${v.id} (${v.impact}): ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`
      );
      expect(summary).toEqual([]);
    });
  }
}
