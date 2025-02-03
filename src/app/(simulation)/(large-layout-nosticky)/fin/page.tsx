'use client'

import MetricSlider from '@/components/fin/MetricSlider'
import HeadingButtons from '@/components/fin/metricSlider/heading/HeadingButtons'
import IframeDataShareModal from '@/components/iframe/IframeDataShareModal'
import CategoriesAccordion from '@/components/results/CategoriesAccordion'
import Trans from '@/components/translation/Trans'
import { carboneMetric, eauMetric } from '@/constants/metric'
import Title from '@/design-system/layout/Title'
import { useEndGuard } from '@/hooks/navigation/useEndGuard'
import { useSimulationIdInQueryParams } from '@/hooks/simulation/useSimulationIdInQueryParams'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import type { Metric } from '@/publicodes-state/types'
import type { ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'
import Carbone from './_components/Carbone'
import DocumentationBlock from './_components/DocumentationBlock'
import Eau from './_components/Eau'
import FeedbackBanner from './_components/FeedbackBanner'
import GetResultsByEmail from './_components/GetResultsByEmail'
import InformationBlock from './_components/InformationBlock'
import Poll from './_components/Poll'
import ShareBlock from './_components/ShareBlock'
import FinPageSkeleton from './skeleton'

const titles: Record<Metric, ReactElement> = {
  [carboneMetric]: <Trans>carbone</Trans>,
  [eauMetric]: <Trans>eau</Trans>,
}

export default function FinPage() {
  // Guarding the route and redirecting if necessary
  const { isGuardInit, isGuardRedirecting } = useEndGuard()

  const { simulationIdInQueryParams } = useSimulationIdInQueryParams()

  const { currentMetric } = useCurrentMetric()

  // If the simulationIdInQueryParams is set, it means that the simulation is not loaded yet
  if (!isGuardInit || isGuardRedirecting || !!simulationIdInQueryParams)
    return <FinPageSkeleton />

  return (
    <div className="relative mt-12">
      <IframeDataShareModal />

      <Poll />

      <div className="flex justify-between">
        <Title tag="h1">
          <Trans>Mes empreintes</Trans>
        </Title>

        <HeadingButtons />
      </div>

      <MetricSlider />

      <div className="relative flex flex-col-reverse gap-8 md:gap-16 lg:flex-row lg:gap-10">
        <div className="relative flex flex-1 flex-col gap-16 lg:mt-7">
          <div
            className={twMerge(
              'transition-opacity duration-500',
              currentMetric === carboneMetric
                ? 'relative opacity-100'
                : 'pointer-events-none absolute top-0 opacity-0'
            )}>
            <Carbone />
          </div>
          <div
            className={twMerge(
              'transition-opacity duration-500',
              currentMetric === eauMetric
                ? 'relative opacity-100'
                : 'pointer-events-none absolute top-0 opacity-0'
            )}>
            <Eau />
          </div>

          <GetResultsByEmail />

          <ShareBlock />

          <div id="categories-block">
            <Title tag="h2" className="text-lg lg:text-2xl">
              <Trans>Le détail de mon empreinte</Trans>{' '}
              <strong className="text-secondary-700">
                {titles[currentMetric]}
              </strong>
            </Title>
            <CategoriesAccordion metric={currentMetric} />
          </div>

          <FeedbackBanner
            className="mb-8 mt-12"
            text={
              <Trans i18nKey="publicodes.northstar.learned">
                Est-ce que "Nos Gestes Climat" vous a permis d'apprendre quelque
                chose ?
              </Trans>
            }
            type="learned"
          />

          <DocumentationBlock />
        </div>
        <div className="top-40 flex w-full flex-col gap-4 self-start md:mb-8 lg:sticky lg:z-30 lg:w-[22rem] short:gap-2">
          <InformationBlock />
        </div>
      </div>
    </div>
  )
}
