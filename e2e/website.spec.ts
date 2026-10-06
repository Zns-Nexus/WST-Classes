import { test, expect } from '@playwright/test';

const base = 'http://127.0.0.1:3000';
test.setTimeout(60000);

for (const viewport of [{ width: 1440, height: 960 }, { width: 390, height: 844 }]) {
  test(`homepage and course flow at ${viewport.width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole('heading', { name: 'Big dreams. Smarter preparation.' })).toBeVisible();
    await expect(page.locator('.hero-slide.is-active img')).toBeVisible();
    await expect.poll(() => page.locator('.hero-slide.is-active img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath('homepage-viewport.png') });
    await page.locator('#classroom').scrollIntoViewIfNeeded();
    for (const image of await page.locator('.video-thumbnail img').all()) {
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path: testInfo.outputPath('homepage-full.png'), fullPage: true });
    await page.getByRole('button', { name: 'Next slide', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Build your basics. Back your ambitions.' })).toBeVisible();
    await page.getByRole('button', { name: 'Next slide', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Think logically. Create what’s next.' })).toBeVisible();
    await page.getByRole('button', { name: 'Previous slide', exact: true }).click();
    await expect(page.locator('.slide-count')).toHaveText('02 / 03');
    await page.getByRole('button', { name: 'Entrance exams', exact: true }).click();
    await expect(page.locator('.course-card')).toHaveCount(3);
    await page.getByRole('button', { name: 'Computer science', exact: true }).click();
    await expect(page.locator('.course-card')).toHaveCount(1);
    await page.locator('.course-card .course-link').click();
    await expect(page).toHaveURL(`${base}/courses/hsc-computer-science`);
    await expect(page.getByRole('heading', { name: 'Computer Science at Work Smart.' })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath('course-detail.png'), fullPage: true });
    await page.goto(`${base}/#updates`);
    await page.getByRole('button', { name: 'Exam notices', exact: true }).click();
    await expect(page.locator('.update-row')).toHaveCount(1);
    await expect(page.locator('.update-row a')).toHaveAttribute('href', 'https://cetcell.mahacet.org/');
    await page.locator('#enquiry-course').selectOption('HSC Computer Science');
    await expect(page.locator('.enquiry-panel a')).toHaveAttribute('href', 'https://www.instagram.com/worksmart.hsc/');
    if (viewport.width < 768) {
      await page.getByRole('button', { name: 'Open menu' }).click();
      await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
      await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Student login' }).click();
    } else {
      await page.locator('.student-login').click();
    }
    await expect(page.getByRole('heading', { name: 'Student login' })).toBeVisible();
    await expect(page.getByText('Secure sign-in is not connected yet.')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath('student-portal.png'), fullPage: true });
    expect(errors).toEqual([]);
  });
}

test('carousel advances automatically and supports pause', async ({ page }) => {
  await page.goto(base);
  await expect(page.locator('.slide-count')).toHaveText('02 / 03', { timeout: 11000 });
  await page.getByRole('button', { name: 'Pause slideshow' }).click();
  await expect(page.getByRole('button', { name: 'Play slideshow' })).toHaveAttribute('aria-pressed', 'true');
  const slide = await page.locator('.slide-count').textContent();
  await page.mouse.move(0, 0);
  await page.locator('.home-link').focus();
  await page.waitForTimeout(7200);
  await expect(page.locator('.slide-count')).toHaveText(slide!);
});

test('reduced motion disables automatic image changes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(base);
  await expect(page.getByRole('button', { name: 'Pause slideshow' })).toBeDisabled();
  await page.waitForTimeout(7300);
  await expect(page.locator('.slide-count')).toHaveText('01 / 03');
});

test('all courses render and unknown course has a useful 404', async ({ page }) => {
  for (const slug of ['ssc', 'hsc', 'neet', 'jee', 'mht-cet', 'hsc-computer-science']) {
    const response = await page.goto(`${base}/courses/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { name: 'Course at a glance' })).toBeVisible();
  }
  const response = await page.goto(`${base}/courses/not-a-course`);
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'Let’s get you back on track.' })).toBeVisible();
});

test('header and carousel remain usable at smaller widths', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 768, 1024, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator('.hero-slide.is-active .button-primary')).toBeVisible();
  }
});

test('desktop course dropdown works with keyboard and closes on escape', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto(base);
  const toggle = page.getByRole('button', { name: 'Our courses', exact: true });
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#course-menu')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#course-menu')).toHaveCount(0);
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});
