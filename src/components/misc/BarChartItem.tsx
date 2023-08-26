import DisplayValue from './barChartItem/DisplayValue'

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
      <div className="leading-none text-black mb-1 text-sm ml-2">{label}</div>
      <div className="flex justify-start items-center gap-2 h-8 ">
        <div
          className="flex justify-end items-center h-full origin-left transition-all rounded-full"
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
