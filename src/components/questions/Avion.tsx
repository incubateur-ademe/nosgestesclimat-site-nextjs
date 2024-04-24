import Question from '@/components/form/Question'
import Trans from '@/components/translation/Trans'
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
          color="link"
          size="xs"
          onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
          className="mb-2">
          {isOpen ? (
            <Trans>Fermer</Trans>
          ) : (
            <>
              <PencilIcon className="mr-2 stroke-primary-700" width="16" />
              <Trans>Répondre sur les 3 dernières années</Trans>
            </>
          )}
        </Button>
        {isOpen ? <ThreeYearsInput question={question} {...props} /> : null}
      </div>
    </>
  )
}
