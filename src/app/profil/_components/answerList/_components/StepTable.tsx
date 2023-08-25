import { Category } from '@/types/model'
import Answer from './Answer'

type Props = {
  rules: Category[]
  level: number
}

export default function StepsTable({ rules, level }: Props) {
  return (
    <table>
      <tbody>
        {rules.map((rule) => (
          <Answer key={rule.dottedName} level={level} rule={rule} />
        ))}
      </tbody>
    </table>
  )
}
