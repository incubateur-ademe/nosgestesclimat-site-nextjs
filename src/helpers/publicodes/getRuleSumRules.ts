import getSomme from '@/publicodes-state/helpers/getSomme'
import { DottedName, NGCRuleNode } from '@incubateur-ademe/nosgestesclimat'

export function getRuleSumRules(rule: NGCRuleNode): DottedName[] | undefined {
  const somme = getSomme(rule.rawNode)

  if (!somme) {
    return undefined
  }

  // TODO : use `utils.disambiguateReference` here
  return somme.map((name) => `${rule.dottedName} . ${name}`) as DottedName[]
}
