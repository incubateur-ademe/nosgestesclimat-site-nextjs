import Background from '@/app/_components/organisations/Background'
import Separator from '@/design-system/layout/Separator'
import type { ReactNode } from 'react'
import PlusIcon from '../icons/PlusIcon'

export default function FAQ({
  subTitle,
  questions,
}: {
  subTitle: ReactNode
  questions: {
    question: ReactNode
    answer: ReactNode
  }[]
}) {
  return (
    <div className="relative mb-16 w-full bg-[#F6F6F5] py-20">
      <Background
        direction="left"
        className="mt-6 bg-[#F6F6F5]"
        withColorLine
      />

      <div className="relative mx-auto flex w-full max-w-full flex-col gap-8 px-4 md:max-w-5xl md:flex-row md:gap-16 md:px-0">
        <div className="flex flex-col gap-4 text-center md:w-[240px] md:max-w-[240px] md:text-left">
          <h2 className="mb-0 text-2xl md:text-3xl">FAQ</h2>
          <Separator className="mx-auto my-0 md:mx-0" />
          <p className="text-sm font-bold md:text-xl">{subTitle}</p>
        </div>

        <ul className="flex flex-1 flex-col gap-3">
          {questions.map(({ question, answer }, index) => (
            <li key={`question-${index}`}>
              <details className="group rounded-lg bg-white px-4 py-4 transition-all duration-200">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2">
                  <p className="mb-0 text-sm font-bold md:text-base">
                    {question}
                  </p>

                  <PlusIcon className="inline-block h-8 w-8 origin-center transform transition-transform duration-300 group-open:rotate-45 group-open:fill-primary-700" />
                </summary>

                <div className="grid grid-rows-[0fr] transition-all duration-200 group-open:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <div className="pt-4 text-sm last:mb-0 md:text-base">
                      {answer}
                    </div>
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
