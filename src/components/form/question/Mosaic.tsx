import { useRule } from '@/publicodes-state'
import { useEffect } from 'react'
import MosaicQuestion from './mosaic/MosaicQuestion'

type Props = {
  question: string
}

export default function Mosaic({ question }: Props) {
  const { questionsOfMosaic, mosaicType } = useRule(question)

  // @Clément TODO: Find a way to set all values of mosaic child to "false" once one is answered (true or false)

  const questionsOfMosaicValues = questionsOfMosaic.map((mosaicQuestion) => {
    const { value, setValue } = useRule(mosaicQuestion)
    return { value, setValue }
  })

  useEffect(() => {
    if (mosaicType !== 'selection') return

    const isAnsweredMosaic = questionsOfMosaicValues.some(
      (elt) => elt !== null || undefined
    )

    if (isAnsweredMosaic) return
  }, [mosaicType, questionsOfMosaicValues])

  return (
    <fieldset className="grid gap-4 md:grid-cols-2">
      {questionsOfMosaic
        ? questionsOfMosaic.map((questionOfMosaic, index) => (
            <MosaicQuestion
              key={questionOfMosaic}
              parentMosaic={question}
              question={questionOfMosaic}
              index={index}
            />
          ))
        : 'Cette mosaique n a pas d enfants.'}
    </fieldset>
  )
}
