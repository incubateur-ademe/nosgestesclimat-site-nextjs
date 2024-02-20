import getSomme from '@/publicodes-state/helpers/getSomme'
import { DottedName, NGCRuleNode } from '@/publicodes-state/types'

export function getRuleSumRules(rule: NGCRuleNode): DottedName[] | undefined {
  const somme = getSomme(rule.rawNode)

  if (!somme) {
    return undefined
  }

  return somme.map((name: string) => `${rule.dottedName} . ${name}`)
}
