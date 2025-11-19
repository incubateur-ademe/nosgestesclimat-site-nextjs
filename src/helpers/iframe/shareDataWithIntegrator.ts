import type { ComputedResultsFootprint } from '@/publicodes-state/types'
import type {
  Categories,
  Subcategories,
} from '@incubateur-ademe/nosgestesclimat'

export function shareDataWithIntegrator(
  carbonComputedResults: ComputedResultsFootprint
) {
  const sharedData = {
    t: carbonComputedResults.categories['transport'],
    a: carbonComputedResults.categories['alimentation'],
    l: carbonComputedResults.categories['logement'],
    d: carbonComputedResults.categories['divers'],
    s: carbonComputedResults.categories['services sociétaux'],
    categories: carbonComputedResults.categories,
    subcategories: Object.keys(carbonComputedResults.categories).reduce(
      (acc, category) => {
        acc[category as Categories] = Object.keys(
          carbonComputedResults.subcategories ?? {}
        ).reduce(
          (subacc, subcategory) => {
            if ((subcategory as Subcategories).startsWith(category)) {
              subacc[subcategory as Subcategories] =
                carbonComputedResults.subcategories?.[
                  subcategory as Subcategories
                ] ?? 0
            }
            return subacc
          },
          {} as Record<Subcategories, number>
        )
        return acc
      },
      {} as Record<Categories, Record<Subcategories, number>>
    ),
  }

  window.parent.postMessage(
    { messageType: 'ngc-iframe-share', data: sharedData },
    '*'
  )
}
