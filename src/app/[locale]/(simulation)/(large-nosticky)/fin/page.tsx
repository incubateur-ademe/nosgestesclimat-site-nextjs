'use client'

import MetricSlider from '@/components/fin/MetricSlider'
import CarboneTotalChart from '@/components/fin/metricSlider/CarboneTotalChart'
import HeadingButtons from '@/components/fin/metricSlider/heading/HeadingButtons'
import IframeDataShareModal from '@/components/iframe/IframeDataShareModal'
import Carbone from '@/components/results/Carbone'
import CategoriesAccordion from '@/components/results/CategoriesAccordionLegacy'
import DocumentationBlock from '@/components/results/DocumentationBlock'
import Eau from '@/components/results/Eau'
import InformationBlock from '@/components/results/InformationBlock'
import ShareBlock from '@/components/results/ShareBlock'
import Trans from '@/components/translation/trans/TransClient'
import { carboneMetric, eauMetric } from '@/constants/model/metric'
import { FIN_TAB_QUERY_PARAM } from '@/constants/urls/params'
import Title from '@/design-system/layout/Title'
import { fetchUser } from '@/helpers/user/fetchUser'
import { useEndPageGuard } from '@/hooks/navigation/useSimulatorGuard'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import { useIframe } from '@/hooks/useIframe'
import type { Metric } from '@/publicodes-state/types'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useEffect, type ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'
import FinTabs from '../../../../../components/results/FinTabs'
import SimulateurSkeleton from '../../simulateur/[root]/skeleton'
import ActionsTabContent from './_components/ActionsTabContent'
import GroupsTabContent from './_components/GroupsTabContent'
import PartnerRedirectionAlert from './_components/PartnerRedirectionAlert'
import Poll from './_components/Poll'
import SaveResultsAndSigninSignUpForm from './_components/SaveResultsAndSigninSignUpForm'
import TallyForm from './_components/TallyForm'

const titles: Record<Metric, ReactElement> = {
  [carboneMetric]: <Trans>carbone</Trans>,
  [eauMetric]: <Trans>eau</Trans>,
}

export default function FinPage() {
  const { isRedirecting } = useEndPageGuard()

  const { currentMetric } = useCurrentMetric()

  const { isFrenchRegion } = useIframe()
  const { data: authenticatedUser } = useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => fetchUser(),
  })
  const showSaveResultForm = isFrenchRegion && !authenticatedUser

  const searchParams = useSearchParams()
  const activeTab = searchParams?.get(FIN_TAB_QUERY_PARAM) || 'results'

  useEffect(() => {
    const titleTags = document.querySelectorAll('head > title')

    if (titleTags.length > 1) {
      titleTags[1].remove()
    }
  }, [])

  if (isRedirecting) return <SimulateurSkeleton />

  return (
    <div className="relative mt-4 mb-16 md:mt-10">
      <IframeDataShareModal />

      <FinTabs />

      <TallyForm />

      <Poll />

      <PartnerRedirectionAlert />

      {activeTab === 'results' && (
        <>
          <div className="flex justify-between">
            <Title tag="h1">
              <Trans>Mes empreintes</Trans>
            </Title>

            {isFrenchRegion && (
              <HeadingButtons showSaveButton={!authenticatedUser} />
            )}
          </div>

          <MetricSlider />

          {currentMetric === carboneMetric && (
            <div className="mb-20 block w-full md:hidden">
              <CarboneTotalChart shouldShowOnlyGauge />
            </div>
          )}

          {showSaveResultForm && <SaveResultsAndSigninSignUpForm />}

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

            <div className="short:gap-2 top-40 hidden w-full max-w-72 flex-col gap-4 self-start md:mb-8 md:flex lg:sticky lg:z-30 lg:w-[22rem]">
              <InformationBlock />
            </div>
          </div>
        </>
      )}

      {activeTab === 'actions' && <ActionsTabContent />}

      {activeTab === 'groups' && (
        <GroupsTabContent user={authenticatedUser ?? undefined} />
      )}
    </div>
  )
}
