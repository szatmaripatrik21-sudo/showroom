import { chromium } from 'playwright'
import { join } from 'node:path'

const url = 'http://localhost:5181/'
const browser = await chromium.launch()

for (const width of [390, 1440]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(url, { waitUntil: 'networkidle' })

  const checks = await page.evaluate(() => {
    const contact = document.querySelector('#kapcsolat')
    const fieldIds = ['nev', 'email', 'phone', 'businessType', 'currentUrl', 'goal', 'message']
    return {
      finalCtaGone: !document.querySelector('#egyutt'),
      headerInContact: !!contact && /Dolgozzunk együtt/.test(contact.textContent) &&
        /A weboldalad ma is hat a bevételedre/.test(contact.textContent),
      oldContactHeadlineGone: !!contact && !/Kérj ajánlatot egy jobb weboldalra/.test(contact.textContent),
      formFields: fieldIds.map((id) => ({ id, present: !!document.getElementById(id) })),
      hasWebsiteToggle: contact ? contact.querySelectorAll('button[aria-pressed]').length : 0,
      submitBtn: !![...document.querySelectorAll('button[type="submit"]')]
        .find((b) => /Elküldöm az ajánlatkérést/.test(b.textContent)),
      reassurances: contact ? [...contact.querySelectorAll('li')].length : 0,
      mailto: !!document.querySelector('a[href^="mailto:"]'),
    }
  })

  // Crop a screenshot of the contact section for the gate artifact.
  const box = await page.locator('#kapcsolat').boundingBox()
  if (box) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, box.y - 20))
    await page.waitForTimeout(300)
    await page.locator('#kapcsolat').screenshot({ path: join('_audit', 'phase1', `contact-${width}.png`) })
  }

  console.log(`\n=== ${width}px ===`)
  console.log(JSON.stringify(checks, null, 2))
  await ctx.close()
}

await browser.close()
