import Button from '@/design-system/inputs/Button'
import { useRule } from '@/publicodes-state'
type Props = {
  question: string
  title: string
  icons: string
  description: string
}

export default function NumberInput({
  question,
  title,
  icons,
  description,
}: Props) {
  const { value, setValue, isMissing } = useRule(question)

  // Model shenanigans for description split...
  return (
    <div
      className={
        'flex gap-4 items-center justify-between rounded  bg-grey-100 p-4'
      }>
      <div>
        <span className="text-xl font-semibold">
          {title}&nbsp;{icons}
        </span>
        {description ? (
          <>
            <br />
            <p className="mb-0 text-sm italic">{description.split('\n')[0]}</p>
          </>
        ) : null}
      </div>
      <div className="flex items-center">
        <Button
          disabled={value === 0}
          onClick={() => setValue(value - 1)}
          className="z-10 h-10 w-10">
          -
        </Button>
        <input
          className="bg-transparent-100 w-10 text-center"
          type="number"
          value={isMissing ? '' : value}
          placeholder={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <Button onClick={() => setValue(value + 1)} className="z-10 h-10 w-10">
          +
        </Button>
      </div>
    </div>
  )
}
