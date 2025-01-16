import type { DottedName, NGCRuleNode } from '@abc-transitionbascarbone/near-modele'
import type { EvaluatedNode } from 'publicodes'

type Props = {
  dottedName: DottedName
  rule: NGCRuleNode | null | any // Model shenanigans: question alimentation . local . consommation is missing "formule"
  evaluation: EvaluatedNode | null
}

const booleanSecureTypes = ['présent', 'propriétaire']

export default function getType({
  dottedName,
  rule,
  evaluation,
}: Props):
  | 'notQuestion'
  | 'mosaic'
  | 'choices'
  | 'boolean'
  | 'number'
  | undefined {
  if (!rule || !evaluation) return undefined

  if (!rule.rawNode.question) {
    return 'notQuestion'
  }

  if (rule.rawNode.mosaique) {
    return 'mosaic'
  }

  if (
    (rule.rawNode['unité'] === undefined &&
      typeof evaluation.nodeValue !== 'number') ||
    booleanSecureTypes.some((key) => dottedName.includes(key))
  ) {
    const unePossibilite: any = rule.rawNode.formule
      ? rule.rawNode.formule['une possibilité']
      : rule.rawNode['une possibilité']
    if (unePossibilite) {
      return 'choices'
    } else {
      return 'boolean'
    }
  }

  return 'number'
}
