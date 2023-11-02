'use client'

type Props = { color?: string; percentageSquashed: number }

export default function EnigmaticMoreChartBlock({
  color,
  percentageSquashed,
}: Props) {
  return (
    <div
      title={`Autres, ${percentageSquashed.toFixed(
        1
      )}% du total de la catégorie`}
      style={{ backgroundColor: color ?? '', height: `${percentageSquashed}%` }}
      className="relative font-bold text-white">
      <div className="absolute left-1/2 top-1/2 h-8 -translate-x-1/2 -translate-y-1/2 transform">
        ...
      </div>
    </div>
  )
}
