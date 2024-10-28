import Background from '@/app/_components/organisations/Background'
import Separator from '@/design-system/layout/Separator'
import { ReactNode } from 'react'
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
    <div className="relative my-16 w-full py-24">
      <Background direction="left" className="bg-[#F6F6F5]" withColorLine />

      <div className="relative mx-auto flex w-full max-w-full flex-col gap-16 px-8 md:max-w-5xl md:flex-row md:px-0">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl md:text-3xl">FAQ</h2>
          <Separator className="my-0" />
          <p className="text-xl font-bold">{subTitle}</p>
        </div>

        <div className="flex flex-col gap-4 md:max-w-[700px]">
          {questions.map(({ question, answer }, index) => (
            <details key={`question-${index}`} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg bg-white p-4">
                <p className="mb-0 text-lg font-bold">{question}</p>

                <PlusIcon className="h-6 w-6" />
              </summary>

              <p className="mt-8 px-4">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
