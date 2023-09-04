'use client'

import { useContext, useMemo } from 'react'
import sumulationContext from '../simulationProvider/context'
import useChoices from './useChoices'
import useContent from './useContent'
import useMosaic from './useMosaic'
import useType from './useType'
import useValue from './useValue'

export default function useRule(dottedName = '') {
  const {
    engine,
    safeGetRule,
    safeEvaluate,
    situation,
    updateSituation,
    everyMosaicChildWhoIsReallyInMosaic,
  }: any = useContext(sumulationContext)

  const evaluation = useMemo(
    () => safeEvaluate(dottedName),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dottedName, engine, situation]
  )
  const rule = useMemo(() => safeGetRule(dottedName), [dottedName, safeGetRule])

  if (!rule.rawNode) {
    console.log(dottedName)
  }
  const { type, getType } = useType({
    dottedName,
    rule,
    evaluation,
  })

  const { questionsOfMosaic, shouldDisplayAucun, parent } = useMosaic({
    dottedName,
    rule,
    everyMosaicChildWhoIsReallyInMosaic,
  })

  const {
    category,
    title,
    label,
    description,
    icons,
    unit,
    color,
    assistance,
    isInactive,
    suggestions,
  } = useContent({
    dottedName,
    rule,
    everyMosaicChildWhoIsReallyInMosaic,
  })

  const choices = useChoices({ rule, type })

  const { value, displayValue, isMissing, setValue, setDefaultAsValue } =
    useValue({
      dottedName,
      safeGetRule,
      safeEvaluate,
      evaluation,
      type,
      getType,
      questionsOfMosaic,
      updateSituation,
    })

  return {
    type,
    category,
    title,
    label,
    description,
    icons,
    unit,
    color,
    assistance,
    isInactive,
    suggestions,
    choices,
    questionsOfMosaic,
    parent,
    shouldDisplayAucun,
    value,
    displayValue,
    isMissing,
    setValue,
    setDefaultAsValue,
  }
}
