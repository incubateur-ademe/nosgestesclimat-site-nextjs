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
    everyMosaicChildWhoIsReallyInMosaic,
    situation,
    updateSituation,
  }: any = useContext(sumulationContext)

  const evaluation = useMemo(
    () => safeEvaluate(dottedName),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dottedName, engine, situation]
  )
  const rule = useMemo(() => safeGetRule(dottedName), [dottedName, safeGetRule])

  const { type, getType } = useType({
    dottedName,
    rule,
    evaluation,
  })

  const { questionsOfMosaic, shouldDisplayAucun } = useMosaic({
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
    isInactive,
    suggestions,
    choices,
    questionsOfMosaic,
    shouldDisplayAucun,
    value,
    displayValue,
    isMissing,
    setValue,
    setDefaultAsValue,
  }
}
