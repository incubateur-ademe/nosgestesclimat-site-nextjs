import { captureSubQuestion } from '@/constants/tracking/posthogTrackers'
import Button from '@/design-system/buttons/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { trackPosthogEvent } from '@/utils/analytics/trackEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { motion } from 'framer-motion'
import { useState } from 'react'
import MosaicQuestion from './mosaic/MosaicQuestion'
import MosaicBooleanInput from './mosaic/mosaicQuestion/MosaicBooleanInput'
import { useMosaicState } from './mosaic/useMosaicState'

interface Props {
  question: DottedName
  questionsOfMosaic: DottedName[]
  secondaryQuestionsOfMosaic?: DottedName[]
  firstInputId: string
  label: string
}

export default function Mosaic({
  question,
  questionsOfMosaic,
  secondaryQuestionsOfMosaic = [],
  firstInputId,
  label,
}: Props) {
  const { values, setValue, aucunOption } = useMosaicState({
    questionsOfMosaic,
    question,
  })

  const [isMoreOptionsVisible, setIsMoreOptionsVisible] = useState(
    secondaryQuestionsOfMosaic.some((question) => values[question])
  )
  const { t } = useClientTranslation()

  // Remove secondary questions from the list of questions of the mosaic
  if (secondaryQuestionsOfMosaic.length) {
    questionsOfMosaic = questionsOfMosaic.filter((q) => {
      return !secondaryQuestionsOfMosaic.includes(q)
    })
  }

  return (
    <>
      <fieldset
        className={`grid w-[90%] auto-rows-fr items-stretch gap-2 md:w-full ${questionsOfMosaic.length <= 2 ? 'md:max-w-128 md:grid-cols-1' : 'md:grid-cols-2'} md:gap-4`}>
        <legend className="sr-only">{label}</legend>
        {questionsOfMosaic.map((questionOfMosaic, index) => (
          <MosaicQuestion
            key={questionOfMosaic}
            parentMosaic={question}
            question={questionOfMosaic}
            index={index}
            firstInputId={firstInputId}
            value={values[questionOfMosaic]}
            setValue={setValue}
          />
        ))}
        {aucunOption && (
          <MosaicBooleanInput
            question={`${question} . aucun` as DottedName}
            title={
              aucunOption.label === 'non concerné'
                ? t(
                    'simulator.mosaic.notConcerned',
                    'Je ne suis pas concerné·e'
                  )
                : t('simulator.mosaic.noneOfTheseOptions', 'Aucun')
            }
            icons="❌"
            value={aucunOption.value}
            setValue={aucunOption.setValue}
            index={questionsOfMosaic.length}
          />
        )}
      </fieldset>

      {!!secondaryQuestionsOfMosaic.length && (
        <div className="w-full">
          <Button
            color="link"
            size="sm"
            onClick={() => {
              trackPosthogEvent(
                captureSubQuestion({
                  question,
                  state: isMoreOptionsVisible ? 'closed' : 'opened',
                })
              )
              setIsMoreOptionsVisible(!isMoreOptionsVisible)
            }}
            className="mt-2 w-30 md:mt-4">
            {isMoreOptionsVisible
              ? t('simulator.mosaic.closeMoreOptions', 'Moins d’options')
              : t('simulator.mosaic.openMoreOptions', 'Plus d’options')}
          </Button>{' '}
          {isMoreOptionsVisible && (
            <motion.div
              initial={{ opacity: 0, y: '-1rem' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}>
              <fieldset className="mt-2 grid gap-2 md:mt-4 md:grid-cols-2 md:gap-4">
                {secondaryQuestionsOfMosaic.map((questionOfMosaic, index) => (
                  <MosaicQuestion
                    key={questionOfMosaic}
                    parentMosaic={question}
                    question={questionOfMosaic}
                    index={questionsOfMosaic.length + index}
                    firstInputId={firstInputId}
                    setValue={setValue}
                    value={values[questionOfMosaic]}
                  />
                ))}
              </fieldset>
            </motion.div>
          )}
        </div>
      )}
    </>
  )
}
