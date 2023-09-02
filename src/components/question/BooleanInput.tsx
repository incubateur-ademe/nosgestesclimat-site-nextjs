import ChoiceInput from '@/components/misc/ChoiceInput'

type Props = {
  value: string
  isMissing: boolean
  setValue: (value: string) => void
}

export default function BooleanInput({ value, isMissing, setValue }: Props) {
  return (
    <div className="align flex flex-col items-end">
      <ChoiceInput
        label="Oui"
        active={!(isMissing && value)}
        onClick={() => setValue('oui')}
      />
      <ChoiceInput
        label="Non"
        active={!(isMissing && !value)}
        onClick={() => setValue('non')}
      />
    </div>
  )
}
