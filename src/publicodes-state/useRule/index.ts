'use client'

import { useContext, useMemo } from 'react'

import sumulationContext from '../simulationProvider/context'
import useChoices from './useChoices'
import useValue from './useValue'
import useContent from './useContent'
import useType from './useType'
import useMosaic from './useMosaic'

export default function useRule(dottedName: string) {
  const {
    engine,
    everyMosaicChildWhoIsReallyInMosaic,
    situation,
    updateSituation,
  }: any = useContext(sumulationContext)

  const evaluation = useMemo(
    () => engine.evaluate(dottedName),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dottedName, engine, situation]
  )
  const rule = useMemo(() => engine.getRule(dottedName), [dottedName, engine])

  const { type, getType } = useType({
    dottedName,
    rule,
    evaluation,
  })

  const { questionsOfMosaic } = useMosaic({
    dottedName,
    type,
    everyMosaicChildWhoIsReallyInMosaic,
  })

  const { category, title, label, description, unit, suggestions } = useContent(
    {
      dottedName,
      rule,
      evaluation,
      everyMosaicChildWhoIsReallyInMosaic,
    }
  )

  const choices = useChoices({ rule, type })

  const { value, displayValue, isMissing, setValue, setDefaultAsValue } =
    useValue({
      dottedName,
      engine,
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
    unit,
    suggestions,
    choices,
    questionsOfMosaic,
    value,
    displayValue,
    isMissing,
    setValue,
    setDefaultAsValue,
  }
}
