import { chromium } from 'playwright'
import { join } from 'node:path'

const url = 'http://localhost:5181/'
const titles = [
  'Egyértelmű ajánlat', 'Gyors mobilélmény', 'Bizalomépítő szerkezet',
  'Prémium márkaérzet', 'Konverziós útvonalak', 'Könnyen kezelhető alap',
]
const INCLUDE0 = 'Mobilra optimalizált, egyedi weboldal'
const browser = await chromium.launch()

for (const width of [390, 1440]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.evaluate(async () => {
    const s = (ms) => new Promise((r) => setTimeout(r, ms))
    for (let y = 0; y <= document.documentElement.scrollHeight; y += Math.floor(innerHeight * 0.8)) {
      scrollTo(0, y); await s(120)
    }
    scrollTo(0, 0); await s(300)
  })

  const probe = await page.evaluate(({ titles, INCLUDE0 }) => {
    const vis = (el) => !!el && el.getClientRects().length > 0
    const findH3 = (t) => [...document.querySelectorAll('h3')].find((h) => h.textContent.trim() === t)
    const includeEl = [...document.querySelectorAll('span')].find((s) => s.textContent.trim().startsWith(INCLUDE0))
    const btn = document.querySelector('button[aria-controls="csomag-panel"]')
    return {
      solutionVisible: titles.filter((t) => vis(findH3(t))).length,
      solutionVisibleTitles: titles.filter((t) => vis(findH3(t))),
      accordionBtnVisible: vis(btn),
      accordionAriaExpanded: btn ? btn.getAttribute('aria-expanded') : null,
      panelInDom: !!document.querySelector('#csomag-panel'),
      includeItemVisible: vis(includeEl),
    }
  }, { titles, INCLUDE0 })

  const result = { width, probe }

  if (width < 1024) {
    result.heightCollapsed = await page.evaluate(() => document.documentElement.scrollHeight)
    // screenshot offer section collapsed
    const offer = page.locator('section').filter({ hasText: 'A csomag tartalma' }).first()
    await offer.scrollIntoViewIfNeeded(); await page.waitForTimeout(250)
    await offer.screenshot({ path: join('_audit', 'phase2', 'offer-collapsed-390.png') })
    // expand
    await page.locator('button[aria-controls="csomag-panel"]').click()
    await page.waitForTimeout(550)
    result.afterExpand = await page.evaluate(() => {
      const vis = (el) => !!el && el.getClientRects().length > 0
      const btn = document.querySelector('button[aria-controls="csomag-panel"]')
      const panel = document.querySelector('#csomag-panel')
      const inc = [...document.querySelectorAll('span')].find((s) => s.textContent.trim().startsWith('Mobilra optimalizált, egyedi weboldal'))
      return {
        ariaExpanded: btn.getAttribute('aria-expanded'),
        panelItems: panel ? panel.querySelectorAll('li').length : 0,
        includeItemVisible: vis(inc),
      }
    })
    result.heightExpanded = await page.evaluate(() => document.documentElement.scrollHeight)
    await offer.screenshot({ path: join('_audit', 'phase2', 'offer-expanded-390.png') })
    // solution section screenshot
    const sol = page.locator('section').filter({ hasText: 'Üzleti eszközt' }).first()
    await sol.scrollIntoViewIfNeeded(); await page.waitForTimeout(250)
    await sol.screenshot({ path: join('_audit', 'phase2', 'solution-390.png') })
  } else {
    const sol = page.locator('section').filter({ hasText: 'Üzleti eszközt' }).first()
    await sol.scrollIntoViewIfNeeded(); await page.waitForTimeout(250)
    await sol.screenshot({ path: join('_audit', 'phase2', 'solution-1440.png') })
  }

  console.log(`\n=== ${width}px ===`)
  console.log(JSON.stringify(result, null, 2))
  await ctx.close()
}

await browser.close()
