import { useForm } from '@/publicodes-state'
import BarChart from './charts/BarChart'
import InlineChart from './charts/InlineChart'

export default function Charts() {
  const { currentCategory } = useForm()

  if (!currentCategory) return
  return (
    <>
      <InlineChart />
      <BarChart />
    </>
  )
}
