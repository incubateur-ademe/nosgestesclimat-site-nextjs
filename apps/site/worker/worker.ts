/* eslint-disable no-console */

import type { EngineRegistryLogger } from '@nosgestesclimat/core/features/simulation-computation/services/engine-registry.service'
import {
  getEngineForModel as createGetEngineForModel,
  warmUpHotEngines as createWarmUpHotEngines,
} from '@nosgestesclimat/core/features/simulation-computation/services/engine-registry.service'
import { processNextPendingComputation } from '@nosgestesclimat/core/features/simulation-computation/services/process-next-pending-computation.service'

const POLL_INTERVAL_MS = 2000

const logger: EngineRegistryLogger = {
  error: (message, meta) => console.error(`[worker] ${message}`, meta ?? ''),
  info: (message, meta) => console.log(`[worker] ${message}`, meta ?? ''),
  debug: (message, meta) => console.log(`[worker] ${message}`, meta ?? ''),
}

const warmUpHotEngines = createWarmUpHotEngines({ logger })
const getEngineForModel = createGetEngineForModel({ logger })

let running = true
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down after current job')
  running = false
})
process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down after current job')
  running = false
})

async function main() {
  logger.info('Warming engine(s)')
  await warmUpHotEngines()
  logger.info('Engine(s) ready')

  while (running) {
    try {
      const processed = await processNextPendingComputation(getEngineForModel)
      if (processed) {
        logger.info('Job processed')
        // Drain the queue without delay
        continue
      }
    } catch (error) {
      console.error('Job failed:', error)
    }
    if (running) {
      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS))
    }
  }
  logger.info('Exiting')
}

main()
