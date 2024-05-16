'use client'

import MainSubcategories from '@/components/fin/MainSubcategories'
import TotalChart from '@/components/fin/TotalChart'
import IframeDataShareModal from '@/components/iframe/IframeDataShareModal'
import CategoriesAccordion from '@/components/results/CategoriesAccordion'
import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { useEndGuard } from '@/hooks/navigation/useEndGuard'
import { useSetCurrentSimulationFromParams } from '@/hooks/simulation/useSetCurrentSimulationFromParams'
import { useRule } from '@/publicodes-state'
import DocumentationBlock from './_components/DocumentationBlock'
import FeedbackBanner from './_components/FeedbackBanner'
import GetResultsByEmail from './_components/GetResultsByEmail'
import Heading from './_components/Heading'
import Poll from './_components/Poll'
import ShareBlock from './_components/ShareBlock'
import SmallFootprint from './_components/SmallFootprint'
import Subcategories from './_components/Subcategories'
import TargetBlock from './_components/TargetBlock'
import TotalSticky from './_components/TotalSticky'
import TotalStickyMobile from './_components/TotalStickyMobile'

export default function FinPage() {
  // Guarding the route and redirecting if necessary
  const { isGuardInit, isGuardRedirecting } = useEndGuard()

  // Set the current simulation from the URL params (if applicable)
  const { isCorrectSimulationSet } = useSetCurrentSimulationFromParams()

  const { numericValue: total } = useRule('bilan')

  if (!isGuardInit || isGuardRedirecting) return null

  if (!isCorrectSimulationSet) return null

  const isSmallFootprint = total < 4000
  return (
    <>
      <IframeDataShareModal />
      <Poll />

      <Heading />

      <TotalChart />

      <TotalStickyMobile />

      <div className="flex flex-col-reverse gap-16 lg:flex-row lg:gap-10">
        <div className="flex flex-1 flex-col gap-16 lg:mt-32">
          <MainSubcategories isLink={!isSmallFootprint} />

          {isSmallFootprint ? <SmallFootprint /> : <Subcategories />}

          <GetResultsByEmail />

          <ShareBlock />

          <div id="categories-block">
            <Title
              tag="h2"
              className="text-lg md:text-2xl"
              title={<Trans>Le détail de mon empreinte</Trans>}
            />
            <CategoriesAccordion />
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
        <div className="top-4 flex w-full flex-col gap-4 self-start lg:sticky lg:z-50 lg:w-[22rem] short:gap-2">
          <TotalSticky />
          <TargetBlock />
        </div>
      </div>
    </>
  )
}
