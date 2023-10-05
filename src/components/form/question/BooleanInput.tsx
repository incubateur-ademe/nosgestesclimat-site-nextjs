import ChoiceInput from '@/components/misc/ChoiceInput'
import { NodeValue } from '@/publicodes-state/types'

type Props = {
  value: NodeValue
  isMissing: boolean
  setValue: (value: string) => void
  'data-cypress-id': string
  label: string
}

export default function BooleanInput({
  value,
  isMissing,
  setValue,
  label,
  ...props
}: Props) {
  return (
    <fieldset className="align flex flex-col items-end">
      <legend className="sr-only">{label}</legend>

      <ChoiceInput
        label="Oui"
        active={!isMissing && value ? true : false}
        onClick={() => setValue('oui')}
        data-cypress-id={`${props['data-cypress-id']}-oui`}
      />

      <ChoiceInput
        label="Non"
        active={!isMissing && !value ? true : false}
        onClick={() => setValue('non')}
        data-cypress-id={`${props['data-cypress-id']}-non`}
      />
    </fieldset>
  )
}
