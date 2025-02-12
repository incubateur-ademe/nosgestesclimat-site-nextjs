import { useForm } from '@/publicodes-state'
import CategoriesChart from './inlineChart/CategoriesChart'
import SubcategoriesChart from './inlineChart/SubcategoriesChart'

export default function InlineChart() {
  const { currentCategory } = useForm()
  return (
    <div className="mb-4">
      {currentCategory ? <SubcategoriesChart /> : null}
      <CategoriesChart />
    </div>
  )
}
