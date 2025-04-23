'use client'

import Question from '@/components/form/Question'
import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useState } from 'react'
import PencilIcon from '../icons/PencilIcon'
import ThreeYearsInput from './avion/ThreeYearsInput'

type Props = { question: DottedName }
export default function Avion({ question, ...props }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Question question={question} className="mb-4" {...props} />
      <div className="mb-4 flex flex-col items-start">
        <Button
          color="link"
          size="xs"
          onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
          className="mb-2">
          {isOpen ? (
            <Trans>Fermer</Trans>
          ) : (
            <>
              <PencilIcon className="stroke-primary-700 mr-2" width="16" />
              <Trans>Répondre sur les 3 dernières années</Trans>
            </>
          )}
        </Button>
        {isOpen ? <ThreeYearsInput question={question} {...props} /> : null}
      </div>
    </>
  )
}
