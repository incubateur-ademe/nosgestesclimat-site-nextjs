import { createAssessActions } from '@nosgestesclimat/core/features/actions/services/assess-actions.service'
import {
  createGetEngineForModel,
  createWarmUpHotEngines,
} from '@nosgestesclimat/core/features/simulation-computation/services/engine-registry.service'
import { createProcessNextPendingComputation } from '@nosgestesclimat/core/features/simulation-computation/services/process-next-pending-computation.service'
import logger from '../src/logger.ts'

const POLL_INTERVAL_MS = 2000

const warmUpHotEngines = createWarmUpHotEngines({ logger })
const getEngineForModel = createGetEngineForModel({ logger })
const assessActions = createAssessActions({
  logger,
  // TODO: Setup Sentry in worker
  captureException() {},
})
const processNextPendingComputation = createProcessNextPendingComputation({
  assessActions,
})

let running = true
process.on('SIGTERM', () => {
  logger.info('[worker] SIGTERM received, shutting down after current job')
  running = false
})
process.on('SIGINT', () => {
  logger.info('[worker] SIGINT received, shutting down after current job')
  running = false
})

async function main() {
  logger.info('[worker] Warming engine(s)')
  await warmUpHotEngines()
  logger.info('[worker] Engine(s) ready')

  while (running) {
    try {
      const processed = await processNextPendingComputation(getEngineForModel)
      if (processed) {
        logger.info('[worker] Job processed')
        // Drain the queue without delay
        continue
      }
    } catch (error) {
      logger.error('[worker] Job failed', { error })
    }
    if (running) {
      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS))
    }
  }
  logger.info('[worker] Exiting')
}

main()
