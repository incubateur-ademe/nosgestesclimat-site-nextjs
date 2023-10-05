import { useClientTranslation } from '@/hooks/useClientTranslation'
import FancySelect from '../../utils/FancySelect'

export function range(start, end) {
  return Array(end - start + 1)
    .fill(0)
    .map((_, idx) => start + idx)
}

export default function Search(props) {
  const { t } = useClientTranslation()

  return (
    <div className="mb-2 text-left text-sm">
      {t('Nombre de')} {props.elementAnalysedTitle} {t('pour les ')}
      <FancySelect
        fancy
        value={props.date}
        onChange={(e) => {
          props.setDate(e)
        }}
        options={range(4, 31).map((elt) => ({
          value: String(elt),
          label: String(elt),
        }))}
      />{' '}
      {props.period === 'week' ? t('dernières') : t('derniers')}{' '}
      <FancySelect
        fancy
        value={props.period}
        onChange={props.setPeriod}
        options={[
          { value: 'day', label: t('jours') },
          { value: 'week', label: t('semaines') },
          { value: 'month', label: t('mois') },
        ]}
      />
    </div>
  )
}
