// The packages this repository publishes share one version.
//
//   node scripts/packages-version.mts list             their directories
//   node scripts/packages-version.mts check [version]  one shared version, equal to `version` if given
//   node scripts/packages-version.mts set <version>    write it into every one of them
//
// A published package is any packages/*/package.json without `"private": true`.
// Run from the repository root.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const SEMVER = /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/

type Published = { dir: string; file: string; name: string; version: string }

function published(): Published[] {
  return readdirSync('packages')
    .map((entry) => join('packages', entry))
    .filter((dir) => existsSync(join(dir, 'package.json')))
    .map((dir) => {
      const file = join(dir, 'package.json')
      const manifest = JSON.parse(readFileSync(file, 'utf8'))
      return {
        dir,
        file,
        name: manifest.name,
        version: manifest.version,
        isPrivate: manifest.private === true,
      }
    })
    .filter((p) => !p.isPrivate)
    .map(({ isPrivate: _, ...p }) => p)
    .sort((a, b) => a.dir.localeCompare(b.dir))
}

function fail(message: string): never {
  console.error(message)
  process.exit(1)
}

const [command, arg] = process.argv.slice(2)
const packages = published()

if (command === 'list') {
  for (const p of packages) console.log(p.dir)
} else if (command === 'check') {
  const expected = arg ?? packages[0]?.version
  const off = packages.filter((p) => p.version !== expected)
  if (off.length > 0) {
    fail(
      `the published packages must all be at ${expected}${arg ? ' (the release tag)' : ''}:\n` +
        off.map((p) => `  ${p.name} ${p.version}`).join('\n') +
        '\nalign them with: node scripts/packages-version.mts set <version>',
    )
  }
  console.log(`${packages.length} packages at ${expected}`)
} else if (command === 'set') {
  if (!arg || !SEMVER.test(arg)) fail(`not a version: ${arg ?? '(none)'}; write it as X.Y.Z or X.Y.Z-pre.N`)
  for (const p of packages) {
    writeFileSync(p.file, readFileSync(p.file, 'utf8').replace(/("version":\s*)"[^"]*"/, `$1"${arg}"`))
  }
  console.log(`${packages.length} packages set to ${arg}`)
} else {
  fail('usage: packages-version.mts list | check [version] | set <version>')
}
