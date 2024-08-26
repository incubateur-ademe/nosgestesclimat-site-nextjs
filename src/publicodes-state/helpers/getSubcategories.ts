import { DottedName, NGCRuleNode } from '@incubateur-ademe/nosgestesclimat'
import { utils } from 'publicodes'

export function getSubcategories({
  dottedName,
  getRule,
  parsedRules,
}: {
  dottedName: DottedName
  getRule: (dottedName: DottedName) => NGCRuleNode | null
  parsedRules: Record<string, NGCRuleNode>
}): DottedName[] | undefined {
  // TO FIX: The `somme` cannot be in a formula.
  const dottedNameFormula = getRule(dottedName)?.rawNode?.formule
  if (
    !dottedNameFormula ||
    typeof dottedNameFormula === 'string' ||
    !Array.isArray(dottedNameFormula.somme)
  ) {
    return []
  }

  return dottedNameFormula.somme.map((potentialPartialRuleName: DottedName) =>
    utils.disambiguateReference(
      parsedRules,
      dottedName,
      potentialPartialRuleName
    )
  )
}
