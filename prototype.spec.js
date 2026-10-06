const { test, expect } = require('@playwright/test');

test.setTimeout(60000);

for (const variant of ['A', 'B', 'C']) {
  for (const size of [{ width: 1440, height: 960 }, { width: 390, height: 844 }]) {
    test(`${variant} website and student space at ${size.width}px`, async ({ page }, testInfo) => {
      await page.setViewportSize(size);
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(`http://127.0.0.1:4173/?variant=${variant}`);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator(`[data-choose="${variant}"]`)).toHaveAttribute('aria-pressed', 'true');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.screenshot({ path: testInfo.outputPath(`website-${variant}-${size.width}.png`), fullPage: true });
      await page.locator('[data-filter="Entrance"]').click();
      await expect(page.locator('.course-row')).toHaveCount(3);
      await page.locator('.course-row').first().click();
      await expect(page.locator('#enquiry-dialog')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.locator('#enquiry-dialog')).not.toBeVisible();
      if (variant === 'C') {
        await page.locator('[data-course-select="5"]').click();
        await expect(page.locator('.navigator-detail')).toContainText('HSC Computer Science');
      }
      if (size.width < 768) {
        await page.locator('.menu-button').click();
        await expect(page.locator('#mobile-menu')).toBeVisible();
        await page.locator('#mobile-menu a[href="#updates"]').click();
        await expect(page.locator('#mobile-menu')).not.toBeVisible();
      }
      await page.locator('.student-link').click();
      await expect(page.locator('.student-preview-notice')).toBeVisible();
      await expect(page.locator('.resource-row')).toHaveCount(3);
      await page.locator('[data-subject="Mathematics"]').click();
      await expect(page.locator('.resource-row')).toHaveCount(1);
      await page.locator('[data-subject="All subjects"]').click();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.screenshot({ path: testInfo.outputPath(`student-${variant}-${size.width}.png`), fullPage: true });
      await page.locator('[data-resource-tab="Recordings"]').click();
      await expect(page.locator('.file-icon').first()).toHaveText('VIDEO');
      await page.locator('[data-resource-tab="Test papers"]').click();
      await expect(page.locator('.file-icon').first()).toHaveText('TEST');
      await page.locator('#student-course').selectOption('NEET');
      await expect(page.locator('.resource-empty')).toBeVisible();
      await expect(page.locator('.resource-row')).toHaveCount(0);
      await page.locator('.student-topbar button[data-home]').click();
      await expect(page.locator('.hero')).toBeVisible();
      await page.locator('#next').click();
      const next = { A: 'B', B: 'C', C: 'A' }[variant];
      await expect(page.locator(`[data-choose="${next}"]`)).toHaveAttribute('aria-pressed', 'true');
      await page.reload();
      await expect(page.locator('body')).toHaveAttribute('data-variant', next);
      expect(errors).toEqual([]);
    });
  }
}

test('invalid variant falls back safely and keyboard cycles previews', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173/?variant=invalid');
  await expect(page.locator('body')).toHaveAttribute('data-variant', 'A');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('body')).toHaveAttribute('data-variant', 'B');
  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('body')).toHaveAttribute('data-variant', 'A');
});
