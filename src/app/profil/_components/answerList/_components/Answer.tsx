'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useForm, useRule } from '@/publicodes-state'
import { Category } from '@/types/model'
import { useRouter } from 'next/navigation'

type AnswerProps = {
  rule: Category
  level: number
}

export default function Answer({ rule, level }: AnswerProps) {
  const { t } = useClientTranslation()

  const router = useRouter()

  const { setCurrentQuestion } = useForm()

  const translateUnits = (units: string[]) => {
    return units.map((unit: string) => t(unit, { ns: 'units' }))
  }

  const levelDottedName = rule.dottedName.split(' . ')

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
    <tr key={rule.dottedName} className="bg-primaryLight">
      <td>
        {levelRule && (
          <div>
            <small>{levelRule.title}</small>
          </div>
        )}
        <div>{rule.title}</div>
      </td>
      <td>
        <button
          className="inline-block p-2 w-full text-left font-medium"
          onClick={() => {
            setCurrentQuestion(rule.dottedName)
            router.push('/simulateur/bilan')
          }}>
          <span
            className={`decoration-dashed underline-offset-4 inline-block underline ${
              rule.passedQuestion ? 'opacity-50' : ''
            }}`}>
            {rule.value}
            {rule.passedQuestion && (
              <span role="img" aria-label="shoulder emoji">
                🤷🏻
              </span>
            )}
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
