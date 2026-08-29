/**
 * Renders public/og-image.png (1200x630) — the card shown when the site is
 * shared on LinkedIn / WhatsApp / X. Re-run with: node scripts/make-og-image.mjs
 */
import { chromium } from 'playwright'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(root, 'public', 'og-image.png')

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:1200px; height:630px; font-family:'Poppins',sans-serif;
    background:#0D0D0D; color:#fff; position:relative; overflow:hidden;
    display:flex; flex-direction:column; justify-content:center; padding:0 84px;
  }
  .grid {
    position:absolute; inset:0; opacity:.06;
    background-image:linear-gradient(rgba(255,90,31,.6) 1px,transparent 1px),
                     linear-gradient(90deg,rgba(255,90,31,.6) 1px,transparent 1px);
    background-size:56px 56px;
  }
  .orb { position:absolute; border-radius:50%; filter:blur(90px); }
  .o1 { width:520px; height:520px; background:rgba(255,90,31,.30); top:-160px; right:-120px; }
  .o2 { width:420px; height:420px; background:rgba(120,90,255,.20); bottom:-180px; left:-100px; }
  .content { position:relative; }
  .pill {
    display:inline-flex; align-items:center; gap:10px; font-size:15px; font-weight:600;
    letter-spacing:.18em; text-transform:uppercase; color:#FF5A1F;
    background:rgba(255,90,31,.10); border:1px solid rgba(255,90,31,.32);
    padding:10px 20px; border-radius:99px; margin-bottom:30px;
  }
  .dot { width:9px; height:9px; border-radius:50%; background:#FF5A1F; }
  h1 { font-size:82px; font-weight:900; line-height:1.02; letter-spacing:-.02em; }
  h1 span { background:linear-gradient(135deg,#FF5A1F,#ff9a5e);
            -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
  h2 { font-size:31px; font-weight:600; color:#B3B3B3; margin-top:22px; }
  .stack { display:flex; gap:12px; margin-top:38px; flex-wrap:wrap; }
  .chip {
    font-size:18px; font-weight:600; color:#d6d6d6;
    background:rgba(255,255,255,.055); border:1px solid rgba(255,255,255,.11);
    padding:11px 20px; border-radius:11px;
  }
  .bar { position:absolute; left:0; right:0; bottom:0; height:9px;
         background:linear-gradient(90deg,#FF5A1F,#ff9a5e,#FF5A1F); }
</style></head>
<body>
  <div class="grid"></div><div class="orb o1"></div><div class="orb o2"></div>
  <div class="content">
    <div class="pill"><span class="dot"></span>Full-Stack Web Developer</div>
    <h1>Azmol Huda<br><span>Nahid</span></h1>
    <h2>Laravel &middot; React &middot; WordPress &mdash; supercharged with AI</h2>
    <div class="stack">
      <div class="chip">Laravel</div><div class="chip">React</div>
      <div class="chip">PHP</div><div class="chip">MySQL</div>
      <div class="chip">Node.js</div><div class="chip">AI Automation</div>
    </div>
  </div>
  <div class="bar"></div>
</body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html, { waitUntil: 'networkidle' })
await page.waitForTimeout(600) // let the webfont paint
await page.screenshot({ path: OUT })
await browser.close()

console.log('Wrote', OUT)
