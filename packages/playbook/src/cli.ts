#!/usr/bin/env node
// The playbook command.
//   playbook check [folder]   structural check of a playbook (exit 1 on errors)
import { check } from './checker.ts'

const PENDING = /^(\S+) is linked but still pending$/

const [command, folder] = process.argv.slice(2)

if (command !== 'check') {
  console.error('usage: playbook check [folder]')
  process.exit(2)
}

const { errors, warnings } = check(folder ?? process.cwd())
const pending = warnings.flatMap((w) => PENDING.exec(w)?.[1] ?? [])
const otherWarnings = warnings.filter((w) => !PENDING.test(w))

for (const e of errors) console.log(`✗ ${e}`)
for (const w of otherWarnings) console.log(`! ${w}`)
if (pending.length > 0) {
  const sorted = pending.sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
  console.log(`… linked but still pending (${sorted.length}): ${sorted.join(', ')}`)
}
console.log(`${errors.length} errors, ${otherWarnings.length} warnings, ${pending.length} pending`)

process.exit(errors.length > 0 ? 1 : 0)
