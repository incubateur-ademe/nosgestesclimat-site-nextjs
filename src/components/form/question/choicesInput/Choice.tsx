import ChoiceInput from '@/components/misc/ChoiceInput'
import { useRule } from '@/publicodes-state'

type Props = {
  question: string
  choice: string
  active: boolean
  setValue: any
  id?: string
}

export default function Choice({
  question,
  choice,
  active,
  setValue,
  id,
}: Props) {
  const { title, description, icons } = useRule(question + ' . ' + choice)

  return (
    <ChoiceInput
      label={
        <>
          {title}
          {icons ? <span className="whitespace-nowrap">{icons}</span> : null}
        </>
      }
      description={description}
      active={active}
      onClick={() => setValue(choice)}
      id={id}
    />
  )
}
