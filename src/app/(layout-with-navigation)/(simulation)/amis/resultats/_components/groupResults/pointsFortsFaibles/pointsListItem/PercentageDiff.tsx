import { formatValue } from 'publicodes'

export default function PercentageDiff({ value }: { value: number }) {
  return (
    <span
      className={`ml-3 inline-block ${
        Math.round(value) === 0
          ? ''
          : value > 0
          ? 'text-red-600'
          : 'text-green-700'
      } text-xs`}>
      <span>{Math.round(value) === 0 ? '' : value < 0 ? '' : '+'}</span>
      {Math.round(value) === 0
        ? '='
        : `${formatValue(value, { precision: 0 })}%`}
    </span>
  )
}
