'use client'

import ButtonLink from '@/design-system/inputs/ButtonLink'
import Separator from '@/design-system/layout/Separator'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import type { GesturesType } from '@/types/landing-page'
import type { ReactNode } from 'react'
import Trans from '../translation/Trans'
import GestureSelector from './dailyGestures/GestureSelector'

export default function DailyGestures({
  title,
  description,
  gestures,
}: {
  title: ReactNode
  description: ReactNode
  gestures: GesturesType
}) {
  const { getLinkToSimulateurPage, linkToSimulateurPageLabel } =
    useSimulateurPage()

  return (
    <div className="mx-auto my-20 w-full max-w-full px-8 text-center md:max-w-[850px] md:px-0">
      <h2 className="text-2xl md:text-3xl">{title}</h2>

      <Separator className="mx-auto" />

      <section>{description}</section>

      <div className="mt-10 flex w-full flex-col justify-between gap-10 md:flex-row">
        <GestureSelector gestures={gestures} />
      </div>

      <div className="mt-10 text-center">
        <ButtonLink size="xl" href={getLinkToSimulateurPage()}>
          <Trans>{linkToSimulateurPageLabel}</Trans>
        </ButtonLink>
      </div>
    </div>
  )
}
