import { NGCRule } from '@incubateur-ademe/nosgestesclimat'

/**
 * We use this hook to get the content of the [somme] of a rule.
 *
 * This is needed because in optimized rules, the syntaxic-sugar mechanism
 * [formule] is unfolded (i.e. replaced by its content). The [somme] is then
 * at the root of the rule and not in a [formule] mechanism (both syntaxes are valid).
 */
export default function getSomme(rawNode?: NGCRule): string[] | undefined {
  return rawNode && 'formule' in rawNode
    ? rawNode.formule?.somme
    : rawNode?.somme
}
