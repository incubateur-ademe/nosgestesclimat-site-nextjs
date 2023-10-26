import Trans from '@/components/translation/Trans'
import Separator from '@/design-system/layout/Separator'
import CategoriesAccordion from './results/CategoriesAccordion'
import CategoriesChart from './results/CategoriesChart'
import TotalCard from './results/TotalCard'

export default function Results() {
  return (
    <>
      <h2 className="text-lg">
        <Trans>Votre bilan</Trans>
      </h2>

      <div className="flex flex-col items-stretch md:gap-4">
        <TotalCard />

        <CategoriesChart className="md:w-1/2" />
      </div>

      <CategoriesAccordion />

      <Separator className="mb-6 mt-8" />
    </>
  )
}
