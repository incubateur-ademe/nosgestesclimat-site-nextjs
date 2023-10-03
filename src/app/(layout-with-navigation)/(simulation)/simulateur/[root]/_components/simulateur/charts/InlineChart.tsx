import CategoriesChart from './inlineChart/CategoriesChart'
import SubcategoriesChart from './inlineChart/SubcategoriesChart'

export default function InlineChart() {
  return (
    <div className="mb-4">
      <SubcategoriesChart />
      <CategoriesChart />
    </div>
  )
}
