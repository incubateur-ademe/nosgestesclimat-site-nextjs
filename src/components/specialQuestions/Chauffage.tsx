import Question from '@/components/form/Question'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

export default function Chauffage({ question }: { question: DottedName }) {
  const secondaryQuestionsOfMosaic: DottedName[] = [
    'logement . chauffage . réseau de chaleur . présent',
    'logement . chauffage . bouteille gaz . présent',
    'logement . chauffage . fioul . présent',
    'logement . chauffage . citerne propane . présent',
  ]

  return (
    <>
      <Question
        question={question}
        secondaryQuestionsOfMosaic={secondaryQuestionsOfMosaic}
      />
    </>
  )
}
