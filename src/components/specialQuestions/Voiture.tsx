import Question from '@/components/form/Question'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useState } from 'react'
import PencilIcon from '../icons/PencilIcon'
import JourneysInput from './voiture/JourneysInput'

type Props = {
  question: DottedName
}
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
            <Trans locale={locale}>Fermer</Trans>
          ) : (
            <span className="flex items-center">
              <PencilIcon
                className="stroke-primary-700 mr-2"
                width="16"
                height="16"
              />

              <Trans locale={locale}>Détailler mes trajets</Trans>
            </span>
          )}
        </Button>
        {isOpen ? <JourneysInput question={question} {...props} /> : null}
      </div>
    </>
  )
}
