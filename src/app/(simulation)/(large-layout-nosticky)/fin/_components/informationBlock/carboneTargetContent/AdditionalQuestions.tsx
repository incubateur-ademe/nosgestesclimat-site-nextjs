import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type Props = {
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
          <div className="my-2 ml-3.5">{answer}</div>
        </details>
      ))}
    </div>
  )
}
