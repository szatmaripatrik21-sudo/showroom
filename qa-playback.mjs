import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
const errors = []
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message))

const URL = 'http://localhost:5180/'
await page.goto(URL, { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(1000)

// Snapshot of every video: its project name (nearest article h3) + paused state
const snapshot = () => page.evaluate(() => {
  return [...document.querySelectorAll('article video')].map((v) => ({
    name: v.closest('article')?.querySelector('h3')?.textContent?.trim() ?? '?',
    paused: v.paused,
    t: +(v.currentTime || 0).toFixed(2),
  }))
})
const playingNames = (s) => s.filter((v) => !v.paused).map((v) => v.name)

// Scroll into the portfolio section
await page.locator('#munkak').scrollIntoViewIfNeeded()
await page.evaluate(() => document.querySelector('#munkak')?.scrollIntoView({ block: 'start' }))
await page.waitForTimeout(2500)

const results = []
const check = (label, cond, extra = '') => {
  results.push({ label, pass: cond, extra })
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${label}${extra ? '  — ' + extra : ''}`)
}

// 1) Only the featured video may autoplay
let s = await snapshot()
let playing = playingNames(s)
check('Only ≤1 video autoplays on scroll-in', playing.length <= 1, `playing=[${playing}]`)
check('Autoplaying one is the featured (Ambrus Dental)', playing.length === 0 || playing[0]?.includes('Ambrus'), `playing=[${playing}]`)

// 2) Click a secondary play button → only that plays, featured pauses
const secondaryBtn = page.getByRole('button', { name: /Videó lejátszása:/ }).first()
const secName = (await secondaryBtn.getAttribute('aria-label'))?.replace('Videó lejátszása: ', '')
await secondaryBtn.click()
await page.waitForTimeout(1500)
s = await snapshot()
playing = playingNames(s)
check('After click: exactly one video plays', playing.length === 1, `playing=[${playing}]`)
check('The played video is the clicked secondary', playing[0] === secName, `clicked=${secName} playing=[${playing}]`)
check('Featured paused while secondary plays', !playing.includes('Ambrus Dental Klinika'))

// 3) Click a DIFFERENT secondary → previous pauses
const btns = page.getByRole('button', { name: /Videó lejátszása:/ })
const count = await btns.count()
if (count > 0) {
  const otherBtn = btns.first()
  const otherName = (await otherBtn.getAttribute('aria-label'))?.replace('Videó lejátszása: ', '')
  await otherBtn.click()
  await page.waitForTimeout(1500)
  s = await snapshot()
  playing = playingNames(s)
  check('Switching videos keeps exactly one playing', playing.length === 1, `playing=[${playing}]`)
  check('Newly clicked video is the one playing', playing[0] === otherName, `new=${otherName} playing=[${playing}]`)
}

// 4) Scroll away → active video pauses
await page.evaluate(() => window.scrollTo(0, 0))
await page.waitForTimeout(1200)
s = await snapshot()
playing = playingNames(s)
check('Scrolling away pauses everything', playing.length === 0, `playing=[${playing}]`)

// 5) Featured resumes autoplay when scrolled back and nothing manual is active
await page.evaluate(() => document.querySelector('#munkak')?.scrollIntoView({ block: 'start' }))
await page.waitForTimeout(2500)
s = await snapshot()
playing = playingNames(s)
check('Featured resumes (≤1 playing, is featured)', playing.length <= 1 && (playing.length === 0 || playing[0].includes('Ambrus')), `playing=[${playing}]`)

check('No console / page errors', errors.length === 0, errors.join(' | '))

await page.screenshot({ path: 'qa-playback.png', fullPage: false })
await browser.close()

const failed = results.filter((r) => !r.pass)
console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
process.exit(failed.length ? 1 : 0)
