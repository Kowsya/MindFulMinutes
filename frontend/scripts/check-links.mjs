// Checks that each research URL responds. Needs internet. Usage: npm run check:links
import { readFileSync } from 'node:fs'

const data = JSON.parse(readFileSync(new URL('../src/data/research.json', import.meta.url), 'utf8'))
let failed = 0

for (const item of data.items) {
  try {
    const res = await fetch(item.url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
      headers: { 'user-agent': 'Mozilla/5.0 (link-check)' },
    })
    const ok = res.status < 400
    console.log(`${ok ? 'OK  ' : 'FAIL'} ${res.status} ${item.id} ${item.url}`)
    if (!ok) failed++
  } catch (err) {
    console.log(`FAIL --- ${item.id} ${item.url} (${err.name})`)
    failed++
  }
}
console.log(failed ? `\n${failed} link(s) need attention.` : '\nAll links responded.')
console.log('Reminder: a 200 response does not prove the page says what the card claims. Read each source.')
process.exit(failed ? 1 : 0)
