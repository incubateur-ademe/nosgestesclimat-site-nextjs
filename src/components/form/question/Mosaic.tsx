import { captureSubQuestion } from '@/constants/tracking/posthogTrackers'
import { openSubQuestion } from '@/constants/tracking/question'
import Button from '@/design-system/buttons/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useEngine } from '@/publicodes-state'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { motion } from 'framer-motion'
import { useState } from 'react'
import MosaicQuestion from './mosaic/MosaicQuestion'

type Props = {
  question: DottedName
  questionsOfMosaic: DottedName[]
  secondaryQuestionsOfMosaic?: DottedName[]
  firstInputId: string
  label: string
}

export default function Mosaic({
  question,
  questionsOfMosaic: questionsOfMosaicFromProps,
  secondaryQuestionsOfMosaic,
  firstInputId,
  label,
  ...props
}: Props) {
  const { getValue } = useEngine()

  const isSecondaryQuestionsOfMosaicNotEmpty =
    secondaryQuestionsOfMosaic && secondaryQuestionsOfMosaic.length > 0

  const [isMoreOptionsVisible, setIsMoreOptionsVisible] = useState(
    isSecondaryQuestionsOfMosaicNotEmpty &&
      secondaryQuestionsOfMosaic.some(
        (secondaryMosaicChild) => getValue(secondaryMosaicChild) === true
      )
  )
  const { t } = useClientTranslation()

  let questionsOfMosaic = [...questionsOfMosaicFromProps]

  if (isSecondaryQuestionsOfMosaicNotEmpty) {
    questionsOfMosaic = questionsOfMosaic.filter((q) => {
      return !secondaryQuestionsOfMosaic.includes(q)
    })
  }

  return (
    <>
      <fieldset className="grid w-full auto-rows-fr items-stretch gap-2 md:grid-cols-2 md:gap-4">
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
          : t(
              'simulator.mosaic.noChildren',
              "Cette mosaique n'a pas d'enfants."
            )}
      </fieldset>

      {isSecondaryQuestionsOfMosaicNotEmpty && (
        <div className="w-full">
          <Button
            color="link"
            size="sm"
            onClick={() => {
              trackEvent(openSubQuestion({ question }))
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
                    {...props}
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
