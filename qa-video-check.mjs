import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message))

// Throttle network so the loading chip is observable
const cdp = await page.context().newCDPSession(page)
await cdp.send('Network.emulateNetworkConditions', {
  offline: false, latency: 80,
  downloadThroughput: (1.2 * 1024 * 1024) / 8, // ~1.2 Mbps
  uploadThroughput: (512 * 1024) / 8,
})

await page.goto('http://localhost:5174/', { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(1500)

// Scroll toward the portfolio section quickly
await page.evaluate(() => {
  const el = document.querySelector('video')
  el?.closest('article')?.scrollIntoView({ block: 'center', behavior: 'instant' })
})
await page.waitForTimeout(700)

// Capture loading state (chip should show if still buffering)
await page.screenshot({ path: 'qa-1-loading.png' })
const st1 = await page.evaluate(() => {
  const v = document.querySelector('video')
  return {
    objectPosition: v ? getComputedStyle(v).objectPosition : null,
    paused: v?.paused, currentTime: v?.currentTime?.toFixed(2), readyState: v?.readyState,
    chips: [...document.querySelectorAll('span')].filter(s => /Előnézet/.test(s.textContent || '')).map(s => s.textContent),
  }
})
console.log('on arrival:', JSON.stringify(st1))

// Wait for buffer + play
await page.waitForTimeout(6000)
const st2 = await page.evaluate(() => {
  const v = document.querySelector('video')
  return { paused: v?.paused, currentTime: v?.currentTime?.toFixed(2), readyState: v?.readyState }
})
console.log('after 6s visible:', JSON.stringify(st2))
await page.screenshot({ path: 'qa-2-playing.png' })

// Scroll away — video should pause
await page.evaluate(() => window.scrollTo(0, 0))
await page.waitForTimeout(800)
const st3 = await page.evaluate(() => {
  const v = document.querySelector('video')
  return { paused: v?.paused, currentTime: v?.currentTime?.toFixed(2) }
})
console.log('scrolled away:', JSON.stringify(st3))

// Scroll back — should resume (not restart, by design after first play)
await page.evaluate(() => {
  document.querySelector('video')?.closest('article')?.scrollIntoView({ block: 'center', behavior: 'instant' })
})
await page.waitForTimeout(1000)
const st4 = await page.evaluate(() => {
  const v = document.querySelector('video')
  return { paused: v?.paused, currentTime: v?.currentTime?.toFixed(2) }
})
console.log('back in view:', JSON.stringify(st4))

console.log('ERRORS:', errors.length ? errors : 'none')
await browser.close()
console.log('done')
