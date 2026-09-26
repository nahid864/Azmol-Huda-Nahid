/**
 * Walks the Everyday Crackers storefront the way a shopper does, so the cart,
 * checkout and confirmation screens can be captured without touching the live
 * shop (every real cart there is recorded as a sales lead).
 *
 *   node scripts/capture-edc-storefront.mjs
 *
 * Needs the local build on :8001 against edc_store_demo, with the live product
 * photos downloaded into public/uploads.
 */
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'assets', 'images', 'projects', 'edc')
const BASE = 'http://127.0.0.1:8001'

await mkdir(OUT, { recursive: true })
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
const page = await ctx.newPage()
const shot = async (name, note = '') => {
  await page.waitForTimeout(700)
  await page.screenshot({ path: join(OUT, `${name}.jpg`), type: 'jpeg', quality: 88 })
  console.log(`  ok   ${name.padEnd(22)} ${page.url().replace(BASE, '')} ${note}`)
}

// 1. Home and shop
await page.goto(BASE + '/', { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)
await shot('shopper-home')

await page.goto(BASE + '/shop', { waitUntil: 'networkidle' })
await page.waitForTimeout(1000)
await shot('shopper-shop')

// The "save your orders" nudge covers the page a few seconds in.
const dismissNudge = async () => {
  const keep = page.locator('button:has-text("Keep browsing")').first()
  if (await keep.count()) await keep.click().catch(() => {})
}

// Add to cart is disabled until a colour is chosen, which is the point of it.
const addToCart = async (slug, colour) => {
  await page.goto(`${BASE}/product/${slug}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(900)
  await dismissNudge()
  const sw = page.locator(`button[title="${colour}"]`).first()
  if (await sw.count()) {
    await sw.click()
    await page.waitForTimeout(500)
  }
  return page.locator('button:has-text("Add to cart")').first()
}

// 2. A product with colours, so the variant picker is visible
let add = await addToCart('mini-edc-pouch-bd', 'Khaki')
await shot('shopper-product')

// 3. Add it, and catch the slide-out drawer
await add.click()
await page.waitForTimeout(1600)
await shot('shopper-cart-drawer', '(drawer after add)')

// A second line makes the cart and the free-delivery bar look real
add = await addToCart('metal-key-organizer-bd', 'Orange')
await add.click()
await page.waitForTimeout(1400)

await page.goto(BASE + '/cart', { waitUntil: 'networkidle' })
await page.waitForTimeout(800)
await dismissNudge()
const lines = await page.locator('table tbody tr, [class*="cart-item"]').count()
await shot('shopper-cart', `(${lines} line(s))`)

// 4. Checkout, filled in like a real order
await page.goto(BASE + '/checkout', { waitUntil: 'networkidle' })
await page.waitForTimeout(800)
await dismissNudge()
const fill = async (sel, value) => {
  const el = page.locator(sel).first()
  if (await el.count()) await el.fill(value).catch(() => {})
}
await fill('input[name="first_name"], input[name="name"]', 'Rafiq')
await fill('input[name="last_name"]', 'Hasan')
await fill('input[name="phone"]', '01700000000')
await fill('input[name="email"]', 'customer@example.com')
await fill('input[name="address_line1"], textarea[name="address_line1"], input[name="address"], textarea[name="address"]', 'House 12, Road 4, Dhanmondi')
const zone = page.locator('input[type=radio][name*="zone"], input[type=radio][name*="delivery"]').first()
if (await zone.count()) { await zone.check().catch(() => {}); await page.waitForTimeout(600) }
await shot('shopper-checkout', '(filled)')

// 5. Place it, so the confirmation and the invoice are real pages and not mockups
const place = page.locator('button:has-text("Place order"), button[type=submit]:has-text("order")').first()
if (await place.count()) {
  await place.click().catch(() => {})
  await page.waitForLoadState('networkidle').catch(() => {})
  await page.waitForTimeout(1500)
  if (/order-success/.test(page.url())) {
    await dismissNudge()
    await shot('shopper-order-success')
    const orderNo = page.url().split('/').pop()
    await page.goto(`${BASE}/invoice/${orderNo}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)
    await shot('shopper-invoice', `(order ${orderNo})`)
  } else {
    console.log('  note: checkout did not reach order-success, at', page.url())
  }
}

await browser.close()
console.log('\ndone')
