import { useRule } from '@/publicodes-state'
import Category from './results/Category'

type Props = {
  choices: string[]
}

export default function Results({ choices }: Props) {
  const { numericValue: maxValue } = useRule(choices[0])
  return (
    <div className="mb-4">
      {choices.map((choice, index) => (
        <Category
          key={choice}
          index={index}
          choice={choice}
          isHeaviest={index === 0}
          maxValue={maxValue}
        />
      ))}
    </div>
  )
}
