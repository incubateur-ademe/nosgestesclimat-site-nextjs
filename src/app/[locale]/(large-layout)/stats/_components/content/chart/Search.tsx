import { useClientTranslation } from '@/hooks/useClientTranslation'
import FancySelect from '../../utils/FancySelect'

function range(start: number, end: number) {
  return Array(end - start + 1)
    .fill(0)
    .map((_, idx) => start + idx)
}

type Props = {
  date: string
  setDate: (date: string) => void
  period: string
  setPeriod: (period: string) => void
  elementAnalysedTitle: string
}

export default function Search({
  date,
  setDate,
  period,
  setPeriod,
  elementAnalysedTitle,
}: Props) {
  const { t } = useClientTranslation()

  return (
    <div className="mb-2 text-left text-sm">
      {t('Nombre de')} {elementAnalysedTitle} {t('pour les ')}
      <FancySelect
        name="select-date"
        aria-label={t('Nombre de jours, semaines ou mois à afficher')}
        value={date}
        onChange={(e: string) => {
          setDate(e)
        }}
        options={range(4, 31).map((elt) => ({
          value: String(elt),
          label: String(elt),
        }))}
      />{' '}
      {period === 'week' ? t('dernières') : t('derniers')}{' '}
      <FancySelect
        name="select-period"
        aria-label={t('Période à afficher')}
        value={period}
        onChange={setPeriod}
        options={[
          { value: 'day', label: t('jours') },
          { value: 'week', label: t('semaines') },
          { value: 'month', label: t('mois') },
        ]}
      />
    </div>
  )
}
