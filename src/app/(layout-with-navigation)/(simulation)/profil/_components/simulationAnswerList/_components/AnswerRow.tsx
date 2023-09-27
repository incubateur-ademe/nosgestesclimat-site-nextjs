'use client'

import { useForm, useRule } from '@/publicodes-state'
import { useRouter } from 'next/navigation'

type AnswerProps = {
  ruleDottedName: string
  level: number
}

export default function Answer({ ruleDottedName, level }: AnswerProps) {
  const router = useRouter()

  const { setCurrentQuestion } = useForm()

  const rule = useRule(ruleDottedName)

  const levelDottedName = ruleDottedName.split(' . ')

  const levelRule = useRule(
    (levelDottedName.slice(0, level + 1) as any).join(' . ')
  )

  console.log('TODO : handle storedAmortissement here')
  return (
    <tr key={ruleDottedName} className="w-full bg-primaryLight even:bg-white">
      <td className="pl-2">
        {levelRule && (
          <div>
            <small>{levelRule.title}</small>
          </div>
        )}
        <div>{rule.title}</div>
      </td>
      <td>
        <button
          className="inline-block w-full p-4 text-right font-medium"
          onClick={() => {
            setCurrentQuestion(ruleDottedName)
            router.push(
              `/simulateur/bilan?question=${ruleDottedName.replaceAll(' ', '')}`
            )
          }}>
          <span
            className={`inline-block underline decoration-dotted underline-offset-4`}>
            {rule.displayValue?.toLocaleString()} {rule.unit}
          </span>
        </button>
        {/*storedTrajets[rule.dottedName] &&
          storedTrajets[rule.dottedName].length > 0 && (
            <details
              className="ui__"
              css={`
                max-width: 20rem;
                margin-right: 0px;
                margin-left: auto;
              `}>
              <summary
                css={`
                  text-align: end !important;
                `}>
                <Trans>Voir en détails</Trans>
              </summary>
              <AnswerTrajetsTable
                trajets={storedTrajets[rule.dottedName]}></AnswerTrajetsTable>
            </details>
          )*/}
      </td>
    </tr>
  )
}
