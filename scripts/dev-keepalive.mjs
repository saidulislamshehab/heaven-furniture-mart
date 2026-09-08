#!/usr/bin/env node
// Keeps the Vite dev server alive: if the child exits or is killed (e.g. a stray `pkill -f vite`),
// it is restarted after a short delay. Ctrl+C stops the supervisor for good.
import { spawn } from 'node:child_process'

const PORT = process.env.PORT ?? '5173'
let stopping = false
let child = null

function start() {
  child = spawn('npx', ['vite', '--port', PORT, '--strictPort', '--host'], { stdio: 'inherit', env: process.env })
  child.on('exit', (code, signal) => {
    if (stopping) return
    console.log(`\n[dev:keep] vite exited (${signal ?? code}); restarting in 1s…`)
    setTimeout(start, 1000)
  })
}

for (const sig of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
  process.on(sig, () => {
    stopping = true
    child?.kill('SIGTERM')
    process.exit(0)
  })
}

start()
