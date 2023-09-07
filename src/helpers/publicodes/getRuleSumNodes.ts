import { NGCRuleNode, NGCRulesNodes } from '@/types/model'
import { RuleNode, utils } from 'publicodes'

export function getRuleSumNodes(
  rules: NGCRulesNodes,
  rule: NGCRuleNode
): string[] | undefined {
  const formula = rule.rawNode.formule

  if (!formula || !formula['somme']) {
    return undefined
  }

  return formula['somme']
    ?.map((name: string) => {
      try {
        const node = utils.disambiguateReference(
          rules as Record<string, RuleNode<string>>,
          rule.dottedName,
          name
        )
        return node
      } catch (e) {
        console.log(
          `One element of the sum is not a variable. It could be a raw number injected by the optimisation algorithm.`,
          e
        )
        return null
      }
    })
    .filter(Boolean)
}
