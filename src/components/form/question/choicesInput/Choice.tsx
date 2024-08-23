import ChoiceInput from '@/components/misc/ChoiceInput'
import Emoji from '@/design-system/utils/Emoji'
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
  ...props
}: Props) {
  const { title, description, icons } = useRule(question + ' . ' + choice)

  return (
    <ChoiceInput
      label={
        <>
          <Emoji className="inline-flex">{title}</Emoji>
          {icons ? (
            <>
              {' '}
              <Emoji className="inline-flex items-center">{icons}</Emoji>
            </>
          ) : null}
        </>
      }
      description={description}
      active={active}
      onClick={() => setValue(choice)}
      id={id}
      {...props}
    />
  )
}
