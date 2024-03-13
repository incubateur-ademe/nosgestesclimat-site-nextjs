import { useLocale } from '@/hooks/useLocale'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
  const locale = useLocale()

  return (
    <div className="mt-4 px-2 text-right text-xs">
      {total.toLocaleString(locale)} km {t('avec en moyenne')}{' '}
      {averagePassengers.toLocaleString(locale)} {t('voyageurs')}. {t('Soit')}{' '}
      {totalForOnePassenger ? totalForOnePassenger.toLocaleString(locale) : 0}{' '}
      km {t('pour une personne')}.
    </div>
  )
}
