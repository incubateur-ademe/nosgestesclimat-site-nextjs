import { useLocale } from '@/hooks/useLocale'
import { capitalizeString } from '@/utils/capitalizeString'

// I don't know how to fix it
type Props = any

export default function CustomTooltip(props: Props) {
  const locale = useLocale()

  const date =
    props.period === 'week'
      ? `Semaine du ${new Date(props.label?.split(',')[0]).toLocaleDateString(
          locale,
          {
            day: '2-digit',
            month: '2-digit',
          }
        )} au ${new Date(props.label?.split(',')[1]).toLocaleDateString(
          locale,
          {
            day: '2-digit',
            month: '2-digit',
          }
        )}`
      : props.period === 'month'
        ? `${new Date(props.label).toLocaleDateString(locale, {
            month: 'long',
            year: 'numeric',
          })}`
        : props.period === 'day'
          ? `${new Date(props.label).toLocaleDateString(locale, {
              weekday: 'long',
              day: '2-digit',
              month: 'long',
            })}`
          : ''

  return props.active && props.payload && props.payload.length ? (
    <div className="border border-[#f0f0f0] bg-[#ffffff99] p-4">
      <span>{capitalizeString(date)}</span>
      <div>
        {props.payload[0].value
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')}{' '}
      </div>
    </div>
  ) : null
}
