'use client'

import Question from '@/components/form/Question'
import Trans from '@/components/translation/trans/TransClient'
import { captureSubQuestion } from '@/constants/tracking/posthogTrackers'
import { openSubQuestion } from '@/constants/tracking/question'
import Button from '@/design-system/buttons/Button'
import Card from '@/design-system/layout/Card'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useState } from 'react'
import PencilIcon from '../icons/PencilIcon'

type Props = { question: DottedName }

export default function Ameublement({ question }: Props) {
  const [fakeDoorPreciseChoice, setFakeDoorPreciseChoice] = useState(false)
  return (
    <>
      <Question question={question} />
      <div className="flex flex-col items-start text-sm md:flex-row md:items-center">
        <span>
          <Trans>Pour plus de précision:</Trans>
        </span>
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
              <Trans>Fermer</Trans>
            ) : (
              <span className="flex items-center">
                <PencilIcon
                  className="stroke-primary-700 mr-2"
                  width="16"
                  height="16"
                />

                <Trans>
                  Je détaille mes meubles et appareils électroménagers
                </Trans>
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
            <Trans>
              Cette fonctionnalité est actuellement en cours de conception.
              Merci pour votre intérêt !
            </Trans>
          </Card>
        </div>
      ) : null}
    </>
  )
}
