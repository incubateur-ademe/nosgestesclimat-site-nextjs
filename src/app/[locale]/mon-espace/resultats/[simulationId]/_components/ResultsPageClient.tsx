'use client'

import { IframeOptionsProvider } from '@/app/[locale]/_components/mainLayoutProviders/IframeOptionsContext'
import ContentLarge from '@/components/layout/ContentLarge'
import ResultsContent from '@/components/results/ResultsContent'
import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import Title from '@/design-system/layout/Title'
import type { Simulation } from '@/types'
import type { ReactNode } from 'react'

type ResultsPageClientProps = {
  simulation: Simulation
  userId: string
  locale: string
  simulationId: string
  breadcrumbs: Array<{
    href: string
    label: string
    isActive?: boolean
  }>
  title: string
  dateText: string
}

export default function ResultsPageClient({
  simulation,
  userId,
  breadcrumbs,
  title,
  dateText,
}: ResultsPageClientProps) {
  return (
    <IframeOptionsProvider>
      {(containerRef) => (
        <ContentLarge ref={containerRef}>
          <Breadcrumbs items={breadcrumbs} />
          <ResultsContent
            simulation={simulation}
            userId={userId}
            isStatic
            title={
              <div className="flex flex-col gap-2">
                <Title title={title} />
                <p className="mb-8 font-bold">{dateText}</p>
              </div>
            }
          />
        </ContentLarge>
      )}
    </IframeOptionsProvider>
  )
}
