import { chromium } from 'playwright'
import { join } from 'node:path'

const url = 'http://localhost:5181/'
const browser = await chromium.launch()
const out = {}

// ---- Interaction sanity (mobile 390) ----
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } })
  const page = await ctx.newPage()
  await page.goto(url, { waitUntil: 'networkidle' })

  // smooth scroll setting
  out.scrollBehavior = await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)

  // CAROUSEL: swipe → active dot moves
  await page.locator('#munkak').scrollIntoViewIfNeeded()
  await page.waitForTimeout(300)
  out.carousel = await page.evaluate(async () => {
    const el = document.querySelector('[role="region"][aria-label^="Munkák"]')
    const before = [...document.querySelectorAll('button[aria-current="true"]')].map((b) => b.getAttribute('aria-label')).filter((l) => /Ugrás ide/.test(l || ''))
    el.scrollTo({ left: el.children[2].offsetLeft })
    el.dispatchEvent(new Event('scroll'))
    await new Promise((r) => setTimeout(r, 350))
    const after = [...document.querySelectorAll('button[aria-current="true"]')].map((b) => b.getAttribute('aria-label')).filter((l) => /Ugrás ide/.test(l || ''))
    return { before, after, changed: before[0] !== after[0] }
  })

  // OFFER accordion: expand → 8 items, collapse → gone
  const offerBtn = page.locator('button[aria-controls="csomag-panel"]')
  await offerBtn.scrollIntoViewIfNeeded()
  await offerBtn.click(); await page.waitForTimeout(450)
  const openItems = await page.evaluate(() => document.querySelector('#csomag-panel')?.querySelectorAll('li').length || 0)
  await offerBtn.click(); await page.waitForTimeout(450)
  const closedPanel = await page.evaluate(() => !!document.querySelector('#csomag-panel'))
  out.offerAccordion = { openItems, collapsesAway: !closedPanel }

  // FAQ accordion
  const faqBtn = page.locator('#faq-button-0')
  await faqBtn.scrollIntoViewIfNeeded()
  const faqBefore = await faqBtn.getAttribute('aria-expanded')
  await faqBtn.click(); await page.waitForTimeout(400)
  const faqAfter = await faqBtn.getAttribute('aria-expanded')
  const faqPanel = await page.evaluate(() => !!document.querySelector('#faq-panel-0'))
  out.faq = { before: faqBefore, after: faqAfter, panelVisible: faqPanel }

  // INDUSTRY TABS
  await page.locator('#szolgaltatasok').scrollIntoViewIfNeeded()
  out.tabs = await page.evaluate(async () => {
    const tabs = [...document.querySelectorAll('[role="tab"]')]
    const firstSel = tabs.find((t) => t.getAttribute('aria-selected') === 'true')?.id
    tabs[1].click()
    await new Promise((r) => setTimeout(r, 400))
    const nowSel = [...document.querySelectorAll('[role="tab"]')].find((t) => t.getAttribute('aria-selected') === 'true')?.id
    return { firstSelected: firstSel, afterClick: nowSel, switched: firstSel !== nowSel }
  })

  // CONTACT FORM: empty submit → errors; valid → success
  await page.locator('#kapcsolat').scrollIntoViewIfNeeded()
  await page.locator('button[type="submit"]').click()
  await page.waitForTimeout(250)
  const errorsShown = await page.evaluate(() => document.querySelectorAll('p[id$="-error"]').length)
  await page.fill('#nev', 'Teszt Elek')
  await page.fill('#email', 'teszt@example.com')
  await page.fill('#goal', 'több foglalás')
  await page.locator('button[type="submit"]').click()
  await page.waitForTimeout(350)
  const success = await page.evaluate(() => /Köszönöm, megkaptam/.test(document.querySelector('#kapcsolat')?.textContent || ''))
  out.contactForm = { validationErrorsOnEmpty: errorsShown, successOnValid: success }

  await ctx.close()
}

// ---- Final full-page captures + desktop no-regress ----
const heights = {}
for (const width of [390, 768, 1440]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.evaluate(async () => {
    const s = (ms) => new Promise((r) => setTimeout(r, ms))
    for (let y = 0; y <= document.documentElement.scrollHeight; y += Math.floor(innerHeight * 0.8)) { scrollTo(0, y); await s(110) }
    scrollTo(0, 0); await s(300)
  })
  heights[width] = await page.evaluate(() => document.documentElement.scrollHeight)
  await page.screenshot({ path: join('_audit', 'final', `${width}.png`), fullPage: true })
  await ctx.close()
}
out.finalHeights = heights

await browser.close()
console.log(JSON.stringify(out, null, 2))
