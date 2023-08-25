type Props = {
  label: string
  color: string
  value: number
  max: number
  onClick: (e: any) => void
}

export default function BarChartItem({
  label,
  color,
  value,
  max,
  onClick,
}: Props) {
  const percentOfMax = (value / max) * 100

  return (
    <button onClick={onClick} className="mb-4 block w-full text-left">
      <div className="leading-none font-semibold text-black mb-1 text-sm">
        {label}
      </div>
      <div
        className="flex justify-end items-center h-6 px-4  origin-left transition-transform rounded-full"
        style={{
          width: `${percentOfMax}%`,
          backgroundColor: color,
        }}>
        <div className="leading-none text-xs text-white">
          <strong>
            {value.toLocaleString('fr-fr', {
              maximumFractionDigits: 0,
            })}
          </strong>{' '}
          kgCO<sub>2</sub>e
        </div>
      </div>
    </button>
  )
}
