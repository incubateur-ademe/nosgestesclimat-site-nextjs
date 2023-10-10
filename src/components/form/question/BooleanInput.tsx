import ChoiceInput from '@/components/misc/ChoiceInput'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { NodeValue } from '@/publicodes-state/types'

type Props = {
  value: NodeValue
  isMissing: boolean
  setValue: (value: string) => void
  id?: string
}

export default function BooleanInput({
  value,
  isMissing,
  setValue,
  id,
}: Props) {
  const { t } = useClientTranslation()
  return (
    <div className="align flex flex-col items-end">
      <ChoiceInput
        label={t('Oui')}
        active={!isMissing && value ? true : false}
        onClick={() => setValue('oui')}
        id={id}
      />
      <ChoiceInput
        label={t('Non')}
        active={!isMissing && !value ? true : false}
        onClick={() => setValue('non')}
      />
    </div>
  )
}
