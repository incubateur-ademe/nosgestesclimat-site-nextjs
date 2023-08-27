'use client'

import { useContext, useMemo } from 'react'

import sumulationContext from '../simulationProvider/context'
import useChoices from './useChoices'
import useContent from './useContent'
import useMosaic from './useMosaic'
import useType from './useType'
import useValue from './useValue'

export default function useRule(dottedName: string) {
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
  const rule = useMemo(() => safeGetRule(dottedName), [dottedName, engine])

  if (!rule.rawNode) {
    return {
      setValue: () => null,
      setDefaultAsValue: () => null,
    }
  }
  const { type, getType } = useType({
    dottedName,
    rule,
    evaluation,
  })

  const { childrenOfMosaic, questionsOfMosaic } = useMosaic({
    engine,
    dottedName,
    rule,
    type,
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
    suggestions,
  } = useContent({
    dottedName,
    rule,
    everyMosaicChildWhoIsReallyInMosaic,
  })

  const choices = useChoices({ dottedName, rule, type })

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
    suggestions,
    choices,
    childrenOfMosaic,
    questionsOfMosaic,
    value,
    displayValue,
    isMissing,
    setValue,
    setDefaultAsValue,
  }
}
