import { DottedName, NGCEvaluatedNode, NGCRuleNode } from '../types'

type Props = {
  dottedName: DottedName
  rule: NGCRuleNode | null | any // Model shenanigans: question alimentation . local . consommation is missing "formule"
  evaluation: NGCEvaluatedNode | null
}
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
  if (!rule || !evaluation) return

  if (!rule.rawNode.question) {
    return 'notQuestion'
  }

  if (rule.rawNode.mosaique) {
    return 'mosaic'
  }

  if (
    (rule.rawNode['unité'] === undefined &&
      typeof evaluation.nodeValue !== 'number') ||
    dottedName.includes('présent') ||
    dottedName.includes('propriétaire')
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
