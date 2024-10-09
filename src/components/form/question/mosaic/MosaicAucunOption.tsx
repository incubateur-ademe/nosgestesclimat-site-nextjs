import { questionClickSuggestion } from '@/constants/tracking/question'
import Emoji from '@/design-system/utils/Emoji'
import { useEngine, useRule } from '@/publicodes-state'
import { FormattedSuggestion } from '@/publicodes-state/types'
import { capitalizeString } from '@/utils/capitalizeString'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  question: DottedName
  aucunOption: FormattedSuggestion
  questionsOfMosaic: DottedName[]
}

const buttonClassNames = {
  checked: 'border-primary-700 text-primary-700 border-2 cursor-pointer ',
  unchecked: 'border-primary-200 hover:bg-primary-50 border-2 cursor-pointer ',
}
const checkClassNames = {
  checked: 'border-primary-700',
  unchecked: 'border-primary-200',
}

const labelClassNames = {
  checked: 'text-primary-700',
  unchecked: 'text-primary-700',
}

export default function MosaicAucunOption({
  question,
  aucunOption,
  questionsOfMosaic,
}: Props) {
  const { setValue } = useRule(question)

  const { getValue } = useEngine()

  const isMosaicChildrenSelected = questionsOfMosaic
    .map((question) => getValue(question))
    .some((value) => value)

  const [isSelected, setIsSelected] = useState(false)
  const status = isSelected ? 'checked' : 'unchecked'

  useEffect(() => {
    if (isMosaicChildrenSelected) {
      setIsSelected(false)
    }
  }, [isMosaicChildrenSelected])

  return (
    <button
      className={twMerge(
        `relative flex h-full items-center gap-2 rounded-xl border bg-white px-4 py-2 text-left transition-colors`,
        buttonClassNames[status]
      )}
      onClick={() => {
        trackEvent(
          questionClickSuggestion({ question, answer: aucunOption.label })
        )
        setIsSelected(true)
        setValue(aucunOption.value, { foldedStep: question })
      }}>
      <span
        className={`${checkClassNames[status]} flex h-5 w-5 items-center justify-center rounded-sm border-2 leading-4`}>
        {status === 'checked' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className={`font-mono text-2xl ${labelClassNames[status]}`}>
            ✓
          </motion.div>
        ) : (
          ''
        )}
      </span>
      <span
        className={`inline-block align-middle text-sm md:text-lg ${labelClassNames[status]}`}>
        <Emoji>{capitalizeString(aucunOption.label)}</Emoji>
      </span>
    </button>
  )
}
