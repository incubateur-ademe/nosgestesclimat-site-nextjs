'use client'

import Trans from '@/components/translation/Trans'
import { endClickNorthstar } from '@/constants/tracking/pages/end'
import SmileyGrading from '@/design-system/inputs/SmileyGrading'
import Card from '@/design-system/layout/Card'
import Emoji from '@/design-system/utils/Emoji'
import { useSaveNorthstarRating } from '@/hooks/northstar/useSaveNorthstarRating'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { NorthStarType, NorthStarValue } from '@/types/northstar'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  text: ReactNode
  type: NorthStarType
  className?: string
}

export default function FeedbackBanner({ text, type, className }: Props) {
  const { t } = useClientTranslation()
  const { user, updateNorthStarRatings } = useUser()

  const { isPending, isSuccess, isError, saveNorthstarRating } =
    useSaveNorthstarRating()

  const handleGrading = async (value: NorthStarValue) => {
    await saveNorthstarRating({ type, value })

    updateNorthStarRatings({ type, value })

    trackEvent(endClickNorthstar({ type, value }))
  }

  const cardClassName = twMerge(
    'border-none shadow-none bg-primary-50 w-[24rem] rounded-xl max-w-full',
    className
  )

  // Display the thank you message if the user has just answered
  if (isSuccess)
    return (
      <Card
        className={`${cardClassName} flex-row items-center justify-center gap-3`}>
        {t('Merci pour votre retour\u202f!')}
        <Emoji className="text-2xl">😊</Emoji>
      </Card>
    )

  // Display the error message in case of error
  if (isError)
    return (
      <Card
        className={`${cardClassName} flex-row items-center justify-center gap-3`}>
        {t('Une erreur est survenue\u202f!')}
        <Emoji className="text-2xl">😕</Emoji>
      </Card>
    )

  // Display nothing the next time the user visits this page
  if (user.northStarRatings?.[type]) return null

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
