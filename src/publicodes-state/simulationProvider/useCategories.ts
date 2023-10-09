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
  const categories = useMemo<string[]>(
    () =>
      safeGetRule(root)?.rawNode?.formule?.somme.sort((a: string, b: string) =>
        !order ? 0 : order.indexOf(a) > order.indexOf(b) ? 1 : -1
      ),
    [root, order, safeGetRule]
  )

  const subcategories = useMemo<Record<string, string[]>>(
    () =>
      categories.reduce(
        (accumulator: object, currentValue: string) => ({
          ...accumulator,
          [currentValue]:
            currentValue === 'services sociétaux'
              ? []
              : (
                  safeGetRule(currentValue)?.rawNode?.formule?.somme?.map(
                    (rule: string) => currentValue + ' . ' + rule
                  ) || []
                ).sort((a: string, b: string) =>
                  (safeEvaluateHelper(a, engine)?.nodeValue || 0) >
                  (safeEvaluateHelper(b, engine)?.nodeValue || 0)
                    ? -1
                    : 1
                ),
        }),
        {}
      ),
    [categories, safeGetRule, engine]
  )
  return { categories, subcategories }
}
