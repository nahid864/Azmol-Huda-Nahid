/**
 * Walks every Savoria page as every role and records what each role can open,
 * then screenshots each page a role is allowed into.
 *
 *   node scripts/capture-savoria-roles.mjs <routes.json> <matrix-out.json>
 *
 * routes.json is `php artisan route:list --method=GET --json` from savoria-rms.
 * Needs the app on :8002 against a demo database with the seeded accounts.
 */
import { chromium } from 'playwright'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'public', 'assets', 'images', 'projects', 'savoria', 'roles')
const BASE = 'http://127.0.0.1:8002'
const PASS = 'demo1234'

const ROLES = [
  ['super-admin', 'admin@savoria.test'],
  ['owner', 'owner@savoria.test'],
  ['manager', 'manager@savoria.test'],
  ['waiter', 'waiter@savoria.test'],
  ['cook', 'cook@savoria.test'],
]

// Real ids from the demo database for routes that take a parameter.
const PARAMS = {
  '{order}': '275', '{table}': '1', '{adjustment}': '1', '{customer}': '1',
  '{expense}': '8', '{ingredient}': '1', '{menuItem}': '1', '{purchase}': '4',
  '{staff}': '3', '{plan}': '1', '{restaurant}': 'savoria', '{session}': '1',
}
const SKIP = /_ignition|sanctum|storage|^up$|feed|availability|pay\/|receipt|qr|\/enter$|\{number\}|\{token\}|^login$|^profile$/

const [routesFile, matrixFile] = process.argv.slice(2)
const routes = JSON.parse(await readFile(routesFile, 'utf8'))
  .map((r) => r.uri)
  .filter((u) => !SKIP.test(u))
  .filter((u) => !u.startsWith('{restaurant}') || u === '{restaurant}')
  .map((u) => ({ uri: u, path: '/' + u.replace(/\{[a-zA-Z]+\}/g, (k) => PARAMS[k] ?? k) }))
  .filter((r) => !r.path.includes('{'))

const slug = (uri) => uri.replace(/\{restaurant\}/, 'storefront').replace(/[{}]/g, '').replace(/\//g, '-') || 'home'

const browser = await chromium.launch()
const matrix = {}

for (const [role, email] of ROLES) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 })
  const page = await ctx.newPage()
  await page.goto(BASE + '/login', { waitUntil: 'networkidle' })
  await page.fill('input[name=email]', email)
  await page.fill('input[name=password]', PASS)
  await Promise.all([page.waitForLoadState('networkidle'), page.click('button[type=submit]')])
  const landing = new URL(page.url()).pathname
  const nav = await page.$$eval('aside a, nav a', (as) =>
    [...new Set(as.map((a) => a.textContent.replace(/\s+/g, ' ').trim()).filter((t) => t && t.length < 40))])
  console.log(`\n[${role}] lands on ${landing}; nav: ${nav.join(' | ')}`)

  await mkdir(join(OUT, role), { recursive: true })
  matrix[role] = { landing, nav, pages: {} }

  for (const r of routes) {
    let status = 0, finalPath = ''
    try {
      const res = await page.goto(BASE + r.path, { waitUntil: 'networkidle', timeout: 30000 })
      status = res ? res.status() : 0
      finalPath = new URL(page.url()).pathname
    } catch (e) {
      status = -1
    }
    const allowed = status === 200 && finalPath === r.path
    matrix[role].pages[r.uri] = allowed ? 'yes' : status === 403 ? 'no' : finalPath !== r.path ? `redirect ${finalPath}` : `http ${status}`
    if (allowed) {
      await page.waitForTimeout(400)
      await page.screenshot({ path: join(OUT, role, slug(r.uri) + '.jpg'), type: 'jpeg', quality: 85 })
    }
  }
  const yes = Object.values(matrix[role].pages).filter((v) => v === 'yes').length
  console.log(`  ${yes}/${routes.length} pages open to ${role}`)
  await ctx.close()
}

await browser.close()
await writeFile(matrixFile, JSON.stringify({ routes: routes.map((r) => r.uri), matrix }, null, 2))
console.log('\nmatrix written to', matrixFile)
