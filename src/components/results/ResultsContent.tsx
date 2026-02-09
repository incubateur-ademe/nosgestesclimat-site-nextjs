'use client'

import { IframeOptionsProvider } from '@/app/[locale]/_components/mainLayoutProviders/IframeOptionsContext'
import QueryClientProviderWrapper from '@/app/[locale]/_components/mainLayoutProviders/QueryClientProviderWrapper'
import MetricSlider from '@/components/fin/MetricSlider'
import CarboneTotalChart from '@/components/fin/metricSlider/CarboneTotalChart'
import HeadingButtons from '@/components/fin/metricSlider/heading/HeadingButtons'
import Carbone from '@/components/results/Carbone'
import CategoriesAccordion from '@/components/results/CategoriesAccordion'
import DocumentationBlock from '@/components/results/DocumentationBlock'
import Eau from '@/components/results/Eau'
import InformationBlock from '@/components/results/InformationBlock'
import ShareBlock from '@/components/results/ShareBlock'
import Trans from '@/components/translation/trans/TransClient'
import { carboneMetric, eauMetric } from '@/constants/model/metric'
import BlockSkeleton from '@/design-system/layout/BlockSkeleton'
import Title from '@/design-system/layout/Title'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import { useIframe } from '@/hooks/useIframe'
import { useRules } from '@/hooks/useRules'
import { EngineProvider, UserProvider } from '@/publicodes-state'
import type { Metric, Simulation } from '@/publicodes-state/types'
import type { ReactElement, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

const titles: Record<Metric, ReactElement> = {
  [carboneMetric]: <Trans>carbone</Trans>,
  [eauMetric]: <Trans>eau</Trans>,
}

interface Props {
  simulation: Simulation
  isStatic?: boolean
  title?: string | ReactNode
}

function ResultsContentInner({
  isStatic,
  title,
  simulation,
}: {
  isStatic?: boolean
  title?: string | ReactNode
  simulation: Simulation
}) {
  const { currentMetric } = useCurrentMetric()

  const { isFrenchRegion } = useIframe()

  const { data: rules, isLoading } = useRules()

  if (isLoading || !rules) {
    return <BlockSkeleton />
  }

  return (
    <EngineProvider rules={rules}>
      <div className="relative">
        <div className="flex justify-between">
          {title ?? (
            <Title tag="h1">
              <Trans>Mes empreintes</Trans>
            </Title>
          )}

          {isFrenchRegion && !isStatic && <HeadingButtons />}
        </div>

        <MetricSlider
          isStatic={isStatic}
          carboneTotal={simulation.computedResults.carbone.bilan}
          waterTotal={simulation.computedResults.eau?.bilan}
        />

        {currentMetric === carboneMetric && (
          <div className="mb-20 block w-full md:hidden">
            <CarboneTotalChart
              total={simulation.computedResults.carbone.bilan}
              shouldShowOnlyGauge
            />
          </div>
        )}

        <div className="relative flex gap-8 lg:flex-row lg:gap-10">
          <div className="relative flex flex-1 flex-col gap-16 lg:mt-7">
            <div className="short:gap-2 mt-8 flex w-full flex-col gap-4 md:hidden">
              <InformationBlock />
            </div>
            <div
              className={twMerge(
                'transition-opacity duration-500',
                currentMetric === carboneMetric
                  ? 'relative opacity-100'
                  : 'pointer-events-none absolute top-0 opacity-0'
              )}>
              {currentMetric === carboneMetric && <Carbone />}
            </div>
            <div
              className={twMerge(
                'transition-opacity duration-500',
                currentMetric === eauMetric
                  ? 'relative opacity-100'
                  : 'pointer-events-none absolute top-0 opacity-0'
              )}>
              {currentMetric === eauMetric && <Eau />}
            </div>

            {isFrenchRegion && !isStatic && <ShareBlock />}

            <div id="categories-block">
              <Title tag="h2" className="text-lg lg:text-2xl">
                <Trans>Le détail de mon empreinte</Trans>{' '}
                <strong className="text-secondary-700">
                  {titles[currentMetric]}
                </strong>
              </Title>
              <CategoriesAccordion metric={currentMetric} />
            </div>

            <DocumentationBlock />
          </div>

          <div className="short:gap-2 top-40 hidden w-full flex-col gap-4 self-start md:mb-8 md:flex md:w-[22rem] lg:sticky lg:z-30">
            <InformationBlock />
          </div>
        </div>
      </div>
    </EngineProvider>
  )
}

export default function ResultsContent({ simulation, isStatic, title }: Props) {
  return (
    <QueryClientProviderWrapper>
      <UserProvider>
        <IframeOptionsProvider>
          <ResultsContentInner
            isStatic={isStatic}
            title={title}
            simulation={simulation}
          />
        </IframeOptionsProvider>
      </UserProvider>
    </QueryClientProviderWrapper>
  )
}
