import getSomme from '@/publicodes-state/helpers/getSomme'
import { NGCRuleNode } from '@/publicodes-state/types'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'

export function getRuleSumRules(rule: NGCRuleNode): DottedName[] | undefined {
  const somme = getSomme(rule.rawNode)

  if (!somme) {
    return undefined
  }

  return somme.map(
    (name) => `${rule.dottedName as DottedName} . ${name}`
  ) as DottedName[]
}
