'use client'

import Question from '@/components/form/Question'
import Button from '@/design-system/buttons/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useState } from 'react'
import PencilIcon from '../icons/PencilIcon'
import ThreeYearsInput from './avion/ThreeYearsInput'

type Props = { question: DottedName }
export default function Avion({ question, ...props }: Props) {
  const { t } = useClientTranslation()
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
            t('Fermer')
          ) : (
            <>
              <PencilIcon className="stroke-primary-700 mr-2" width="16" />
              {t(
                'simulator.customQuestions.avion.openThreeYears',
                'Répondre sur les 3 dernières années'
              )}
            </>
          )}
        </Button>
        {isOpen ? <ThreeYearsInput question={question} {...props} /> : null}
      </div>
    </>
  )
}
