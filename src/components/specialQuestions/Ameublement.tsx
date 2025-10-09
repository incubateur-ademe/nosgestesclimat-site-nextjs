'use client'

import Question from '@/components/form/Question'
import { captureSubQuestion } from '@/constants/tracking/posthogTrackers'
import { openSubQuestion } from '@/constants/tracking/question'
import Button from '@/design-system/buttons/Button'
import Card from '@/design-system/layout/Card'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation, useEngine, useRule } from '@/publicodes-state'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useEffect, useState } from 'react'
import PencilIcon from '../icons/PencilIcon'

type Props = { question: DottedName }

export default function Ameublement({ question }: Props) {
  const { t } = useClientTranslation()

  const [fakeDoorPreciseChoice, setFakeDoorPreciseChoice] = useState(false)
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

  return (
    <>
      <Question question={question} />
      <div className="flex flex-col items-start text-sm md:flex-row md:items-center">
        <span>{t('Pour plus de précision:')}</span>
        <div>
          <Button
            color="link"
            size="xs"
            onClick={() => {
              trackEvent(openSubQuestion({ question }))
              trackPosthogEvent(
                captureSubQuestion({
                  question,
                  state: fakeDoorPreciseChoice ? 'closed' : 'opened',
                })
              )
              setFakeDoorPreciseChoice(fakeDoorPreciseChoice ? false : true)
            }}
            className="mt-1 md:mt-0 md:ml-2">
            {fakeDoorPreciseChoice ? (
              t('Fermer')
            ) : (
              <span className="flex items-center">
                <PencilIcon
                  className="stroke-primary-700 mr-2"
                  width="16"
                  height="16"
                />
                {t(
                  'simulator.customQuestions.ameublement.open',
                  'Je détaille mes derniers achats'
                )}
              </span>
            )}
          </Button>
        </div>
      </div>
      {fakeDoorPreciseChoice ? (
        <div className="p-4">
          <Card
            className="items-start border-none bg-[#F4F5FB]"
            id={'fake-door-detail-ameublement'}>
            {t(
              'simulator.customQuestions.ameublement.inProgress',
              'Cette fonctionnalité est actuellement en cours de conception. Merci pour votre intérêt !'
            )}
          </Card>
        </div>
      ) : null}
    </>
  )
}
