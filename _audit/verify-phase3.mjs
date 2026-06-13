import { chromium } from 'playwright'
import { join } from 'node:path'

const url = 'http://localhost:5181/'
const SEL = '[role="region"][aria-label^="Munkák"]'
const browser = await chromium.launch()

for (const width of [390, 1440]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.locator('#munkak').scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)

  const atRest = await page.evaluate((SEL) => {
    const el = document.querySelector(SEL)
    if (!el) return { found: false }
    const cs = getComputedStyle(el)
    const kids = [...el.children]
    const cw = el.clientWidth
    const fullyVisible = kids.filter((c) => {
      const k = c
      return k.offsetLeft >= el.scrollLeft - 1 && k.offsetLeft + k.offsetWidth <= el.scrollLeft + cw + 1
    }).length
    return {
      found: true,
      display: cs.display,
      overflowX: cs.overflowX,
      horizontallyScrollable: el.scrollWidth > el.clientWidth + 2,
      cardCount: kids.length,
      firstCardWidthRatio: kids[0] ? +(kids[0].offsetWidth / cw).toFixed(2) : null,
      fullyVisibleAtRest: fullyVisible,
      dots: document.querySelectorAll(`${SEL} ~ div button[aria-current]`).length,
      activeDot: [...document.querySelectorAll(`button[aria-current="true"]`)]
        .findIndex((b) => /Ugrás ide/.test(b.getAttribute('aria-label') || '')),
    }
  }, SEL)

  const result = { width, atRest }

  if (width < 1024) {
    // screenshot at rest
    await page.locator(SEL).screenshot({ path: join('_audit', 'phase3', 'carousel-rest-390.png') })
    // simulate a swipe to card index 2
    await page.evaluate((SEL) => {
      const el = document.querySelector(SEL)
      const c = el.children[2]
      el.scrollTo({ left: c.offsetLeft })
      el.dispatchEvent(new Event('scroll'))
    }, SEL)
    await page.waitForTimeout(400)
    result.afterSwipe = await page.evaluate((SEL) => {
      const el = document.querySelector(SEL)
      const x = el.scrollLeft
      let leftmost = 0, best = Infinity
      ;[...el.children].forEach((c, i) => {
        const d = Math.abs(c.offsetLeft - x)
        if (d < best) { best = d; leftmost = i }
      })
      return {
        scrollLeft: Math.round(x),
        leftmostCard: leftmost,
        activeDot: [...document.querySelectorAll(`button[aria-current="true"]`)]
          .map((b) => b.getAttribute('aria-label')).filter((l) => /Ugrás ide/.test(l || '')),
      }
    }, SEL)
    await page.locator(SEL).screenshot({ path: join('_audit', 'phase3', 'carousel-swiped-390.png') })
  } else {
    await page.locator('#munkak').screenshot({ path: join('_audit', 'phase3', 'portfolio-1440.png') })
  }

  console.log(`\n=== ${width}px ===`)
  console.log(JSON.stringify(result, null, 2))
  await ctx.close()
}

await browser.close()
