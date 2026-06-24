import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 15000 });
// scroll to portfolio
await page.evaluate(() => document.getElementById('portfolio')?.scrollIntoView());
await page.waitForTimeout(1200);
await page.screenshot({ path: 'c:/portfolio-main/verify-screenshots/portfolio-updated.png', fullPage: false });
// click first card (admin panel)
await page.locator('#portfolio .group').first().click();
await page.waitForTimeout(600);
await page.screenshot({ path: 'c:/portfolio-main/verify-screenshots/admin-panel-modal.png', fullPage: false });
await browser.close();
console.log('Done');
