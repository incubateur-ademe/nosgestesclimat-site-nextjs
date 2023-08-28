import AnswerRow from './AnswerRow'

type Props = {
  rules: string[]
  level: number
}

export default function AnwsersTable({ rules, level }: Props) {
  return (
    <table className="w-full">
      <tbody className="w-full">
        {rules.map((ruleDottedName) => (
          <AnswerRow
            key={ruleDottedName}
            level={level}
            ruleDottedName={ruleDottedName}
          />
        ))}
      </tbody>
    </table>
  )
}
