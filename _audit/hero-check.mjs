import { chromium } from 'playwright'
const browser = await chromium.launch()
const results = []
for (const [w,h] of [[1440,900],[390,844]]) {
  const ctx = await browser.newContext({ viewport: { width:w, height:h } })
  const page = await ctx.newPage()
  await page.goto('http://localhost:5181/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)
  const probe = await page.evaluate(() => {
    const h1 = document.querySelector('h1')
    const btn = document.querySelector('a[href="#munkak"]')
    const eyebrow = [...document.querySelectorAll('span')].find(s => /Weboldalak, amik/.test(s.textContent||''))
    const r1 = h1?.getBoundingClientRect()
    const r2 = btn?.getBoundingClientRect()
    const r3 = eyebrow?.getBoundingClientRect()
    return {
      eyebrowTop: Math.round(r3?.top ?? -1),
      h1Top: Math.round(r1?.top ?? -1),
      h1Bottom: Math.round(r1?.bottom ?? -1),
      ctaTop: Math.round(r2?.top ?? -1),
      viewportH: window.innerHeight,
      headlineVisible: r1 ? r1.top >= 0 && r1.top < window.innerHeight : false,
      ctaVisible: r2 ? r2.top >= 0 && r2.bottom <= window.innerHeight : false,
    }
  })
  await page.screenshot({ path: `_audit/hero-${w}.png`, fullPage: false })
  results.push({ width: w, ...probe })
  await ctx.close()
}
await browser.close()
console.log(JSON.stringify(results, null, 2))
