import { useRule } from '@/publicodes-state'
import { useMemo } from 'react'
import MosaicBooleanInput from './mosaicQuestion/MosaicBooleanInput'
import MosaicNumberInput from './mosaicQuestion/MosaicNumberInput'

type Props = {
  question: string
}

export default function MosaicQuestion({ question }: Props) {
  const { type } = useRule(question)

  const parentRule = useMemo(() => {
    const dottedNameArray = question.split(' . ')
    dottedNameArray.pop()
    return dottedNameArray.join(' . ')
  }, [question])

  const { title, icons, description } = useRule(parentRule)

  return (
    <>
      {type === 'number' && (
        <MosaicNumberInput
          question={question}
          title={title}
          icons={icons}
          description={description}
        />
      )}
      {type === 'boolean' && (
        <MosaicBooleanInput question={question} title={title} icons={icons} />
      )}
    </>
  )
}
