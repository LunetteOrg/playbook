#!/usr/bin/env node
// Creates a company playbook from the template: create-playbook <name> [folder]
import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, readdirSync, readFileSync, renameSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const TEMPLATE = join(dirname(fileURLToPath(import.meta.url)), '..', 'templates', 'default')

const NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function create(name: string, target: string): void {
  if (!NAME.test(name)) throw new Error(`invalid name "${name}": use lowercase letters, digits and hyphens`)
  if (existsSync(target) && readdirSync(target).length > 0)
    throw new Error(`${target} exists and is not empty`)

  cpSync(TEMPLATE, target, { recursive: true })
  // npm drops .gitignore from published packages: the template ships it as gitignore.
  renameSync(join(target, 'gitignore'), join(target, '.gitignore'))
  for (const file of walk(target)) {
    const text = readFileSync(file, 'utf8')
    if (text.includes('{{name}}')) writeFileSync(file, text.replaceAll('{{name}}', name))
  }
}

function* walk(folder: string): Generator<string> {
  for (const entry of readdirSync(folder)) {
    const path = join(folder, entry)
    if (statSync(path).isDirectory()) yield* walk(path)
    else yield path
  }
}

if (import.meta.main) {
  const [name, folder] = process.argv.slice(2)
  if (!name) {
    console.error('usage: create-playbook <name> [folder]')
    process.exit(2)
  }
  const target = resolve(folder ?? name)
  try {
    create(name, target)
  } catch (e) {
    console.error((e as Error).message)
    process.exit(1)
  }
  try {
    execFileSync('git', ['init', '-q'], { cwd: target })
  } catch {
    // git is optional: without it the playbook is created without a repository.
  }
  console.log(`Created ${target}. Next: cd ${folder ?? name} && pnpm install && pnpm playbook check`)
}
