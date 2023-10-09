import { useLocale } from '@/hooks/useLocale'

type Props = {
  value: number
  color: string
  white?: boolean
}

export default function DisplayValue({ value, color, white }: Props) {
  const locale = useLocale()

  return (
    <div
      className={` pr-4 leading-none ${white ? 'text-white' : ''}`}
      style={white ? {} : { color }}
    >
      <strong className="text-lg">
        {value.toLocaleString(locale, {
          maximumFractionDigits: 0,
        })}
      </strong>{' '}
      <span className="text-xs font-light">
        kgCO<sub>2</sub>e
      </span>
    </div>
  )
}
