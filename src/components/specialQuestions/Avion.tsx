'use client'

import Question from '@/components/form/Question'
import TransClient from '@/components/translation/trans/TransClient'
import Button from '@/design-system/inputs/Button'
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
            <TransClient>Fermer</TransClient>
          ) : (
            <>
              <PencilIcon className="mr-2 stroke-primary-700" width="16" />
              <TransClient>Répondre sur les 3 dernières années</TransClient>
            </>
          )}
        </Button>
        {isOpen ? <ThreeYearsInput question={question} {...props} /> : null}
      </div>
    </>
  )
}
