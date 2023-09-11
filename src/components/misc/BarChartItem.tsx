import DisplayValue from './barChartItem/DisplayValue'

type Props = {
  label: string
  color?: string
  value: number
  max: number
  onClick: (e: any) => void
}

export default function BarChartItem({
  label,
  color = '#ff0000',
  value,
  max,
  onClick,
}: Props) {
  const percentOfMax = (value / max) * 100

  return (
    <button onClick={onClick} className="mb-4 block w-full text-left">
      <div className="mb-1 ml-2 text-sm leading-none text-black">{label}</div>
      <div className="flex h-8 items-center justify-start gap-2 ">
        <div
          className="flex h-full origin-left items-center justify-end rounded-full transition-all"
          style={{
            width: `${percentOfMax}%`,
            backgroundColor: color,
          }}>
          {percentOfMax > 70 ? (
            <DisplayValue color={color} value={value} white />
          ) : null}
        </div>
        {percentOfMax <= 70 ? (
          <DisplayValue color={color} value={value} />
        ) : null}
      </div>
    </button>
  )
}
