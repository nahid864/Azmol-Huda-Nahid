/**
 * Captures screenshots of the local project apps for the portfolio gallery.
 *
 * Each app is served on its own port (see .claude/launch.json in Igent-main).
 * Run:  node scripts/capture-projects.mjs <app>     // edc | savoria | medicore | pos
 *
 * An app is a list of "personas" — a login (or none) plus the pages that role
 * can reach. Savoria and the POS gate pages by role, so the only honest way to
 * photograph a waiter's screen is to sign in as the waiter.
 *
 * Shots land in public/assets/images/projects/<app>/ and the printed manifest
 * is what src/components/Portfolio.jsx consumes.
 */
import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'public', 'assets', 'images', 'projects')

const APPS = {
  edc: {
    base: 'http://127.0.0.1:8001',
    personas: [
      {
        login: { url: '/login', user: '01700000000', pass: 'demo1234' },
        pages: [
          ['home', '/', 'Storefront home — hero, category tiles, featured gear'],
          ['shop', '/shop', 'Shop all with filters, sort and live stock badges'],
          ['product', '@firstProduct', 'Product page — gallery, colour choice, buy now'],
          ['cart', '/cart', 'Cart with free-delivery progress and upsell'],
          ['checkout', '/checkout', 'Guest checkout — delivery zone, coupon, payment proof'],
          ['track', '/track', 'Public order tracking by order number and phone'],
          ['admin-dashboard', '/admin', 'Admin dashboard — KPIs, 14-day revenue, order mix, low stock'],
          ['admin-products', '/admin/products', 'Product management with stock and publish status'],
          ['admin-product-create', '/admin/products/create', 'Product editor — pricing, stock, SEO, warranty policy'],
          ['admin-categories', '/admin/categories', 'Categories and sub-categories'],
          ['admin-brands', '/admin/brands', 'Brand management'],
          ['admin-stock', '/admin/stock', 'Stock-in batches with landed cost'],
          ['admin-orders-new', '/admin/orders/new', 'New orders queue — accept or reject before it enters the pipeline'],
          ['admin-orders', '/admin/orders', 'Order management — status filters and inline controls'],
          ['admin-order-create', '/admin/orders/create', 'POS-style manual order entry with live product search'],
          ['admin-courier', '/admin/courier', 'Steadfast courier portal — balance, consignments, bulk sync'],
          ['admin-leads', '/admin/leads', 'Cart leads — every abandoned cart stays followable'],
          ['admin-customers', '/admin/customers', 'Customer records and order history'],
          ['admin-returns', '/admin/returns', 'Return requests'],
          ['admin-reviews', '/admin/reviews', 'Review moderation'],
          ['admin-coupons', '/admin/coupons', 'Coupon codes, limits and expiry'],
          ['admin-banners', '/admin/banners', 'Ads and banners with scheduling and click tracking'],
          ['admin-reports', '/admin/reports', 'Sales, product and inventory reports with CSV/PDF export'],
          ['admin-staff', '/admin/staff', 'Staff accounts and per-page permissions'],
          ['admin-salary', '/admin/salary', 'Staff salary records'],
          ['admin-activity', '/admin/activity', 'Activity log — every back-office action attributed'],
          ['admin-settings', '/admin/settings', 'Store, payment and delivery-charge settings'],
          ['admin-api-token', '/admin/integration-token', 'API token the AI agent uses to take stock'],
        ],
      },
    ],
  },

  savoria: {
    base: 'http://127.0.0.1:8002',
    personas: [
      {
        name: 'public',
        pages: [
          ['storefront', '/savoria', 'Public storefront — one per restaurant, resolved from the URL slug'],
          ['storefront-menu', '/savoria/menu', 'Public menu with categories and variants'],
          ['storefront-reserve', '/savoria/reserve', 'Table reservation with live availability'],
        ],
      },
      {
        name: 'platform',
        login: { url: '/login', user: 'admin@savoria.test', pass: 'demo1234' },
        pages: [
          ['platform-dashboard', '/platform/dashboard', 'Platform dashboard — every restaurant on the install'],
          ['platform-restaurants', '/platform/restaurants', 'Tenant list; a super admin "enters" a restaurant to act in it'],
          ['platform-plans', '/platform/plans', 'Subscription plans'],
          ['platform-subscriptions', '/platform/subscriptions', 'Per-restaurant subscriptions'],
          ['platform-activity', '/platform/activity', 'Platform-wide activity log'],
        ],
      },
      {
        name: 'owner',
        login: { url: '/login', user: 'owner@savoria.test', pass: 'demo1234' },
        pages: [
          ['manage-dashboard', '/manage/dashboard', 'Restaurant dashboard — the owner sees the day in one screen'],
          ['manage-menu', '/manage/menu', 'Menu items, categories and variants'],
          ['manage-recipes', '/manage/recipes', 'Recipe costing — what a dish actually costs to make'],
          ['manage-ingredients', '/manage/ingredients', 'Ingredients with units and reorder levels'],
          ['manage-ledger', '/manage/ledger', 'Append-only stock ledger — every movement, never edited'],
          ['manage-ledger-valuation', '/manage/ledger/valuation', 'Stock valuation from the ledger'],
          ['manage-purchases', '/manage/purchases', 'Purchase orders and goods received'],
          ['manage-orders', '/manage/orders', 'All orders across dine-in, takeaway and online'],
          ['manage-reports-sales', '/manage/reports/sales', 'Sales report by period'],
          ['manage-reports-profit', '/manage/reports/profit', 'Profit report — sales against recipe cost'],
          ['manage-reports-items', '/manage/reports/items', 'Item performance report'],
          ['manage-tables', '/manage/tables', 'Dining tables and their QR codes'],
          ['manage-reservations', '/manage/reservations', 'Reservations and the walk-in queue'],
          ['manage-customers', '/manage/customers', 'Customer records'],
          ['manage-suppliers', '/manage/suppliers', 'Suppliers'],
          ['manage-expenses', '/manage/expenses', 'Expenses by category'],
          ['manage-staff', '/manage/staff', 'Staff and the five fixed roles'],
          ['manage-online', '/manage/online', 'Live online-order feed'],
          ['manage-settings', '/manage/settings', 'Restaurant settings'],
          ['manage-activity', '/manage/activity', 'Activity log for this restaurant only'],
        ],
      },
      {
        name: 'manager',
        login: { url: '/login', user: 'manager@savoria.test', pass: 'demo1234' },
        pages: [
          ['pos', '/pos', 'Point of sale — the till, open to managers, not to waiters'],
          ['pos-till', '/pos/till', 'Till shift with counted-drawer variance'],
          ['pos-orders', '/pos/orders', 'Open orders at the till'],
        ],
      },
      {
        name: 'waiter',
        login: { url: '/login', user: 'waiter@savoria.test', pass: 'demo1234' },
        pages: [
          ['floor-tables', '/floor/tables', 'Live floor plan — table state at a glance'],
          ['floor-orders', '/floor/orders', 'Orders by table'],
          ['floor-waitlist', '/floor/waitlist', 'Walk-in waitlist'],
        ],
      },
      {
        name: 'cook',
        login: { url: '/login', user: 'cook@savoria.test', pass: 'demo1234' },
        pages: [
          ['kitchen', '/kitchen', 'Kitchen display — tickets only, a cook never sees a price'],
        ],
      },
    ],
  },

  medicore: {
    base: 'http://127.0.0.1:8003',
    personas: [
      {
        name: 'owner',
        login: { url: '/login', user: 'owner@medicore.test', pass: 'demo1234' },
        pages: [
          ['dashboard', '/admin/dashboard', 'Hospital dashboard across pharmacy, OPD and wards'],
          ['pos', '/admin/pos', 'Pharmacy counter — batch-aware dispensing'],
          ['medicines', '/admin/medicines', 'Medicine catalogue with generics and forms'],
          ['stock-batches', '/admin/stock/batches', 'Stock as batches, not a number — each with its own expiry'],
          ['stock-expiry', '/admin/stock/expiry', 'Expiry watch — FEFO picking depends on this'],
          ['stock-low', '/admin/stock/low', 'Low stock across the pharmacy'],
          ['stock-movements', '/admin/stock/movements', 'Stock ledger — every movement traceable'],
          ['stock-reconcile', '/admin/stock/reconcile', 'Physical count reconciliation'],
          ['sales', '/admin/sales', 'Pharmacy sales'],
          ['patients', '/admin/patients', 'Patient records with one balance each'],
          ['appointments', '/admin/appointments', 'Doctor appointments'],
          ['appointments-queue', '/admin/appointments/queue', 'Live consultation queue board'],
          ['appointments-slots', '/admin/appointments/slots', 'Slot grid — the database settles double-booking'],
          ['doctors', '/admin/doctors', 'Doctors, departments and schedules'],
          ['prescriptions', '/admin/prescriptions', 'Prescriptions linking OPD to the pharmacy'],
          ['wards-board', '/admin/wards/board', 'Bed board — occupancy settled by the database'],
          ['wards-beds', '/admin/wards/beds', 'Beds by ward and type'],
          ['admissions', '/admin/admissions', 'Inpatient admissions with a running bill'],
          ['billing', '/admin/billing', 'One patient balance across pharmacy, OPD and ward'],
          ['receipts', '/admin/receipts', 'Payments split across several debts'],
          ['suppliers', '/admin/suppliers', 'Suppliers and purchase orders'],
          ['reports-sales', '/admin/reports/sales', 'Sales report'],
          ['reports-stock-value', '/admin/reports/stock-value', 'Stock valuation'],
          ['reports-top-selling', '/admin/reports/top-selling', 'Top-selling medicines'],
          ['users', '/admin/users', 'Users, roles and permissions'],
          ['audit', '/admin/audit', 'Audit log'],
          ['businesses', '/businesses', 'Feature switches — a pharmacy and a hospital on one install'],
        ],
      },
    ],
  },

  beanova: {
    base: 'https://nahid864.github.io',
    // The hero video streams continuously, so the network never goes idle.
    waitUntil: 'load',
    personas: [
      {
        name: 'public',
        pages: [
          ['hero', '/Beanova/', 'Hero: one AI-generated video that scrubs forward and back with the scroll', 0],
          ['story-1', '/Beanova/', 'Scroll story: captions stay legible over moving footage', 1400],
          ['story-2', '/Beanova/', 'Scroll story: later chapters', 2800],
          ['story-3', '/Beanova/', 'Scroll story: closing section', 4200],
        ],
      },
    ],
  },

  nuigent: {
    base: 'https://agent.nuigent.xyz',
    personas: [
      {
        name: 'public',
        pages: [
          ['landing', '/', 'Public landing page', 0],
          ['landing-2', '/', 'Landing: what the agents do', 900],
          ['landing-3', '/', 'Landing: pricing and packages', 1800],
        ],
      },
    ],
  },

  pos: {
    base: 'http://127.0.0.1:8004',
    personas: [
      {
        name: 'owner',
        login: { url: '/login', user: 'owner@bloomsberry.cafe', pass: 'demo1234' },
        pages: [
          ['dashboard', '/owner/dashboard', 'Owner dashboard — the day\'s trading at a glance'],
          ['pos', '/pos', 'Point of sale — order entry and payment'],
          ['pos-orders', '/pos/orders', 'Open and recent orders'],
          ['kitchen', '/kitchen', 'Kitchen display with live tickets'],
          ['menu', '/owner/menu', 'Menu items and categories'],
          ['recipes', '/owner/recipes', 'Recipe costing per menu item'],
          ['ingredients', '/owner/ingredients', 'Ingredients and stock levels'],
          ['ledger', '/owner/ledger', 'Append-only stock ledger'],
          ['ledger-valuation', '/owner/ledger/valuation', 'Stock valuation'],
          ['purchases', '/owner/purchases', 'Purchases and goods received'],
          ['adjustments', '/owner/adjustments', 'Stock adjustments with reasons'],
          ['orders', '/owner/orders', 'All orders'],
          ['reports-sales', '/owner/reports/sales', 'Sales report'],
          ['reports-profit', '/owner/reports/profit', 'Profit against recipe cost'],
          ['reports-items', '/owner/reports/items', 'Item performance'],
          ['foodpanda', '/owner/foodpanda', 'Foodpanda order import and reconciliation'],
          ['foodpanda-mappings', '/owner/foodpanda/mappings', 'Mapping Foodpanda items to the local menu'],
          ['expenses', '/owner/expenses', 'Expenses by category'],
          ['suppliers', '/owner/suppliers', 'Suppliers'],
          ['users', '/owner/users', 'Users and roles'],
          ['settings', '/owner/settings', 'Café settings'],
          ['activity', '/owner/activity', 'Activity log'],
        ],
      },
    ],
  },
}

