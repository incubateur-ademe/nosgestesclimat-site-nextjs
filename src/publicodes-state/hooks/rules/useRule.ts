'use client'

import { carboneMetric } from '@/constants/metric'
import { utils } from 'publicodes'
import { useContext, useMemo } from 'react'
import { SimulationContext } from '../../providers/simulationProvider/context'
import { DottedName, Metric, NGCEvaluatedNode, NGCRuleNode } from '../../types'
import useCurrentSimulation from '../simulation/useCurrentSimulation'
import useChoices from './useRule/useChoices'
import useContent from './useRule/useContent'
import useMissing from './useRule/useMissing'
import useNotifications from './useRule/useNotifications'
import useQuestionsOfMosaic from './useRule/useQuestionsOfMosaic'
import useSetValue from './useRule/useSetValue'
import useType from './useRule/useType'
import useValue from './useRule/useValue'

/**
 * A hook to get and set every information about a specific rule
 *
 * It should ALWAYS be used to access a rule (unless we need to compare mutliples rules with useEngine)
 */
export default function useRule(
  dottedName: DottedName,
  metric: Metric = carboneMetric
) {
  const {
    engine,
    safeGetRule,
    safeEvaluate,
    parsedRules,
    everyNotifications,
    everyMosaicChildrenWithParent,
    addToEngineSituation,
  } = useContext(SimulationContext)

  const { situation, foldedSteps, updateCurrentSimulation } =
    useCurrentSimulation()

  const evaluation = useMemo<NGCEvaluatedNode | null>(
    () => safeEvaluate(dottedName, metric),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dottedName, engine, situation, metric]
  )

  const rule = useMemo<NGCRuleNode | null>(
    () => safeGetRule(dottedName),
    [dottedName, safeGetRule]
  )

  const { type } = useType({
    dottedName,
    rule,
    evaluation,
  })

  const { notifications, activeNotifications } = useNotifications({
    dottedName,
    everyNotifications,
    safeEvaluate,
    situation,
  })

  const { questionsOfMosaicFromParent, questionsOfMosaicFromSibling } =
    useQuestionsOfMosaic({
      everyMosaicChildrenWithParent,
      dottedName,
    })

  const parent = useMemo(() => utils.ruleParent(dottedName), [dottedName])

  const {
    category,
    title,
    abbreviatedTitle,
    label,
    description,
    icons,
    unit,
    assistance,
    plancher,
    warning,
    isInactive,
    suggestions,
    excerpt,
    actions,
  } = useContent({
    dottedName,
    rule,
  })

  const choices = useChoices({ rule, type })

  const { isMissing, isFolded } = useMissing({
    dottedName,
    questionsOfMosaicFromParent,
    situation,
    foldedSteps,
  })

  const { value, displayValue, numericValue } = useValue({
    evaluation,
    type,
  })

  const { setValue } = useSetValue({
    dottedName,
    parsedRules,
    safeGetRule,
    safeEvaluate,
    evaluation,
    type,
    updateCurrentSimulation,
    situation,
    addToEngineSituation,
  })

  return {
    /**
     * The type of the question (set to "notQuestion" if not a question)
     */
    type,
    /**
     * The parent category of the rule
     */
    category,
    /**
     * The title of the rule ("title" in Publicodes)
     */
    title,
    /**
     * The abbreviated title of the rule ("rawNode.abréviation" in Publicodes)
     */
    abbreviatedTitle,
    /**
     * The label of the rule ("rawNode.question" in Publicodes)
     */
    label,
    /**
     * The description of the rule ("rawNode.description" in Publicodes)
     */
    description,
    /**
     * The icons of the rule ("rawNode.icônes" in Publicodes)
     */
    icons,
    /**
     * The unit of the rule ("rawNode.unité" in Publicodes)
     */
    unit,
    /**
     * The question used to help answer  ("rawNode.aide" in Publicodes)
     */
    assistance,
    /**
     * The minimum value
     */
    plancher,
    /**
     * A specific message to display if the value is under plancher
     */
    warning,
    /**
     * Attribut use to briefly explain a rule
     */
    excerpt,
    /**
     * True if the rule is not yet active ("rawNode.inactif" in Publicodes)
     */
    isInactive,
    /**
     * A list of suggestions to display as {label: value}
     */
    suggestions,
    /**
     * A list of choices to display as partial dottedNames
     */
    choices,
    /**
     * A list of notifications associated with the question
     */
    notifications,
    /**
     * A list of active (that should be displayed) notifications associated with the rule
     */
    activeNotifications,
    /**
     * A list of questions to display inside the mosaic (if the rule is a mosaic parent)
     */
    questionsOfMosaicFromParent,
    /**
     * A list of questions to display inside the mosaic (if the rule is a mosaic child)
     */
    questionsOfMosaicFromSibling,
    /**
     * The direct parent of the rule
     */
    parent,
    /**
     * The value of the rule ("nodeValue" in Publicodes)
     */
    value,
    /**
     * The value formated as string (true => oui) or number,  without the unit
     */
    displayValue,
    /**
     * The value as a number (0 if the value is not a number)
     */
    numericValue,
    /**
     * True if the question is not answered
     */
    isMissing,
    /**
     * True if the question is in the folded steps (answered or not)
     */
    isFolded,
    /**
     * Setter for the value of the rule, with the possibility to add a dottedName in the foldedSteps
     */
    setValue,
    /**
     * A list of actions linked to the rules (only used by "ui . pédagogie" rules)
     */
    actions,
  }
}