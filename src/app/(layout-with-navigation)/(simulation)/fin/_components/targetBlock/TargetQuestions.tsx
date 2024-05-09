import Trans from '@/components/translation/Trans'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

const questions = [
  {
    slug: 'est-ce-que-je-peux-y-arriver-tout-seul',
    question: <Trans>Est-ce que je peux y arriver tout seul ?</Trans>,
    answer: <Trans>Blabla état / entreprises / citoyens'</Trans>,
  },
  {
    slug: '2-tonnes-ca-represente-quoi',
    question: <Trans>2 tonnes, ça représente quoi ?</Trans>,
    answer: <Trans>Infographie style ICO2</Trans>,
  },
  {
    slug: 'par-ou-commencer',
    question: <Trans>Par ou commencer ?</Trans>,
    answer: <Trans>Blablabla page Gestes</Trans>,
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
