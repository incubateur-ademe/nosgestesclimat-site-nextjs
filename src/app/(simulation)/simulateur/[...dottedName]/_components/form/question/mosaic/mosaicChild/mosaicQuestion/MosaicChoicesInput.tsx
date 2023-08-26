import React from 'react'

import { useRule } from '@/publicodes-state'

type Props = {
  question: string
  title: string
  icons: string
}

export default function MosaicChoicesInput({ question, title, icons }: Props) {
  const { value, setValue, isMissing } = useRule(question)

  const checked = !isMissing && value
  return (
    <button
      className={`rounded border border-primary px-4 py-2 text-xl ${
        checked ? 'bg-primary text-white' : 'bg-grey-100 text-primary'
      }`}
      onClick={() => {
        setValue(!value)
      }}
    >
      <span
        className={`${
          checked ? 'before:border-white' : 'before:border-primary'
        } flex items-center gap-2 before:block before:h-5 before:w-5 before:rounded-sm before:border-2`}
      >
        {icons} {title}
      </span>
    </button>
  )
}
