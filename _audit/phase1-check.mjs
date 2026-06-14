import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
mkdirSync('_audit/phase1', { recursive: true })

const browser = await chromium.launch()
const results = []

for (const width of [390, 768, 1024, 1440]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } })
  const page = await ctx.newPage()
  await page.goto('http://localhost:5181/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)

  const data = await page.evaluate(() => {
    const sections = [...document.querySelectorAll('main section, body > div section, section')]
    const ids = sections.map(s => s.id || '(no-id)')
    const hasOverflow = document.documentElement.scrollWidth > window.innerWidth + 2
    return { ids, sectionCount: sections.length, hasOverflow, docH: document.documentElement.scrollHeight }
  })

  await page.screenshot({ path: `_audit/phase1/${width}.png`, fullPage: true })
  results.push({ width, ...data })
  await ctx.close()
}

await browser.close()
console.log(JSON.stringify(results, null, 2))
