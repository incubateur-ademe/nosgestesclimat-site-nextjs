import Question from '@/components/form/Question'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import { useState } from 'react'
import JourneysInput from './voiture/JourneysInput'

type Props = {
  question: string
}
export default function Voture({ question }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Question question={question} />
      <div className="mb-4 flex flex-col items-end">
        <Button
          color="secondary"
          size="sm"
          onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
          className="mb-2">
          {isOpen ? (
            <Trans>Fermer</Trans>
          ) : (
            <>
              <Trans>Détailler mes trajets</Trans> 🚗
            </>
          )}
        </Button>
        {isOpen ? <JourneysInput question={question} /> : null}
      </div>
    </>
  )
}
