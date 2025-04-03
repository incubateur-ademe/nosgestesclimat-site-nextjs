'use client'

import Question from '@/components/form/Question'
import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/inputs/Button'
import { useRule } from '@/publicodes-state'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import PencilIcon from '../icons/PencilIcon'

type Props = { question: DottedName }
export default function Textile({ question, ...props }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const { numericValue: totalPiecesTextile } = useRule(
    'divers . textile . nombre total'
  )
  const { setValue: setPreciseChoice } = useRule(
    'divers . textile . choix précis'
  )
  const { setValue } = useRule(question)

  useEffect(() => {
    if (isOpen && totalPiecesTextile > 0) {
      setPreciseChoice('oui')
      if (totalPiecesTextile <= 15) {
        setValue('minimum')
      }
      if (totalPiecesTextile > 15 && totalPiecesTextile <= 35) {
        setValue('renouvellement occasionnel')
      }
      if (totalPiecesTextile > 35) {
        setValue('accro au shopping')
      }
    } else {
      setPreciseChoice('non')
    }

    return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, totalPiecesTextile])

  return (
    <>
      <Question
        question={question}
        className={twMerge('mb-4', isOpen && 'pointer-events-none opacity-20')}
        {...props}
      />
      <div className="mb-4 flex flex-col items-start">
        <Button
          color="link"
          size="xs"
          onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
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

              <Trans>Détailler ma garde-robe</Trans>
            </span>
          )}
        </Button>
        {isOpen ? (
          <div className="p-4">
            <Question
              question={'divers . textile . empreinte précise'}
              {...props}
            />
          </div>
        ) : null}
      </div>
    </>
  )
}
