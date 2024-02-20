import Question from '@/components/form/Question'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import { useState } from 'react'
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
            <Trans>Fermer</Trans>
          ) : (
            <Trans>📅 Répondre sur les 3 dernières années</Trans>
          )}
        </Button>
        {isOpen ? <ThreeYearsInput question={question} {...props} /> : null}
      </div>
    </>
  )
}
