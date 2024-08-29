'use client'

import ContentLarge from '@/components/layout/ContentLarge'
import Title from '@/design-system/layout/Title'
import { useDebug } from '@/hooks/useDebug'
import { useForm } from '@/publicodes-state'
import Question from './summary/Question'

type Props = {
  toggleQuestionList: () => void
  isQuestionListOpen: boolean
}
export default function Summary({
  toggleQuestionList,
  isQuestionListOpen,
}: Props) {
  const isDebug = useDebug()

  const { relevantQuestions } = useForm()

  return (
    <div className={isQuestionListOpen || isDebug ? 'block' : 'hidden'}>
      <ContentLarge>
        <Title tag="h2" className="mb-4 text-lg md:text-xl">
          Toutes les questions
        </Title>
        {relevantQuestions.map((question: any, index: number) => (
          <Question
            key={question}
            question={question}
            toggleQuestionList={toggleQuestionList}
            index={index}
          />
        ))}
      </ContentLarge>
    </div>
  )
}
