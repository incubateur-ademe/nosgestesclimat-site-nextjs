import { orderedCategories } from '@/constants/orderedCategories'
import getSomme from '@/publicodes-state/helpers/getSomme'
import { getSubcategories } from '@/publicodes-state/helpers/getSubcategories'
import type {
  DottedName,
  NGCRuleNode,
  NGCRulesNodes,
} from '@abc-transitionbascarbone/near-modele'
import * as Sentry from '@sentry/react'
import { useMemo } from 'react'

type Props = {
  parsedRules?: NGCRulesNodes
  everyRules: DottedName[]
  root: DottedName
  safeGetRule?: (rule: DottedName) => NGCRuleNode | undefined
}

export function useCategories({
  parsedRules,
  everyRules,
  root,
  safeGetRule,
}: Props) {
  const categories = useMemo<DottedName[]>(() => {
    const rootRule = safeGetRule?.(root)
    if (!rootRule) {
      console.error(`[useCategories] No rule found for ${root}`)

      Sentry.captureMessage(
        `[useCategories:categories] No rule found for ${root}`
      )
      return []
    }
    const sum = getSomme(rootRule.rawNode)
    if (!sum) {
      console.error(`[useCategories] No [somme] found for ${root}`)

      Sentry.captureMessage(
        `[useCategories:categories] No [somme] found for ${root}`
      )
      return []
    }

    return sum.sort((a: DottedName, b: DottedName) =>
      !orderedCategories
        ? 0
        : orderedCategories.indexOf(a) - orderedCategories.indexOf(b)
    )
  }, [root, safeGetRule])

  const subcategories = useMemo<DottedName[]>(() => {
    return getSubcategories({
      categories,
      everyRules,
      parsedRules,
      safeGetRule,
    })
  }, [categories, safeGetRule, everyRules, parsedRules])

  return { categories, subcategories }
}
