import type { SimulationComputationStatus } from '@nosgestesclimat/core/features/simulation-computation/types/computation'

/**
 * Whether an action's impact should read as "still being computed" rather than
 * as a value. Anything but a completed computation has no usable impact yet.
 */
export function shouldDisplayComputationInProgressText(
  status: SimulationComputationStatus
) {
  switch (status) {
    case 'completed':
      return false
    case 'pending':
    case 'processing':
    case 'failed':
      return true
    default:
      status satisfies never
      return true
  }
}
