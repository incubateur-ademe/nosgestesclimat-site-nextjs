import { useRule } from '@/publicodes-state'

type Props = {
  question: string
}

export default function NumberInput({ question }: Props) {
  const { unit, value, isMissing, setValue } = useRule(question)

  return (
    <div className="flex items-center justify-end gap-1">
      <input
        className={
          'text-right rounded border border-primary bg-grey-100 p-2 transition-colors focus:border-primary focus:ring-2 focus:ring-primary'
        }
        type="number"
        value={isMissing ? '' : value}
        placeholder={value.toLocaleString('fr-fr', {
          maximumFractionDigits: 1,
        })}
        onChange={(event) => setValue(Number(event.target.value))}
      />
      &nbsp;
      {unit}
    </div>
  )
}
