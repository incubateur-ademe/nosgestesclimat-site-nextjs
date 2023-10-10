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
  const categories = useMemo<string[]>(() => {
    const sum = safeGetRule(root)?.rawNode?.formule?.somme
    return order
      ? // NOTE(@EmileRolley): what should be the wanted behavior if the order
        // doesn't match the sum?
        sum.sort((a: string, b: string) => order.indexOf(a) - order.indexOf(b))
      : sum
  }, [root, order, safeGetRule])

  const subcategories = useMemo<Record<string, string[]>>(
    () =>
      categories.reduce((acc: object, category: string) => {
        const categorySum = safeGetRule(category)?.rawNode?.formule?.somme

        if (!categorySum || category === 'services sociétaux') {
          return {
            ...acc,
            [category]: [],
          }
        }

        const sortedSubCategory = categorySum
          .map((rule: string) => category + ' . ' + rule)
          .sort(
            (a: string, b: string) =>
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
