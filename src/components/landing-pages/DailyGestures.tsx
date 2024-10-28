'use client'

import ButtonLink from '@/design-system/inputs/ButtonLink'
import Separator from '@/design-system/layout/Separator'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { GesturesType } from '@/types/landing-page'
import { ReactNode } from 'react'
import Trans from '../translation/Trans'
import GestureSelector from './dailyGestures/GestureSelector'

export default function DailyGestures({
  title,
  description,
  gestures,
  illustration,
}: {
  title: ReactNode
  description: ReactNode
  gestures: GesturesType
  illustration: ReactNode
}) {
  const { getLinkToSimulateurPage, linkToSimulateurPageLabel } =
    useSimulateurPage()

  return (
    <div className="mx-auto mb-20 mt-24 w-full max-w-full px-8 text-center md:max-w-[800px] md:px-0">
      <h2 className="text-2xl md:text-3xl">{title}</h2>

      <Separator className="mx-auto" />

      <section>{description}</section>

      <div className="mt-16 flex w-full flex-col gap-10 md:flex-row">
        <GestureSelector gestures={gestures} />

        {illustration}
      </div>

      <div className="mt-16 text-center">
        <ButtonLink size="xl" href={getLinkToSimulateurPage()}>
          <Trans>{linkToSimulateurPageLabel}</Trans>
        </ButtonLink>
      </div>
    </div>
  )
}
