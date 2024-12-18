import Separator from '@/design-system/layout/Separator'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import PlusIcon from '../icons/PlusIcon'
import Background from './Background'

export default function FAQ({
  subTitle,
  questions,
  isBackgroundSkewed = true,
  isBackgroundFullWidth = false,
  className,
  shouldUseDangerouslySetInnerHTML = false,
}: {
  className?: string
  subTitle: ReactNode
  questions: {
    question: ReactNode
    answer: ReactNode
  }[]
  isBackgroundSkewed?: boolean
  isBackgroundFullWidth?: boolean
  shouldUseDangerouslySetInnerHTML?: boolean
}) {
  return (
    <div
      className={twMerge(
        'relative w-full bg-[#F6F6F5] py-16 md:py-20',
        className
      )}>
      {isBackgroundSkewed && (
        <Background
          direction="left"
          className="-bottom-10 top-auto mt-6 h-[200px] rotate-12 bg-[#F6F6F5]"
          withColorLine
        />
      )}

      {isBackgroundFullWidth && (
        <div className="absolute -left-1/2 bottom-0 top-0 h-full w-[200%] bg-[#F6F6F5]" />
      )}

      <div className="relative mx-auto flex w-full max-w-full flex-col gap-8 px-4 md:max-w-5xl md:flex-row md:gap-16 md:px-0">
        <div className="flex flex-col gap-4 text-center md:w-[240px] md:max-w-[240px] md:text-left">
          <h2 className="mb-0 text-2xl md:text-3xl">FAQ</h2>
          <Separator className="mx-auto my-0 md:mx-0" />
          <p className="text-sm font-bold md:text-xl">{subTitle}</p>
        </div>

        <ul className="flex flex-1 list-none flex-col gap-3">
          {questions.map(({ question, answer }, index) => (
            <li key={`question-${index}`}>
              <details className="group rounded-lg bg-white px-4 py-4 transition-all duration-200">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden [&::marker]:hidden">
                  <h3 className="mb-0 text-[13px] font-bold md:text-base">
                    {question}
                  </h3>

                  <PlusIcon className="inline-block h-8 w-8 min-w-8 origin-center transform transition-transform duration-300 group-open:rotate-45 group-open:fill-primary-700" />
                </summary>

                <div className="grid grid-rows-[0fr] transition-all duration-200 ease-in-out group-open:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    {shouldUseDangerouslySetInnerHTML ? (
                      <div
                        className="pt-4 text-sm last:mb-0 md:text-base"
                        dangerouslySetInnerHTML={{
                          __html: answer as string,
                        }}
                      />
                    ) : (
                      <div className="pt-4 text-sm last:mb-0 md:text-base">
                        {answer}
                      </div>
                    )}
                  </div>
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
