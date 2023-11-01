import { orderedCategories } from '@/constants/orderedCategories'
import CategoryChart from './ravijenChart/CategoryChart'

export default function RavijenChart() {
  return (
    <ul className="flex gap-2">
      {orderedCategories.map((category) => (
        <li key={category}>
          <CategoryChart category={category} />
        </li>
      ))}
    </ul>
  )
}
