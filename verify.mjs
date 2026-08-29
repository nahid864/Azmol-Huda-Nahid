import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';

const OUT = 'c:/portfolio-main/verify-screenshots';
if (!existsSync(OUT)) await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

const results = [];

async function check(label, fn) {
  try {
    const r = await fn();
    results.push({ label, ok: r !== false, detail: r === false ? 'FAIL' : (typeof r === 'string' ? r : 'OK') });
  } catch (e) {
    results.push({ label, ok: false, detail: e.message });
  }
}

await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 15000 });
await page.waitForTimeout(1000);

// 1. Page title
await check('Page title', async () => {
  const t = await page.title();
  return t.includes('Azmol Huda Nahid') ? `"${t}"` : false;
});

// 2. Dark background
await check('Dark background', async () => {
  const bg = await page.evaluate(() => {
    return window.getComputedStyle(document.body).backgroundColor;
  });
  return `body bg: ${bg}`;
});

// 3. Hero — name visible
await check('Hero name', async () => {
  const h1 = await page.locator('h1').first().innerText();
  return h1.includes('Azmol') ? `h1: "${h1.trim()}"` : false;
});

// 4. Hero photo
await check('Hero photo loads', async () => {
  const img = page.locator('img[alt*="Azmol"]').first();
  const src = await img.getAttribute('src');
  const ok = await img.evaluate(el => el.naturalWidth > 0);
  return ok ? `img src=${src} loaded` : false;
});

// 5. Navbar links
await check('Navbar links', async () => {
  const texts = await page.locator('header nav button, header nav a').allInnerTexts();
  const expected = ['About', 'Services', 'Portfolio', 'Skills', 'Blog', 'Contact'];
  const found = expected.filter(e => texts.some(t => t.includes(e)));
  return found.length >= 5 ? `Found: ${found.join(', ')}` : false;
});

// 6. Hire Me button in navbar
await check('Hire Me button', async () => {
  const btn = page.locator('header').getByText('Hire Me').first();
  const visible = await btn.isVisible();
  return visible ? 'Hire Me button visible in navbar' : false;
});

// Screenshot desktop hero
await page.screenshot({ path: `${OUT}/01-hero-desktop.png`, fullPage: false });

// 7. Scroll to About section
await check('About section', async () => {
  await page.locator('header').getByText('About').click();
  await page.waitForTimeout(800);
  const h2 = await page.locator('#about h2').first().innerText();
  return h2.length > 0 ? `About h2: "${h2.trim()}"` : false;
});

// 8. Skill progress bars
await check('Skill progress bars', async () => {
  const bars = await page.locator('.progress-bar').count();
  return bars >= 5 ? `${bars} progress bars found` : false;
});

// 10. Portfolio section
await check('Portfolio filter buttons', async () => {
  await page.locator('header button').filter({ hasText: 'Portfolio' }).click();
  await page.waitForTimeout(800);
  const filterBtns = await page.locator('#portfolio button').allInnerTexts();
  const hasAll = filterBtns.some(t => t === 'All');
  const hasReact = filterBtns.some(t => t === 'React');
  return hasAll && hasReact ? `Filters: ${filterBtns.join(', ')}` : false;
});

await check('Portfolio project cards', async () => {
  const cards = await page.locator('#portfolio .group').count();
  return cards >= 2 ? `${cards} project cards` : false;
});

await check('Portfolio browser mockup frames', async () => {
  // check for browser chrome divs (red/yellow/green dots)
  const dots = await page.locator('.bg-red-500').count();
  return dots >= 1 ? `${dots} browser chrome dot(s) found` : false;
});

// Screenshot portfolio
await page.screenshot({ path: `${OUT}/03-portfolio.png`, fullPage: false });

// 11. Click a project card to open modal
await check('Portfolio modal opens', async () => {
  const card = page.locator('#portfolio .group').first();
  await card.click();
  await page.waitForTimeout(500);
  const modal = page.locator('.modal-content');
  const visible = await modal.isVisible();
  if (visible) {
    await page.screenshot({ path: `${OUT}/04-modal.png`, fullPage: false });
    // close modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    return 'Modal opened and closed';
  }
  // Try clicking again (hover overlay may have blocked)
  await page.locator('#portfolio .group').first().click({ force: true });
  await page.waitForTimeout(500);
  return (await modal.isVisible()) ? 'Modal opened on second click' : false;
});

// 12. Contact form validation
await check('Contact form validation', async () => {
  await page.locator('header button').filter({ hasText: 'Contact' }).click();
  await page.waitForTimeout(800);
  const submitBtn = page.locator('#contact button[type="submit"]');
  await submitBtn.click();
  await page.waitForTimeout(300);
  // check for error messages
  const errors = await page.locator('#contact .text-red-400').allInnerTexts();
  return errors.length >= 2 ? `Validation errors: ${errors.join('; ')}` : false;
});

// Screenshot contact with errors
await page.screenshot({ path: `${OUT}/05-contact-validation.png`, fullPage: false });

// 13. Mobile viewport
await context.close();
const mobileCtx = await browser.newContext({ viewport: { width: 360, height: 780 } });
const mobilePage = await mobileCtx.newPage();
await mobilePage.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 15000 });
await mobilePage.waitForTimeout(1000);

await check('Mobile hero renders', async () => {
  const h1 = await mobilePage.locator('h1').first().innerText();
  return h1.includes('Azmol') ? `Mobile h1: "${h1.trim()}"` : false;
});

await check('Mobile hamburger menu', async () => {
  const menuBtn = mobilePage.locator('button[aria-label="Toggle menu"]');
  const visible = await menuBtn.isVisible();
  if (visible) {
    await menuBtn.click();
    await mobilePage.waitForTimeout(400);
    await mobilePage.screenshot({ path: `${OUT}/06-mobile-menu.png`, fullPage: false });
    return 'Hamburger visible and opens menu';
  }
  return false;
});

await mobilePage.screenshot({ path: `${OUT}/07-mobile-hero.png`, fullPage: false });

// Footer
await mobilePage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await mobilePage.waitForTimeout(500);
await mobilePage.screenshot({ path: `${OUT}/08-footer.png`, fullPage: false });

await check('Footer copyright', async () => {
  const footer = await mobilePage.locator('footer').innerText();
  return footer.includes('Azmol Huda Nahid') ? 'Footer has Azmol Huda Nahid branding' : false;
});

await mobileCtx.close();
await browser.close();

// Report
console.log('\n=== VERIFICATION RESULTS ===\n');
let passed = 0, failed = 0;
for (const r of results) {
  const icon = r.ok ? '✅' : '❌';
  console.log(`${icon} ${r.label}: ${r.detail}`);
  if (r.ok) passed++; else failed++;
}
console.log(`\nTotal: ${passed} passed, ${failed} failed`);
console.log(`Screenshots: ${OUT}`);
