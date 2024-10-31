import Separator from '@/design-system/layout/Separator'
import type { ReactNode } from 'react'
import PlusIcon from '../icons/PlusIcon'
import Background from './Background'

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
    <div className="relative mb-16 w-full py-28">
      <Background direction="left" className="bg-[#F6F6F5]" withColorLine />

      <div className="relative mx-auto flex w-full max-w-full flex-col gap-8 px-4 md:max-w-5xl md:flex-row md:gap-16 md:px-0">
        <div className="flex flex-col gap-4 text-center md:w-[240px] md:max-w-[240px] md:text-left">
          <h2 className="mb-0 text-2xl md:mb-8 md:text-3xl">FAQ</h2>
          <Separator className="mx-auto my-0 md:mx-0" />
          <p className="text-sm font-bold md:text-xl">{subTitle}</p>
        </div>

        <ul className="flex flex-1 flex-col gap-4">
          {questions.map(({ question, answer }, index) => (
            <li key={`question-${index}`}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-lg bg-white p-4">
                  <p className="mb-0 text-sm font-bold md:text-base">
                    {question}
                  </p>

                  <PlusIcon className="block h-4 min-w-4" />
                </summary>

                <div className="mt-8 px-4 text-sm md:text-base">{answer}</div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
