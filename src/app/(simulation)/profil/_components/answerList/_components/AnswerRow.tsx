'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useForm, useRule } from '@/publicodes-state'
import { useRouter } from 'next/navigation'

type AnswerProps = {
  ruleDottedName: string
  level: number
}

export default function Answer({ ruleDottedName, level }: AnswerProps) {
  const { t } = useClientTranslation()

  const router = useRouter()

  const { setCurrentQuestion } = useForm()

  const rule = useRule(ruleDottedName)

  const translateUnits = (units: string[]) => {
    return units.map((unit: string) => t(unit, { ns: 'units' }))
  }

  const levelDottedName = ruleDottedName.split(' . ')

  let levelRule = undefined

  try {
    levelRule = useRule(
      (levelDottedName.slice(0, level + 1) as any).join(' . ')
    )
  } catch (e) {
    console.log('useRule error:', e)
  }

  if (rule.unit?.denominators) {
    rule.unit.denominators = translateUnits(rule.unit.denominators)
  }
  if (rule.unit?.numerators) {
    rule.unit.numerators = translateUnits(rule.unit.numerators)
  }

  return (
    <tr key={ruleDottedName} className="bg-primaryLight w-full even:bg-white">
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
          className="inline-block p-4 w-full text-right font-medium"
          onClick={() => {
            setCurrentQuestion(ruleDottedName)
            router.push('/simulateur/bilan')
          }}>
          <span
            className={`decoration-dashed underline-offset-4 inline-block underline`}>
            {rule.displayValue?.toLocaleString()} {rule.unit}
            {/* rule.passedQuestion && (
              <span role="img" aria-label="shoulder emoji">
                🤷🏻
              </span>
            )
            */}
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
