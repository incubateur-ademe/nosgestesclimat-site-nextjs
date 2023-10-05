import Trans from '@/components/translation/Trans'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'

export default function CustomTooltip(props) {
  const label = props.label && props.label.replace(/\s/g, ' ')
  const { t } = useClientTranslation()

  const { user } = useUser()

  return props.active && props.payload && props.payload.length ? (
    <div className="border border-[#f0f0f0] bg-white p-4">
      {label === '30+ min' ? (
        <div className="text-[#6a6a6a]">
          <Trans>Plus de 30 minutes</Trans>
        </div>
      ) : (
        <div className="text-[#6a6a6a]">
          {t('Entre') + ' '}
          {label.split('-')[0].toLocaleString(user?.region?.code)}{' '}
          {t('et') + ' '}
          {label
            .split('-')[1]
            .split(' ')[0]
            .toLocaleString(user?.region?.code)}{' '}
          {t('minutes')}
        </div>
      )}
      <span className="text-lg font-bold">
        {props.payload[0].value
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')}{' '}
      </span>
      {props.naming || t('visites')}
    </div>
  ) : null
}
