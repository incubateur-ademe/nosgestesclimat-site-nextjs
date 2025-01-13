'use client'

import Separator from '@/design-system/layout/Separator'
import type { GesturesType } from '@/types/landing-page'
import type { ReactNode } from 'react'
import DynamicCTAButton from '../cta/DynamicCTAButtons'
import GestureSelector from './dailyGestures/GestureSelector'

export default function DailyGestures({
  title,
  description,
  gestures,
  trackingEvents,
}: {
  title: ReactNode
  description: ReactNode
  gestures: GesturesType
  trackingEvents: {
    start: string[]
    resume: string[]
    results: string[]
  }
}) {
  return (
    <div className="mx-auto mb-20 mt-16 w-full max-w-full px-4 text-center md:my-20 md:max-w-[850px] md:px-0">
      <h2 className="text-xl md:text-3xl">{title}</h2>

      <Separator className="mx-auto my-4" />

      <section className="text-sm md:text-lg">{description}</section>

      <div className="mb-24 mt-10 flex w-full flex-col justify-between gap-10 md:mb-0 md:flex-row">
        <GestureSelector gestures={gestures} />
      </div>

      <div className="mt-10 text-center">
        <DynamicCTAButton trackingEvents={trackingEvents} withRestart={false} />
      </div>
    </div>
  )
}
