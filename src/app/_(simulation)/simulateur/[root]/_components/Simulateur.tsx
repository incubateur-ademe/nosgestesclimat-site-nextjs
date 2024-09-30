'use client'

import { useDebug } from '@/hooks/useDebug'
import { twMerge } from 'tailwind-merge'
import SimulateurSkeleton from '../skeleton'
import Form from './simulateur/Form'
import Summary from './simulateur/Summary'

export default function Simulateur({
  toggleQuestionList,
  isQuestionListOpen,
  isLoading,
}: {
  toggleQuestionList: () => void
  isQuestionListOpen: boolean
  isLoading?: boolean
}) {
  const isDebug = useDebug()

  if (isLoading) {
    return <SimulateurSkeleton />
  }

  return (
    <div className="flex flex-1 flex-col pb-16 pt-16 md:pt-20">
      {isQuestionListOpen && (
        <Summary
          toggleQuestionList={toggleQuestionList}
          isQuestionListOpen={isQuestionListOpen}
        />
      )}
      <div
        className={twMerge(
          'flex flex-1 flex-col pt-6',
          isQuestionListOpen && !isDebug ? 'hidden' : 'flex'
        )}>
        <Form />
      </div>
    </div>
  )
}
