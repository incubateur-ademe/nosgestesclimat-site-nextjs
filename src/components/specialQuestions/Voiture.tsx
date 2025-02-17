'use client'

import Question from '@/components/form/Question'
import TransClient from '@/components/translation/trans/TransClient'
import Button from '@/design-system/inputs/Button'
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
          onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
          className="mb-2">
          {isOpen ? (
            <TransClient>Fermer</TransClient>
          ) : (
            <span className="flex items-center">
              <PencilIcon
                className="mr-2 stroke-primary-700"
                width="16"
                height="16"
              />

              <TransClient>Détailler mes trajets</TransClient>
            </span>
          )}
        </Button>
        {isOpen ? <JourneysInput question={question} {...props} /> : null}
      </div>
    </>
  )
}
