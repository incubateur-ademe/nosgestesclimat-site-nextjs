type Props = {
  value: number
  color: string
  white?: boolean
}

export default function DisplayValue({ value, color, white }: Props) {
  return (
    <div
      className={`leading-none ${white ? 'text-white' : ''}`}
      style={white ? {} : { color }}>
      <strong className="text-lg">
        {value.toLocaleString('fr-fr', {
          maximumFractionDigits: 0,
        })}
      </strong>{' '}
      <span className="font-light text-xs">
        kgCO<sub>2</sub>e
      </span>
    </div>
  )
}
