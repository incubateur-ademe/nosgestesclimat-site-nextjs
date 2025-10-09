import Question from '@/components/form/Question'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

export default function Chauffage({ question }: { question: DottedName }) {
  const secondaryQuestionsOfMosaic: DottedName[] = [
    'logement . chauffage . réseau de chaleur . présent',
    'logement . chauffage . bouteille gaz . présent',
    'logement . chauffage . fioul . présent',
    'logement . chauffage . citerne propane . présent',
    'logement . chauffage . chauffe eau solaire . présent',
    'logement . climatisation . présent',
    'logement . électricité . photovoltaique . présent',
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
