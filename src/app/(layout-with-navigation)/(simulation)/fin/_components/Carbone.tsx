import MainSubcategories from '@/components/fin/MainSubcategories'
import CategoriesAccordion from '@/components/results/CategoriesAccordion'
import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { useRule } from '@/publicodes-state'
import DocumentationBlock from './carbone/DocumentationBlock'
import FeedbackBanner from './carbone/FeedbackBanner'
import GetResultsByEmail from './carbone/GetResultsByEmail'
import OtherWays from './carbone/OtherWays'
import ShareBlock from './carbone/ShareBlock'
import Subcategories from './carbone/Subcategories'
import TargetBlock from './carbone/TargetBlock'
import TotalSticky from './carbone/TotalSticky'

export default function Carbone() {
  const { numericValue: total } = useRule('bilan')

  const isSmallFootprint = total < 4000

  return (
    <div className="flex flex-col-reverse gap-16 lg:flex-row lg:gap-10">
      <div className="flex flex-1 flex-col gap-16 lg:mt-32">
        <MainSubcategories isLink={!isSmallFootprint} />

        {isSmallFootprint ? <OtherWays isSmallFootprint /> : <Subcategories />}

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
  )
}
