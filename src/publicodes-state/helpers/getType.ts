import {
  NGCEvaluatedNode,
  NGCQuestionType,
  NGCRuleNode,
  RuleName,
} from '../types'

type Props = {
  dottedName: RuleName
  // Model shenanigans: question alimentation . local . consommation is missing "formule"
  // NOTE(@EmileRolley): I don't get why it's a problem?
  rule: NGCRuleNode | null | any
  evaluation: NGCEvaluatedNode | null
}

export default function getType({
  dottedName,
  rule,
  evaluation,
}: Props): NGCQuestionType | undefined {
  if (!rule || !evaluation) {
    return undefined
  }

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
