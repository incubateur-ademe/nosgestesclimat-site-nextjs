import { useSimulation } from '@/publicodes-state'
import RavijenChart from './RavijenChart'

export default function BilanChart() {
  const { categories, subcategories } = useSimulation()

  return <RavijenChart categories={categories} subcategories={subcategories} />
}
