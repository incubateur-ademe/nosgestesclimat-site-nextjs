'use client'

import Question from '@/components/form/Question'
import { useCurrentSimulation, useEngine, useRule } from '@/publicodes-state'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useEffect, useState } from 'react'

type Props = { question: DottedName }

export default function Ameublement({ question }: Props) {
  const [areHiddenMosaicsUpdated, setAreHiddenMosaicsUpdated] = useState(false)
  const { getValue } = useEngine()
  const { updateCurrentSimulation } = useCurrentSimulation()

  const { questionsOfMosaicFromParent: questionsOfMosaicFromParentMeubles } =
    useRule('divers . ameublement . meubles')

  const {
    questionsOfMosaicFromParent: questionsOfMosaicFromParentElectromenager,
  } = useRule('divers . électroménager . appareils')

  useEffect(() => {
    if (!areHiddenMosaicsUpdated) {
      // Mosaique meubles
      questionsOfMosaicFromParentMeubles.forEach((question) => {
        updateCurrentSimulation({
          foldedStepToAdd: {
            foldedStep: question,
            value: getValue(question),
            isMosaicChild: true,
          },
        })
      })
      // Mosaique appareils électroménagers
      questionsOfMosaicFromParentElectromenager.forEach((question) => {
        updateCurrentSimulation({
          foldedStepToAdd: {
            foldedStep: question,
            value: getValue(question),
            isMosaicChild: true,
          },
        })
      })
      setAreHiddenMosaicsUpdated(true)
    }
  }, [
    areHiddenMosaicsUpdated,
    questionsOfMosaicFromParentMeubles,
    questionsOfMosaicFromParentElectromenager,
    updateCurrentSimulation,
    getValue,
  ])

  return <Question question={question} />
}
