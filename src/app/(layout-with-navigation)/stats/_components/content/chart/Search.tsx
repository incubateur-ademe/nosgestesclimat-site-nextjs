import { useClientTranslation } from '@/hooks/useClientTranslation'
import FancySelect from '../../utils/FancySelect'

export function range(start: number, end: number) {
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
  color: string
}

export default function Search({
  date,
  setDate,
  period,
  setPeriod,
  elementAnalysedTitle,
  color,
}: Props) {
  const { t } = useClientTranslation()

  return (
    <div className="mb-2 text-left text-sm">
      {t('Nombre de')} {elementAnalysedTitle} {t('pour les ')}
      <FancySelect
        fancy
        value={date}
        onChange={(e: string) => {
          setDate(e)
        }}
        options={range(4, 31).map((elt) => ({
          value: String(elt),
          label: String(elt),
        }))}
        color={color}
      />{' '}
      {period === 'week' ? t('dernières') : t('derniers')}{' '}
      <FancySelect
        fancy
        value={period}
        onChange={setPeriod}
        options={[
          { value: 'day', label: t('jours') },
          { value: 'week', label: t('semaines') },
          { value: 'month', label: t('mois') },
        ]}
        color={color}
      />
    </div>
  )
}
