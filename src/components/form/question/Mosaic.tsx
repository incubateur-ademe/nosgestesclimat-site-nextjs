import { aucunLabels } from '@/constants/aucunLabels'
import { FormattedSuggestion } from '@/publicodes-state/types'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import MosaicAucunOption from './mosaic/MosaicAucunOption'
import MosaicQuestion from './mosaic/MosaicQuestion'

type Props = {
  question: DottedName
  questionsOfMosaic: DottedName[]
  suggestions: FormattedSuggestion[]
}

export default function Mosaic({
  question,
  questionsOfMosaic,
  suggestions,
  ...props
}: Props) {
  const aucunOption = suggestions.find((suggestion) =>
    aucunLabels.includes(suggestion.label)
  )

  return (
    <fieldset className="grid gap-2 md:grid-cols-2 md:gap-4">
      {questionsOfMosaic
        ? questionsOfMosaic.map((questionOfMosaic, index) => (
            <MosaicQuestion
              key={questionOfMosaic}
              parentMosaic={question}
              question={questionOfMosaic}
              index={index}
              {...props}
            />
          ))
        : 'Cette mosaique n a pas d enfants.'}
      {aucunOption ? (
        <MosaicAucunOption
          question={question}
          aucunOption={aucunOption}
          questionsOfMosaic={questionsOfMosaic}
          {...props}
        />
      ) : null}
    </fieldset>
  )
}