async function run(appName) {
  const app = APPS[appName]
  if (!app) throw new Error(`unknown app "${appName}" — known: ${Object.keys(APPS).join(', ')}`)

  const dir = join(OUT, appName)
  await mkdir(dir, { recursive: true })

  const browser = await chromium.launch()
  const manifest = []
  let okCount = 0
  let total = 0

  for (const persona of app.personas) {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    })
    const page = await ctx.newPage()

    if (persona.login) {
      await page.goto(app.base + persona.login.url, { waitUntil: 'networkidle' })
      const inputs = page.locator('input:not([type=hidden]):not([type=checkbox])')
      await inputs.nth(0).fill(persona.login.user)
      await inputs.nth(1).fill(persona.login.pass)
      await Promise.all([
        page.waitForLoadState('networkidle'),
        page.locator('button[type=submit]').first().click(),
      ])
      console.log(`[${persona.name || 'main'}] logged in as ${persona.login.user} -> ${page.url()}`)
    }

    // Resolve the first product URL for apps that want a real product page.
    let firstProduct = '/shop'
    if (persona.pages.some(([, p]) => p === '@firstProduct')) {
      try {
        await page.goto(app.base + '/shop', { waitUntil: 'networkidle', timeout: 30000 })
        const href = await page.locator('a[href*="/product/"]').first().getAttribute('href')
        if (href) firstProduct = href.replace(app.base, '')
      } catch {}
    }

    for (const [slug, path, caption, scrollY] of persona.pages) {
      total++
      const target = path === '@firstProduct' ? firstProduct : path
      const file = `${slug}.jpg`
      try {
        const res = await page.goto(app.base + target, { waitUntil: app.waitUntil || 'networkidle', timeout: 30000 })
        await page.waitForTimeout(app.waitUntil ? 3000 : 500)
        if (scrollY) {
          await page.evaluate((y) => window.scrollTo(0, y), scrollY)
          await page.waitForTimeout(2000)
        }
        const status = res ? res.status() : 0
        if (status >= 400) {
          console.log(`  SKIP ${slug.padEnd(24)} ${target}  HTTP ${status}`)
          continue
        }
        await page.screenshot({ path: join(dir, file), type: 'jpeg', quality: 88 })
        console.log(`  ok   ${slug.padEnd(24)} ${target}`)
        manifest.push({ slug, file, caption, path: target, persona: persona.name || 'main' })
        okCount++
      } catch (e) {
        console.log(`  FAIL ${slug.padEnd(24)} ${target}  ${e.message.split('\n')[0]}`)
      }
    }

    await ctx.close()
  }

  await browser.close()
  await writeFile(join(dir, 'manifest.json'), JSON.stringify(manifest, null, 2))
  console.log(`\n${okCount}/${total} captured into ${dir}`)
}

run(process.argv[2] || 'edc').catch((e) => {
  console.error(e)
  process.exit(1)
})
