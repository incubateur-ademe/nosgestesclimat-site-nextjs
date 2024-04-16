import Question from '@/components/form/Question'
import Button from '@/design-system/inputs/Button'
import { useState } from 'react'
import PencilIcon from '../icons/PencilIcon'
import JourneysInput from './voiture/JourneysInput'

type Props = {
  question: string
}
export default function Voiture({ question, ...props }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Question question={question} {...props} />
      <div className="mb-4 flex flex-col items-end">
        <Button
          color="secondary"
          size="sm"
          onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
          className="mb-2">
          {isOpen ? (
            <NGCTrans>Fermer</NGCTrans>
          ) : (
            <span className="flex items-center">
              <PencilIcon className="mr-2 stroke-primary-700" width="16" />

              <NGCTrans>Détailler mes trajets</NGCTrans>
            </span>
          )}
        </Button>
        {isOpen ? <JourneysInput question={question} {...props} /> : null}
      </div>
    </>
  )
}
