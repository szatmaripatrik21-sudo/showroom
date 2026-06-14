import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
mkdirSync('_audit/phase10', { recursive: true })

const url = 'http://localhost:5173/'
const browser = await chromium.launch()
const widths = [390, 768, 1024, 1440]
const results = []

for (const width of widths) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } })
  const page = await ctx.newPage()
  const consoleErrs = []
  page.on('console', m => { if (m.type() === 'error') consoleErrs.push(m.text()) })

  await page.goto(url, { waitUntil: 'networkidle' })
  await page.evaluate(async () => {
    const s = ms => new Promise(r => setTimeout(r, ms))
    for (let y = 0; y <= document.documentElement.scrollHeight; y += Math.floor(innerHeight * 0.8)) {
      scrollTo(0, y); await s(90)
    }
    scrollTo(0, 0); await s(400)
  })

  const probe = await page.evaluate(() => {
    const sections = [...document.querySelectorAll('section[id]')].map(s => s.id)
    const hasOverflow = document.documentElement.scrollWidth > window.innerWidth + 2
    const cards = [...document.querySelectorAll('article')]
    const allLabeled = cards.length === 0 || cards.every(c =>
      c.textContent?.includes('Weboldal-koncepció') || c.textContent?.includes('Valós projekt')
    )
    const primaryCTAs = [...document.querySelectorAll('a[href="#kapcsolat"]')].length
    const formPresent = !!document.querySelector('form')
    const postSubmitSequence = document.body.textContent?.includes('Mi történik ezután') ?? false
    const h1 = document.querySelector('h1')
    const h1Top = h1 ? Math.round(h1.getBoundingClientRect().top) : -1
    const h1InView = h1Top >= 0 && h1Top < window.innerHeight
    const pricingPresent = document.body.textContent?.includes('119.900') ?? false
    const konzepcionLabel = document.body.textContent?.includes('Weboldal-koncepció') ?? false
    return {
      sections, hasOverflow, allLabeled, primaryCTAs, formPresent,
      postSubmitSequence, h1InView, h1Top, pricingPresent, konzepcionLabel,
      docH: document.documentElement.scrollHeight
    }
  })

  await page.screenshot({ path: `_audit/phase10/${width}.png`, fullPage: true })
  results.push({ width, ...probe, consoleErrs: consoleErrs.slice(0, 2) })
  await ctx.close()
}

await browser.close()
console.log(JSON.stringify(results, null, 2))
