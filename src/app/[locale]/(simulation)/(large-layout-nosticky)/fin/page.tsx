'use client'

import MetricSlider from '@/components/fin/MetricSlider'
import CarboneTotalChart from '@/components/fin/metricSlider/CarboneTotalChart'
import HeadingButtons from '@/components/fin/metricSlider/heading/HeadingButtons'
import IframeDataShareModal from '@/components/iframe/IframeDataShareModal'
import CategoriesAccordion from '@/components/results/CategoriesAccordion'
import Trans from '@/components/translation/trans/TransClient'
import { carboneMetric, eauMetric } from '@/constants/model/metric'
import Title from '@/design-system/layout/Title'
import { useEndGuard } from '@/hooks/navigation/useEndGuard'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import { useIframe } from '@/hooks/useIframe'
import type { Metric } from '@/publicodes-state/types'
import { getIsIframe } from '@/utils/getIsIframe'
import type { ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'
import Carbone from './_components/Carbone'
import DocumentationBlock from './_components/DocumentationBlock'
import Eau from './_components/Eau'
import GetResultsByEmail from './_components/GetResultsByEmail'
import InformationBlock from './_components/InformationBlock'
import PartnerRedirectionAlert from './_components/PartnerRedirectionAlert'
import Poll from './_components/Poll'
import ShareBlock from './_components/ShareBlock'
import TallyForm from './_components/TallyForm'
import FinPageSkeleton from './skeleton'

const titles: Record<Metric, ReactElement> = {
  [carboneMetric]: <Trans>carbone</Trans>,
  [eauMetric]: <Trans>eau</Trans>,
}

export default function FinPage() {
  // Guarding the route and redirecting if necessary
  const { isGuardInit, isGuardRedirecting } = useEndGuard()

  const { currentMetric } = useCurrentMetric()

  const isIframe = getIsIframe()
  const { isIframeShareData, isFrenchRegion } = useIframe()

  // If the simulationIdInQueryParams is set, it means that the simulation is not loaded yet
  if (!isGuardInit || isGuardRedirecting) return <FinPageSkeleton />

  return (
    <div className="relative mt-12">
      {isIframe && isIframeShareData && <IframeDataShareModal />}

      <TallyForm />

      <Poll />

      <PartnerRedirectionAlert />

      <div className="flex justify-between">
        <Title tag="h1">
          <Trans>Mes empreintes</Trans>
        </Title>

        {isFrenchRegion && <HeadingButtons />}
      </div>

      <MetricSlider />

      {currentMetric === carboneMetric && (
        <div className="mb-20 block w-full md:hidden">
          <CarboneTotalChart shouldShowOnlyGauge />
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

          {isFrenchRegion && <GetResultsByEmail />}

          {isFrenchRegion && <ShareBlock />}

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

        <div className="short:gap-2 top-40 hidden w-full flex-col gap-4 self-start md:mb-8 md:flex lg:sticky lg:z-30 lg:w-[22rem]">
          <InformationBlock />
        </div>
      </div>
    </div>
  )
}
