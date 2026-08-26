#!/usr/bin/env node
import { execSync } from 'node:child_process'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const prismaEntry = require.resolve('prisma/build/index.js')
const config = require.resolve('../prisma.config.js')

const args = process.argv.slice(2)
const subcommand = args.length > 0 ? args.join(' ') : 'deploy'

execSync(`node ${prismaEntry} migrate ${subcommand} --config ${config}`, {
  stdio: 'inherit',
})
