'use client'

import Question from '@/components/form/Question'
import Trans from '@/components/translation/trans/TransClient'
import { openSubQuestion } from '@/constants/tracking/question'
import Button from '@/design-system/buttons/Button'
import { trackEvent } from '@/utils/analytics/trackEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useState } from 'react'
import PencilIcon from '../icons/PencilIcon'
import JourneysInput from './voiture/JourneysInput'

type Props = { question: DottedName }
export default function Voiture({ question, ...props }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Question question={question} className="mb-4" {...props} />
      <div className="mb-4 flex flex-col items-start">
        <Button
          color="link"
          size="xs"
          onClick={() => {
            trackEvent(openSubQuestion({ question }))
            setIsOpen((prevIsOpen) => !prevIsOpen)
          }}
          className="mb-2">
          {isOpen ? (
            <Trans>Fermer</Trans>
          ) : (
            <span className="flex items-center">
              <PencilIcon
                className="stroke-primary-700 mr-2"
                width="16"
                height="16"
              />

              <Trans>Détailler mes trajets</Trans>
            </span>
          )}
        </Button>
        {isOpen ? <JourneysInput question={question} {...props} /> : null}
      </div>
    </>
  )
}
