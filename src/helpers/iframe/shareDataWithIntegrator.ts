import type { ComputedResultsFootprint } from '@/publicodes-state/types'

export function shareDataWithIntegrator(
  carbonComputedResults: ComputedResultsFootprint
) {
  console.log('Sharing data with integrator', carbonComputedResults)
  const sharedData = {
    t: carbonComputedResults.categories['transport'],
    a: carbonComputedResults.categories['alimentation'],
    l: carbonComputedResults.categories['logement'],
    d: carbonComputedResults.categories['divers'],
    s: carbonComputedResults.categories['services sociétaux'],
    bilan: carbonComputedResults.bilan,
    categories: carbonComputedResults.categories,
    subcategories: carbonComputedResults.subcategories,
  }

  window.parent.postMessage(
    { messageType: 'ngc-iframe-share', data: sharedData },
    '*'
  )
}
