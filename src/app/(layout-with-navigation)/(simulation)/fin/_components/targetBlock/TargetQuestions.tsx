import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

const questions = [
  {
    slug: 'est-ce-que-je-peux-y-arriver-tout-seul',
    question: <Trans>Est-ce que je peux y arriver tout seul ?</Trans>,
    answer: (
      <Trans>
        Il est quasiment impossible de vivre à moins de 2 tonnes dans notre
        société actuellement.{' '}
        <span className="text-secondary-700">
          L’État, le secteur privé et les citoyens
        </span>{' '}
        devront tous contribuer pour atteindre cet objectif.
      </Trans>
    ),
  },
  {
    slug: 'par-ou-commencer',
    question: <Trans>Par où commencer ?</Trans>,
    answer: (
      <Trans>
        Maintenant que vous avez fait votre bilan carbone et que vous avez pris
        conscience de votre empreinte, vous pouvez découvrir{' '}
        <Link href="/actions">l’ensemble des gestes</Link> qui vous permettront
        d’atteindre progressivement l’objectif de 2 tonnes.
      </Trans>
    ),
  },
]

type Props = {
  setIsQuestionOpen: Dispatch<SetStateAction<boolean>>
}

export default function TargetQuestions({ setIsQuestionOpen }: Props) {
  const [questionsOpen, setQuestionsOpen] = useState<string[]>([])

  useEffect(() => {
    if (questionsOpen.length === 0) {
      setIsQuestionOpen(false)
    } else {
      setIsQuestionOpen(true)
    }
  }, [questionsOpen, setIsQuestionOpen])

  return (
    <div>
      {questions.map(({ slug, question, answer }) => (
        <details
          key={slug}
          onToggle={(e: any) => {
            setQuestionsOpen((prevQuestionsOpen) => {
              if (e.target.open) {
                return [
                  ...prevQuestionsOpen.filter((question) => question !== slug),
                  slug,
                ]
              }
              return prevQuestionsOpen.filter((question) => question !== slug)
            })
          }}>
          <summary className="mb-2 cursor-pointer text-primary-700">
            {question}
          </summary>
          <div className="my-2 ml-3.5">
            <p>{answer}</p>
          </div>
        </details>
      ))}
    </div>
  )
}
