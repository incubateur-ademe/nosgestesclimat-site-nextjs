import { orderedCategories } from '@/constants/orderedCategories'
import getSomme from '@/publicodes-state/helpers/getSomme'
import {
  DottedName,
  NGCRuleNode,
  NGCRulesNodes,
} from '@incubateur-ademe/nosgestesclimat'
import * as Sentry from '@sentry/react'
import { utils } from 'publicodes'
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
    return categories.reduce(
      (accumulator: DottedName[], currentValue: DottedName) => {
        const subCat: DottedName[] = []

        const rule = safeGetRule?.(currentValue)
        if (!rule) {
          console.error(
            `[useCategories:subcategories] No rule found for ${currentValue}`
          )
          Sentry.captureMessage(
            `[useCategories:subcategories] No rule found for ${currentValue}`
          )
          return accumulator
        }

        const sum = getSomme(rule.rawNode)
        if (!sum) {
          console.error(
            `[useCategories:subcategories] No [somme] found for ${currentValue}`
          )
          Sentry.captureMessage(
            `[useCategories:subcategories] No [somme] found for ${currentValue}`
          )
          return accumulator
        }

        for (const rule of sum) {
          // The rule is a full rule, not a shorten one
          if (everyRules.includes(rule)) {
            subCat.push(rule)
          } else {
            subCat.push(
              utils.disambiguateReference(parsedRules || {}, currentValue, rule)
            )
          }
        }
        return [...accumulator, ...subCat]
      },
      [] as DottedName[]
    )
  }, [categories, safeGetRule, everyRules, parsedRules])

  return { categories, subcategories }
}