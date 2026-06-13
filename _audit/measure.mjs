// Reproducible mobile-length measurement harness.
// Usage: node _audit/measure.mjs <label> [url]
//   <label>  subdir under _audit/ to write screenshots into (e.g. baseline, phase1)
//   [url]    defaults to http://localhost:5181/
//
// For each width it: loads the page, scrolls top→bottom to trigger whileInView
// reveals + lazy media, returns to top, then records the full document height
// and writes a full-page screenshot. Heights are the contract for "shorter".
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const label = process.argv[2] || 'baseline'
const url = process.argv[3] || 'http://localhost:5181/'
const widths = [390, 768, 1440]
const outDir = join('_audit', label)
mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch()
const results = []

for (const width of widths) {
  const ctx = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
  })
  const page = await ctx.newPage()
  await page.goto(url, { waitUntil: 'networkidle' })

  // Settle: walk the whole page so every whileInView section reveals and any
  // lazy media attaches, then return to the top for a clean capture.
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
    await sleep(500)
    const step = Math.floor(window.innerHeight * 0.8)
    const max = () => document.documentElement.scrollHeight
    for (let y = 0; y <= max(); y += step) {
      window.scrollTo(0, y)
      await sleep(140)
    }
    window.scrollTo(0, 0)
    await sleep(450)
  })

  const height = await page.evaluate(() =>
    Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      document.documentElement.offsetHeight,
    ),
  )

  await page.screenshot({ path: join(outDir, `${width}.png`), fullPage: true })
  results.push({ width, height })
  await ctx.close()
}

await browser.close()
console.log(JSON.stringify({ label, url, results }, null, 2))
