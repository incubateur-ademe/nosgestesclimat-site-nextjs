import ChoiceInput from '@/components/misc/ChoiceInput'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { NodeValue } from '@incubateur-ademe/nosgestesclimat'

type Props = {
  value: NodeValue
  isMissing: boolean
  setValue: (value: string) => void
  'data-cypress-id': string
  label: string
  firstInputId?: string
}

export default function BooleanInput({
  value,
  isMissing,
  setValue,
  label,
  firstInputId,
  ...props
}: Props) {
  const { t } = useClientTranslation()

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="sr-only">{label}</legend>

      <ChoiceInput
        label={t('Oui')}
        labelText={t('Oui')}
        active={!isMissing && value ? true : false}
        onClick={() => setValue('oui')}
        {...props}
        data-cypress-id={`${props['data-cypress-id']}-oui`}
        id={firstInputId}
      />

      <ChoiceInput
        label={t('Non')}
        labelText={t('Non')}
        active={!isMissing && !value ? true : false}
        onClick={() => setValue('non')}
        {...props}
        data-cypress-id={`${props['data-cypress-id']}-non`}
      />
    </fieldset>
  )
}
