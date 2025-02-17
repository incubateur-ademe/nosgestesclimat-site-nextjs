'use client'

import TransClient from '@/components/translation/trans/TransClient'
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
      <TransClient>Au total</TransClient> {total.toLocaleString(locale)}{' '}
      <TransClient>km sont parcourus par an, avec en moyenne</TransClient>{' '}
      {averagePassengers.toLocaleString(locale)}{' '}
      <TransClient>voyageurs, soit</TransClient>{' '}
      {(totalForOnePassenger ?? 0).toLocaleString(locale)}{' '}
      <TransClient>km par personne</TransClient>.{' '}
      <br className="hidden md:inline" />
      <TransClient>
        C’est bien cette distance qui sera comptabilisée en fin de test.
      </TransClient>
    </div>
  )
}
