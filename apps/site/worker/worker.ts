/* eslint-disable no-console */

import {
  getEngineForModel,
  warmUpHotEngines,
} from '@nosgestesclimat/core/features/simulation-computation/services/engine-registry.service'
import { processNextPendingComputation } from '@nosgestesclimat/core/features/simulation-computation/services/process-next-pending-computation.service'

const POLL_INTERVAL_MS = 2000

let running = true
process.on('SIGTERM', () => {
  console.log('[worker] SIGTERM received, shutting down after current job')
  running = false
})
process.on('SIGINT', () => {
  console.log('[worker] SIGINT received, shutting down after current job')
  running = false
})

async function main() {
  console.log('[worker] Warming engine(s)')
  await warmUpHotEngines()
  console.log('[worker] Engine(s) ready')

  while (running) {
    try {
      const processed = await processNextPendingComputation(getEngineForModel)
      if (processed) {
        console.log('[worker] Job processed')
        // Drain the queue without delay
        continue
      }
    } catch (error) {
      console.error('[worker] Job failed:', error)
    }
    if (running) {
      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS))
    }
  }
  console.log('[worker] Exiting')
}

main()
