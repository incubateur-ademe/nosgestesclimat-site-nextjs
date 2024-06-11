'use client'

import { utils } from 'publicodes'
import { useContext, useMemo } from 'react'
import { SimulationContext } from '../../providers/simulationProvider/context'
import { DottedName, NGCEvaluatedNode, NGCRuleNode } from '../../types'
import useCurrentSimulation from '../useCurrentSimulation'
import useChoices from './useChoices'
import useContent from './useContent'
import useMissing from './useMissing'
import useNotifications from './useNotifications'
import useSetValue from './useSetValue'
import useType from './useType'
import useValue from './useValue'

/**
 * A hook to get and set every information about a specific rule
 *
 * It should ALWAYS be used to access a rule (unless we need to compare mutliples rules with useEngine)
 */
export default function useRule(dottedName: DottedName) {
  const {
    engine,
    safeGetRule,
    safeEvaluate,
    everyNotifications,
    everyMosaicChildrenWithParent,
    addToEngineSituation,
  } = useContext(SimulationContext)

  const { situation, foldedSteps, updateCurrentSimulation } =
    useCurrentSimulation()

  const evaluation = useMemo<NGCEvaluatedNode | null>(
    () => safeEvaluate(dottedName),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dottedName, engine, situation]
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

  const questionsOfMosaic = everyMosaicChildrenWithParent[dottedName] || []

  const parent = utils.ruleParent(dottedName)

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
    questionsOfMosaic,
    situation,
    foldedSteps,
  })

  const { value, displayValue, numericValue } = useValue({
    evaluation,
    type,
  })

  const { setValue, setDefaultAsValue } = useSetValue({
    dottedName,
    safeGetRule,
    safeEvaluate,
    evaluation,
    value,
    type,
    questionsOfMosaic,
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
     * A list of questions to display inside the mosaic (if the rule is a mosaic)
     */
    questionsOfMosaic,
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
     * Set default value as value, with the possibility to add a dottedName in the foldedSteps and the mosaic parent
     */
    setDefaultAsValue,
    /**
     * A list of actions linked to the rules (only used by "ui . pédagogie" rules)
     */
    actions,
  }
}
