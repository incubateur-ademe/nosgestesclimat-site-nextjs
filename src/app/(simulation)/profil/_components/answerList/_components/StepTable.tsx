import Answer from './Answer'

type Props = {
  rules: string[]
  level: number
}

export default function StepsTable({ rules, level }: Props) {
  return (
    <table className="w-full">
      <tbody className="w-full">
        {rules.map((ruleDottedName) => (
          <Answer
            key={ruleDottedName}
            level={level}
            ruleDottedName={ruleDottedName}
          />
        ))}
      </tbody>
    </table>
  )
}
