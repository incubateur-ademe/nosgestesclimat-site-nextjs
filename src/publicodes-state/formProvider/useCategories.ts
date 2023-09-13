import { useMemo } from 'react'
import { NGCEvaluatedNode, NGCRuleNode } from '../types'

type Props = {
  root: string
  safeGetRule: (rule: string) => NGCRuleNode | null
  safeEvaluate: (rule: string) => NGCEvaluatedNode | null
  order: string[] | null
}

export default function useCategories({
  root,
  safeGetRule,
  safeEvaluate,
  order,
}: Props) {
  const missingVariables = useMemo<string[]>(
    () => Object.keys(safeEvaluate(root)?.missingVariables || {}),
    [safeEvaluate, root]
  )

  const categories = useMemo<string[]>(
    () =>
      missingVariables
        .reduce(
          (accumulator: string[], currentValue: string) =>
            accumulator.includes(currentValue.split(' . ')[0])
              ? accumulator
              : [...accumulator, currentValue.split(' . ')[0]],
          []
        )
        .sort((a: string, b: string) =>
          !order ? 0 : order.indexOf(a) > order.indexOf(b) ? 1 : -1
        ),
    [missingVariables, order]
  )

  const subcategories = useMemo<Record<string, string[]>>(
    () =>
      categories.reduce(
        (accumulator: object, currentValue: string) => ({
          ...accumulator,
          [currentValue]:
            currentValue === 'services sociétaux'
              ? []
              : safeGetRule(
                  currentValue === 'logement'
                    ? 'logement . impact' // Model shenanigans
                    : currentValue === 'transport'
                    ? 'transport . empreinte'
                    : currentValue
                )?.rawNode?.formule?.somme?.map(
                  (rule: string) => currentValue + ' . ' + rule
                ) || [],
        }),
        {}
      ),
    [categories, safeGetRule]
  )

  return { categories, subcategories }
}
