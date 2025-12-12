import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'

interface Props {
  questions: {
    slug: string
    question: React.ReactNode
    answer: React.ReactNode
  }[]
  setIsQuestionOpen: Dispatch<SetStateAction<boolean>>
}

export default function AdditionalQuestions({
  questions,
  setIsQuestionOpen,
}: Props) {
  const [questionsOpen, setQuestionsOpen] = useState<string[]>([])

  useEffect(() => {
    setIsQuestionOpen(questionsOpen.length !== 0)
  }, [questionsOpen, setIsQuestionOpen])

  return (
    <div>
      {questions.map(({ slug, question, answer }) => (
        <details
          key={slug}
          onToggle={(e: React.SyntheticEvent<HTMLDetailsElement>) => {
            setQuestionsOpen((prevQuestionsOpen) => {
              if ((e.target as HTMLDetailsElement).open) {
                return [
                  ...prevQuestionsOpen.filter((question) => question !== slug),
                  slug,
                ]
              }
              return prevQuestionsOpen.filter((question) => question !== slug)
            })
          }}>
          <summary
            className="text-primary-700 mb-2 cursor-pointer"
            role="button"
            tabIndex={0}
            aria-expanded="false"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                const details = e.currentTarget
                  .parentElement as HTMLDetailsElement
                details.open = !details.open
              }
            }}>
            {question}
            <span className="sr-only">Cliquez pour afficher la réponse</span>
          </summary>
          <div className="my-2 ml-3.5">{answer}</div>
        </details>
      ))}
    </div>
  )
}
