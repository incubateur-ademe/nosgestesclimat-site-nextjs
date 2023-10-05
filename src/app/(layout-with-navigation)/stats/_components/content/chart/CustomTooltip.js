import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'

export default function CustomTooltip(props) {
  const { t } = useClientTranslation()
  const { user } = useUser()

  return props.active && props.payload && props.payload.length ? (
    <div className="border border-[#f0f0f0] p-4">
      {props.period === 'week' && (
        <span>
          Semaine du{' '}
          {new Date(props.label.split(',')[0]).toLocaleDateString(
            user?.region?.code,
            {
              day: '2-digit',
              month: '2-digit',
            }
          )}{' '}
          au{' '}
          {new Date(props.label.split(',')[1]).toLocaleDateString(
            user?.region?.code,
            {
              day: '2-digit',
              month: '2-digit',
            }
          )}
        </span>
      )}
      {props.period === 'month' && (
        <span>
          {new Date(props.label).toLocaleDateString(user?.region?.code, {
            month: 'long',
            year: 'numeric',
          })}
        </span>
      )}
      {props.period === 'day' && (
        <span>
          {new Date(props.label).toLocaleDateString(user?.region?.code, {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
          })}
        </span>
      )}
      <div>
        {props.payload[0].value
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')}{' '}
      </div>
      {props.naming || t('visites')}
    </div>
  ) : null
}
