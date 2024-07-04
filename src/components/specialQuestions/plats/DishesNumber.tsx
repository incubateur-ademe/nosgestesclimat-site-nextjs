import { useRule } from '@/publicodes-state'

export default function DishesNumber() {
  const { numericValue: totalNumberOfPlats } = useRule(
    'ui . nombre de repas par semaine'
  )

  return (
    <>
      <div aria-live="polite" className="mb-2 flex flex-row-reverse text-sm">
        <strong>{totalNumberOfPlats} / 14 repas</strong>
      </div>
    </>
  )
}
