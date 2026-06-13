import { chromium } from 'playwright'
import { join } from 'node:path'

const url = 'http://localhost:5181/'
const DISCLAIMER = 'nem fiktív ügyféleredmények'
const browser = await chromium.launch()

for (const width of [390, 1440]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.evaluate(async () => {
    const s = (ms) => new Promise((r) => setTimeout(r, ms))
    for (let y = 0; y <= document.documentElement.scrollHeight; y += Math.floor(innerHeight * 0.8)) { scrollTo(0, y); await s(110) }
    scrollTo(0, 0); await s(300)
  })

  const probe = await page.evaluate((DISCLAIMER) => {
    const colCount = (el) => el ? getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length : 0
    const stats = document.querySelector('#eredmeny .grid')
    const proc = document.querySelector('#folyamat .snap-mandatory')
    return {
      stats: {
        display: stats ? getComputedStyle(stats).display : null,
        columns: colCount(stats),
        tiles: stats ? stats.children.length : 0,
        disclaimerVerbatim: !!document.querySelector('#eredmeny')?.textContent.includes(DISCLAIMER),
      },
      process: {
        display: proc ? getComputedStyle(proc).display : null,
        overflowX: proc ? getComputedStyle(proc).overflowX : null,
        scrollable: proc ? proc.scrollWidth > proc.clientWidth + 2 : false,
        steps: proc ? proc.children.length : 0,
        columns: colCount(proc),
      },
    }
  }, DISCLAIMER)

  console.log(`\n=== ${width}px ===`)
  console.log(JSON.stringify(probe, null, 2))

  const tag = width < 1024 ? '390' : '1440'
  await page.locator('#eredmeny').scrollIntoViewIfNeeded(); await page.waitForTimeout(250)
  await page.locator('#eredmeny').screenshot({ path: join('_audit', 'phase4', `stats-${tag}.png`) })
  await page.locator('#folyamat').scrollIntoViewIfNeeded(); await page.waitForTimeout(250)
  await page.locator('#folyamat').screenshot({ path: join('_audit', 'phase4', `process-${tag}.png`) })

  await ctx.close()
}

await browser.close()
