'use client'

import { useDebug } from '@/hooks/useDebug'
import { twMerge } from 'tailwind-merge'
import Form from './simulateur/Form'
import Summary from './simulateur/Summary'

type Props = {
  toggleQuestionList: () => void
  isQuestionListOpen: boolean
}
export default function Simulateur({
  toggleQuestionList,
  isQuestionListOpen,
}: Props) {
  const isDebug = useDebug()

  return (
    <div className="flex flex-1 flex-col pb-16 pt-16 md:pt-20">
      <div
        className={twMerge(
          'flex flex-1 flex-col',
          isQuestionListOpen && !isDebug ? 'hidden' : 'flex'
        )}>
        <Form />
      </div>
      <Summary
        toggleQuestionList={toggleQuestionList}
        isQuestionListOpen={isQuestionListOpen}
      />
    </div>
  )
}
