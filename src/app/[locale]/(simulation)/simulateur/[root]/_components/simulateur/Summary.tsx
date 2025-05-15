'use client'

import ContentLarge from '@/components/layout/ContentLarge'
import Trans from '@/components/translation/trans/TransClient'
import Title from '@/design-system/layout/Title'
import { useDebug } from '@/hooks/useDebug'
import { useFormState } from '@/publicodes-state'
import { twMerge } from 'tailwind-merge'
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

  const { relevantQuestions } = useFormState()

  return (
    <div
      className={twMerge(
        'my-8 px-4',
        isQuestionListOpen || isDebug ? 'block' : 'hidden'
      )}>
      <ContentLarge>
        <Title tag="h2" className="mb-4 text-lg md:text-xl">
          <Trans>Toutes les questions</Trans>
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
