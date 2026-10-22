// The published packages, installed from their tarballs: a .ts bin fails under
// node_modules, so this is the check that what npm ships runs.
// Slow and networked (npm install): runs only with PLAYBOOK_SMOKE=1.
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { test } from 'node:test'

const PACKAGES = resolve(import.meta.dirname, '..', '..')

test('the packed packages create a playbook that passes its check', {
  skip: !process.env.PLAYBOOK_SMOKE,
}, () => {
  const root = mkdtempSync(join(tmpdir(), 'playbook-smoke-'))
  try {
    const tarballs = join(root, 'tarballs')
    for (const pkg of ['playbook', 'create-playbook']) {
      execFileSync('pnpm', ['pack', '--pack-destination', tarballs], {
        cwd: join(PACKAGES, pkg),
        stdio: 'ignore',
      })
    }
    const tarball = (prefix: string) =>
      join(tarballs, readdirSync(tarballs).find((f) => f.startsWith(prefix)) ?? '')
    const playbook = tarball('lntt-playbook-')
    const create = tarball('lntt-create-playbook-')

    const runner = join(root, 'runner')
    execFileSync('npm', ['init', '-y'], { cwd: mkdir(runner), stdio: 'ignore' })
    execFileSync('npm', ['install', create], { cwd: runner, stdio: 'ignore' })
    execFileSync(
      join(runner, 'node_modules', '.bin', 'create-playbook'),
      ['acme-playbook', join(root, 'acme')],
      {
        stdio: 'ignore',
      },
    )

    const acme = join(root, 'acme')
    // The released @lntt/playbook is not on npm in a pull request: install the tarball.
    execFileSync('npm', ['install', playbook], { cwd: acme, stdio: 'ignore' })
    const out = execFileSync(join(acme, 'node_modules', '.bin', 'playbook'), ['check'], {
      cwd: acme,
      encoding: 'utf8',
    })
    assert.match(out, /0 errors/)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

function mkdir(path: string): string {
  execFileSync('mkdir', ['-p', path])
  writeFileSync(join(path, '.keep'), '')
  return path
}
