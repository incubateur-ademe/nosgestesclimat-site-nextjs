'use client'

import Trans from '@/components/translation/Trans'
import { SIMULATION_URL } from '@/constants/urls'
import SmileyGrading from '@/design-system/inputs/SmileyGrading'
import Card from '@/design-system/layout/Card'
import Emoji from '@/design-system/utils/Emoji'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useEngine, useForm, useUser } from '@/publicodes-state'
import { NorthStarType, NorthStarValue } from '@/types/northstar'
import { captureException } from '@sentry/react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { ReactNode, useRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  text: ReactNode
  type: NorthStarType
  className?: string
}

export default function FeedbackBanner({ text, type, className }: Props) {
  const { t } = useClientTranslation()
  const { user, updateNorthStarRatings, currentSimulationId } = useUser()
  const { getNumericValue } = useEngine()
  const { categories, progression } = useForm()
  const hasJustAnswered = useRef(false)

  const {
    mutate: saveRating,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ['northstar', 'post'],
    mutationFn: () =>
      axios
        .post(SIMULATION_URL, {
          data: {
            results: progression > 0 && {
              categories: categories.map((category) =>
                getNumericValue(category)
              ),
              total: getNumericValue('bilan'),
            },
            ratings: user.northStarRatings,
          },
          id: currentSimulationId,
        })
        .then((response) => response.data)
        .catch((error) => captureException(error)),
  })

  const handleGrading = (grade: NorthStarValue) => {
    hasJustAnswered.current = true
    updateNorthStarRatings({ type, value: grade })
    saveRating()
  }

  const cardClassName = twMerge(
    'border-none bg-grey-100 w-[24rem] max-w-full',
    className
  )

  // Display nothing the next time the user visits this page
  if (!hasJustAnswered?.current && user.northStarRatings?.[type]) return null

  // Display the thank you message if the user has just answered
  if (hasJustAnswered?.current && (isSuccess || user.northStarRatings?.[type]))
    return (
      <Card
        className={`${cardClassName} h-[200px] flex-row items-center justify-center gap-3`}>
        {t('Merci pour votre retour\u202f!')}
        <Emoji className="text-2xl">😊</Emoji>
      </Card>
    )

  return (
    <Card className={`${cardClassName} mt-8 pb-2`}>
      <p>
        <strong>
          <Trans i18nKey="publicodes.northstar.title">
            Petite question entre nous...
          </Trans>
        </strong>
      </p>

      <p className="font-light">{text}</p>

      <SmileyGrading onClick={handleGrading} disabled={isPending} />
    </Card>
  )
}
