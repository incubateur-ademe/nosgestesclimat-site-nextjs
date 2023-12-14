import { useMemo } from 'react'
import { DottedName, Engine, NGCRuleNode } from '../../types'
type Props = {
  engine: Engine
  everyRules: DottedName[]
  root: string
  safeGetRule: (rule: string) => NGCRuleNode | null
  order: string[] | null
}

export default function useCategories({
  engine,
  everyRules,
  root,
  safeGetRule,
  order,
}: Props) {
  const categories = useMemo<string[]>(
    () =>
      safeGetRule(root)?.rawNode?.formule?.somme.sort((a: string, b: string) =>
        !order ? 0 : order.indexOf(a) - order.indexOf(b)
      ),
    [root, order, safeGetRule]
  )

  const subcategories = useMemo<Record<string, string[]>>(() => {
    return categories.reduce((accumulator: object, currentValue: string) => {
      const subCat = []
      const sum = safeGetRule(currentValue)?.rawNode?.formule?.somme
      for (const idx in sum) {
        const rule = sum[idx]
        // The rule is a full rule, not a shorten one
        if (everyRules.includes(rule)) {
          subCat.push(rule)
        } else {
          subCat.push(currentValue + ' . ' + rule)
        }
      }
      return {
        ...accumulator,
        [currentValue]: subCat,
      }
    }, {})
  }, [categories, safeGetRule, engine, everyRules])

  return { categories, subcategories }
}
