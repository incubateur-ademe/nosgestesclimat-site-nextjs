import Question from '@/components/form/Question'
import Button from '@/design-system/inputs/Button'
import { useState } from 'react'
import PencilIcon from '../icons/PencilIcon'
import ThreeYearsInput from './avion/ThreeYearsInput'

type Props = {
  question: string
}
export default function Avion({ question, ...props }: Props) {
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
            <>
              <PencilIcon className="mr-2 stroke-primary-700" width="16" />
              <NGCTrans>Répondre sur les 3 dernières années</NGCTrans>
            </>
          )}
        </Button>
        {isOpen ? <ThreeYearsInput question={question} {...props} /> : null}
      </div>
    </>
  )
}
