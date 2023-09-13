import ChoiceInput from '@/components/misc/ChoiceInput'
import { NodeValue } from '@/publicodes-state/types'

type Props = {
  value: NodeValue
  isMissing: boolean
  setValue: (value: string) => void
}

export default function BooleanInput({ value, isMissing, setValue }: Props) {
  return (
    <div className="align flex flex-col items-end">
      <ChoiceInput
        label="Oui"
        active={!isMissing && value ? true : false}
        onClick={() => setValue('oui')}
      />
      <ChoiceInput
        label="Non"
        active={!isMissing && !value ? true : false}
        onClick={() => setValue('non')}
      />
    </div>
  )
}
