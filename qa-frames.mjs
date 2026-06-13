import { chromium } from 'playwright'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)
const title = await page.title()
console.log('title:', title)

// Find the featured card
const cardY = await page.evaluate(() => {
  const card = document.querySelector('article.card-luxury, [class*="card-luxury"]')
  return card ? card.getBoundingClientRect().top + window.scrollY : null
})
console.log('featured card Y:', cardY)

if (cardY) {
  await page.evaluate((y) => window.scrollTo(0, y - 60), cardY)
  await page.waitForTimeout(3000) // wait for video to load
  await page.screenshot({ path: 'qa-featured.png' })
  console.log('shot: featured')

  // Scroll to small cards grid
  await page.evaluate((y) => window.scrollTo(0, y + 700), cardY)
  await page.waitForTimeout(1000)
  await page.screenshot({ path: 'qa-grid.png' })
  console.log('shot: grid')
}

await browser.close()
console.log('done')
