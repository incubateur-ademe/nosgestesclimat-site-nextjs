import { useLocale } from '@/hooks/useLocale'

type Props = {
  total: number
  averagePassengers: number
  totalForOnePassenger: number
}

export default function Summary({
  total,
  averagePassengers,
  totalForOnePassenger,
}: Props) {
  const locale = useLocale()

  return (
    <div className="px-2 text-right text-xs">
      {total.toLocaleString(locale)} km avec en moyenne{' '}
      {averagePassengers.toLocaleString(locale)} voyageurs. Soit{' '}
      {totalForOnePassenger ? totalForOnePassenger.toLocaleString(locale) : 0}{' '}
      km pour une personne.
    </div>
  )
}
