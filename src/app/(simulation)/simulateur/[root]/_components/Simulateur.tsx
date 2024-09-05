'use client'

import ContentLarge from '@/components/layout/ContentLarge'
import { useDebug } from '@/hooks/useDebug'
import { twMerge } from 'tailwind-merge'
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

function SimulateurSkeleton() {
  return (
    <div className="flex flex-1 animate-pulse flex-col pb-4 pt-16 md:pt-20">
      <ContentLarge>
        <div className="flex flex-1 flex-col gap-16 pt-8 md:flex-row">
          <div className="flex flex-1 flex-col">
            <div className="mb-4 h-8 w-32 rounded bg-primary-200"></div>

            <div className="space-y-6">
              <div className="h-12 rounded bg-primary-200"></div>
              <div className="h-24 rounded bg-primary-200"></div>
            </div>
          </div>
          <div className="hidden lg:block lg:w-[20rem]">
            <div className="h-80 rounded bg-primary-200"></div>
          </div>
        </div>
        <div className="absolute bottom-0 mt-auto flex justify-start gap-4 pb-4">
          <div className="h-10 w-32 rounded bg-primary-200"></div>
          <div className="h-10 w-32 rounded bg-primary-200"></div>
        </div>
      </ContentLarge>
    </div>
  )
}
