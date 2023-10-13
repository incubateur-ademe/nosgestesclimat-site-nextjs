import { useMemo } from 'react'
import { safeEvaluateHelper } from '../helpers/safeEvaluateHelper'
import { Engine, NGCRuleNode, RuleName } from '../types'

type Props = {
  engine: Engine
  root: RuleName
  safeGetRule: (rule: string) => NGCRuleNode | null
  order: RuleName[] | null
}

export default function useCategories({
  engine,
  root,
  safeGetRule,
  order,
}: Props): {
  categories: RuleName[]
  subcategories: Record<RuleName, RuleName[]>
} {
  const categories = useMemo<RuleName[]>(() => {
    const sum = safeGetRule(root)?.rawNode?.formule?.somme
    return order
      ? // NOTE(@EmileRolley): what should be the wanted behavior if the order
        // doesn't match the sum?
        sum.sort((a: string, b: string) => order.indexOf(a) - order.indexOf(b))
      : sum
  }, [root, order, safeGetRule])

  const subcategories = useMemo<Record<RuleName, RuleName[]>>(
    () =>
      categories.reduce((acc: object, category: RuleName) => {
        const categorySum = safeGetRule(category)?.rawNode?.formule?.somme

        if (!categorySum || category === 'services sociétaux') {
          return {
            ...acc,
            [category]: [],
          }
        }

        const sortedSubCategory = categorySum
          .map((rule: RuleName) => category + ' . ' + rule)
          .sort(
            (a: RuleName, b: RuleName) =>
              (safeEvaluateHelper(a, engine)?.nodeValue ?? 0) -
              (safeEvaluateHelper(b, engine)?.nodeValue ?? 0)
          )

        return {
          ...acc,
          [category]: sortedSubCategory,
        }
      }, {}),
    [categories, safeGetRule, engine]
  )
  return { categories, subcategories }
}
