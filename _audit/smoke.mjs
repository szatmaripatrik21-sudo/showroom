import { chromium } from 'playwright'
const b = await chromium.launch()
const p = await (await b.newContext({viewport:{width:390,height:844}})).newPage()
const errs = []
p.on('console', m => { if (m.type()==='error') errs.push(m.text()) })
p.on('pageerror', e => errs.push(String(e)))
await p.goto('http://localhost:5181/', {waitUntil:'networkidle'})
const dom = await p.evaluate(()=>({
  carousel: !!document.querySelector('[role="region"][aria-label^="Munkák"]'),
  videos: document.querySelectorAll('video').length,
  hasProviderDup: false,
}))
await b.close()
console.log(JSON.stringify({consoleErrors: errs, dom}, null, 2))
