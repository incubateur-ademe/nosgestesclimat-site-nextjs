import { useForm } from '@/publicodes-state'
import BarChart from './charts/BarChart'
import CategoryChart from './charts/CategoryChart'

export default function Charts() {
  const { currentCategory } = useForm()

  if (!currentCategory) return
  return (
    <>
      <CategoryChart />
      <BarChart />
    </>
  )
}
