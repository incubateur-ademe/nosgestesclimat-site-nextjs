import { useMemo } from 'react'
import { safeEvaluateHelper } from '../helpers/safeEvaluateHelper'
import { Engine, NGCRuleNode } from '../types'
type Props = {
  engine: Engine
  root: string
  safeGetRule: (rule: string) => NGCRuleNode | null
  order: string[] | null
}

export default function useCategories({
  engine,
  root,
  safeGetRule,
  order,
}: Props) {
  const pristineMissingVariables = useMemo<Record<string, number>>(
    () => safeEvaluateHelper(root, engine)?.missingVariables || {},
    [engine, root]
  )

  const categories = useMemo<string[]>(
    () =>
      Object.keys(pristineMissingVariables)
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
    [pristineMissingVariables, order]
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
