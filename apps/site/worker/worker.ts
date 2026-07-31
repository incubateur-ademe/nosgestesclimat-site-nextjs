import { createAssessActions } from '@nosgestesclimat/core/features/actions/services/assess-actions.service'
import {
  createGetEngineForModel,
  createWarmUpHotEngines,
} from '@nosgestesclimat/core/features/simulation-computation/services/engine-registry.service'
import { createProcessNextPendingComputation } from '@nosgestesclimat/core/features/simulation-computation/services/process-next-pending-computation.service'
import {
  currentMemoryMB,
  heapSizeLimitMB,
} from '@nosgestesclimat/core/lib/memory'
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
  // No --max-old-space-size is set for this worker, so V8 picks the heap
  // ceiling itself: from the cgroup limit when Node detects one, from host RAM
  // when it does not. If this logs well above the container limit, the kernel
  // OOM-kills us before V8 ever feels enough pressure to run a major GC.
  logger.info('[worker] Starting', {
    heapSizeLimitMB: heapSizeLimitMB(),
    ...currentMemoryMB(),
  })

  logger.info('[worker] Warming engine(s)')
  await warmUpHotEngines()
  logger.info('[worker] Engine(s) ready')

  while (running) {
    try {
      const processed = await processNextPendingComputation(getEngineForModel)
      if (processed) {
        // Sampled after the engine cache reset, so heapUsed here is the
        // between-jobs floor rather than the peak reached during the job.
        logger.info('[worker] Job processed', currentMemoryMB())
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
