import { captureSubQuestion } from '@/constants/tracking/posthogTrackers'
import { openSubQuestion } from '@/constants/tracking/question'
import Button from '@/design-system/buttons/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
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
  questionsOfMosaic,
  secondaryQuestionsOfMosaic,
  firstInputId,
  label,
  ...props
}: Props) {
  const [isMoreOptionsVisible, setIsMoreOptionsVisible] = useState(false)
  const { t } = useClientTranslation()

  if (secondaryQuestionsOfMosaic && secondaryQuestionsOfMosaic.length > 0) {
    questionsOfMosaic = questionsOfMosaic.filter((q) => {
      return !secondaryQuestionsOfMosaic.includes(q)
    })
  }

  return (
    <>
      <fieldset className="grid w-full gap-2 md:grid-cols-2 md:gap-4">
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
          : "Cette mosaique n'a pas d'enfants."}
      </fieldset>

      {secondaryQuestionsOfMosaic && secondaryQuestionsOfMosaic.length > 0 && (
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
              ? t('Fermer')
              : t('simulator.mosaic.openMoreOptions', 'Plus d’options')}
          </Button>{' '}
          {isMoreOptionsVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.1 }}>
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
