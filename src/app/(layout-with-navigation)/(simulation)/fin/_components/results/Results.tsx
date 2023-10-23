import Trans from '@/components/translation/Trans'
import CategoriesAccordion from './CategoriesAccordion'
import TotalCard from './TotalCard'
import CategoriesChart from './categoriesChart/CategoriesChart'

export default function Results() {
  return (
    <>
      <h2 className="text-lg">
        <Trans>Votre bilan</Trans>
      </h2>

      <div className="flex flex-col md:flex-row md:items-stretch md:gap-4">
        <TotalCard />

        <CategoriesChart />
      </div>

      <CategoriesAccordion />
    </>
  )
}
