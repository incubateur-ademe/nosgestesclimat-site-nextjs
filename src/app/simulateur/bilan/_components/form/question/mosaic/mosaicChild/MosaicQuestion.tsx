import React from 'react'

import { useRule } from '@/publicodes-state'
import MosaicChoicesInput from './mosaicQuestion/MosaicChoicesInput'
import MosaicNumberInput from './mosaicQuestion/MosaicNumberInput'

type Props = {
  question: string
  title: string
  icons: string
}

export default function MosaicQuestion({ question, title, icons }: Props) {
  const { type } = useRule(question)

  return (
    <>
      {type === 'number' && (
        <MosaicNumberInput question={question} title={title} icons={icons} />
      )}
      {type === 'choices' && (
        <MosaicChoicesInput question={question} title={title} icons={icons} />
      )}
    </>
  )
}
