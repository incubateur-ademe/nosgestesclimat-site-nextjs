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
    <div className="mt-4 px-2 text-right text-xs">
      <NGCTrans>Au total</NGCTrans> {total.toLocaleString(locale)}{' '}
      <NGCTrans>km sont parcourus par an, avec en moyenne</NGCTrans>{' '}
      {averagePassengers.toLocaleString(locale)}{' '}
      <NGCTrans>voyageurs, soit</NGCTrans>{' '}
      {(totalForOnePassenger ?? 0).toLocaleString(locale)}{' '}
      <NGCTrans>km par personne</NGCTrans>. <br className="hidden md:inline" />
      <NGCTrans>
        C’est bien cette distance qui sera comptabilisée en fin de test.
      </NGCTrans>
    </div>
  )
}
