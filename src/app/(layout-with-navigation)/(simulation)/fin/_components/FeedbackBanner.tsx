'use client'

import Trans from '@/components/translation/Trans'
import { SIMULATION_URL } from '@/constants/urls'
import SmileyGrading from '@/design-system/inputs/SmileyGrading'
import Card from '@/design-system/layout/Card'
import { useEngine, useForm, useUser } from '@/publicodes-state'
import { NorthStarType, NorthStarValue } from '@/types/northstar'
import { captureException } from '@sentry/react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  text: ReactNode
  type: NorthStarType
  className?: string
}

export default function FeedbackBanner({ text, type, className }: Props) {
  const { user, updateNorthStarRatings } = useUser()

  const { getNumericValue } = useEngine()

  const { categories, progression } = useForm()

  const {
    mutate: saveRating,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationKey: ['northstar', 'post'],
    mutationFn: () =>
      axios
        .post(SIMULATION_URL, {
          results: progression > 0 && {
            categories: categories.map((category) => getNumericValue(category)),
            total: getNumericValue('bilan'),
          },
          ratings: user.northStarRatings,
        })
        .then((response) => response.data)
        .catch((error) => captureException(error)),
  })

  const handleGrading = (grade: NorthStarValue) => {
    updateNorthStarRatings({ type, value: grade })
    saveRating()
  }

  const cardClassName = twMerge('border-none bg-grey-100', className)

  if (isSuccess)
    return (
      <Card className={cardClassName}>
        <Trans i18nKey="northstar.thankyou">Merci pour votre retour !</Trans>
      </Card>
    )

  return (
    <Card className={`${cardClassName} pt-8`}>
      <p>
        <strong>
          <Trans i18nKey="publicodes.northstar.title">
            Petite question entre nous...
          </Trans>
        </strong>
      </p>

      <p className="font-light">{text}</p>

      <SmileyGrading onClick={handleGrading} disabled={isLoading} />
    </Card>
  )
}
