import { useState } from 'react'

import { useRule } from '@/publicodes-state'

type Props = {
  question: string
}

export default function Label({ question }: Props) {
  const { label, description } = useRule(question)

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="mb-3 text-xl font-semibold">
        {label}{' '}
        <button
          onClick={() => setIsOpen((previsOpen) => !previsOpen)}
          className="inline-block h-8 w-8 rounded-full border-none bg-primary text-base font-bold text-white">
          <code>i</code>
        </button>
      </div>
      {isOpen ? (
        <div className="mb-3">
          {description}{' '}
          <button
            onClick={() => setIsOpen(false)}
            className="block uppercase text-primary underline">
            Fermer
          </button>
        </div>
      ) : null}
    </>
  )
}
