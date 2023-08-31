import { useRule } from '@/publicodes-state'

import Choice from './choicesInput/Choice'

type Props = {
  question: string
}

export default function ChoicesInput({ question }: Props) {
  const { value, isMissing, choices, setValue } = useRule(question)

  return (
    <div className="align flex flex-col items-end">
      {choices &&
        choices.map((choice: any) => (
          <Choice
            key={choice}
            question={question}
            choice={choice}
            active={!isMissing && value === choice}
            setValue={setValue}
          />
        ))}
    </div>
  )
}
