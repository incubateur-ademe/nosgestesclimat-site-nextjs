import { NGCRule } from '@/publicodes-state/types'

/**
 * We use this hook to get the content of the [somme] of a rule.
 *
 * This is needed because in optimized rules, the syntaxic-sugar mechanism
 * [formule] is unfolded.
 */
export default function getSomme(rawNode?: NGCRule): string[] | undefined {
  return rawNode && 'formule' in rawNode
    ? rawNode.formule?.somme
    : rawNode?.somme
}
