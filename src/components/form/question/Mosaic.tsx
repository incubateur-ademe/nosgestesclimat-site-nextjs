import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import MosaicQuestion from './mosaic/MosaicQuestion'

type Props = {
  question: DottedName
  questionsOfMosaic: DottedName[]
  firstInputId: string
  label: string
}

export default function Mosaic({
  question,
  questionsOfMosaic,
  firstInputId,
  label,
  ...props
}: Props) {
  return (
    <fieldset className="grid gap-2 md:grid-cols-2 md:gap-4">
      <legend className="sr-only">{label}</legend>

      {questionsOfMosaic
        ? questionsOfMosaic.map((questionOfMosaic, index) => (
            <MosaicQuestion
              key={questionOfMosaic}
              parentMosaic={question}
              question={questionOfMosaic}
              index={index}
              firstInputId={firstInputId}
              {...props}
            />
          ))
        : 'Cette mosaique n a pas d enfants.'}
    </fieldset>
  )
}
