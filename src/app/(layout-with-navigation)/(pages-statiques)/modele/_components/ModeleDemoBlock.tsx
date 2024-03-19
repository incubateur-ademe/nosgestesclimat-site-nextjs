'use client'

import Link from '@/components/Link'
import { formatCarbonFootprint } from '@/helpers/formatCarbonFootprint'
import { useRules } from '@/hooks/useRules'
import { safeEvaluateHelper } from '@/publicodes-state/helpers/safeEvaluateHelper'
import { safeGetSituation } from '@/publicodes-state/helpers/safeGetSituation'
import { DottedName, Rules, Situation } from '@/publicodes-state/types'
import { encodeRuleName } from '@/utils/publicodes/encodeRuleName'
import Engine, { Evaluation } from 'publicodes'
import { useEffect, useMemo, useState } from 'react'

const demoDottedNames = [
  'commun . intensité électricité',
  'transport . voiture . thermique . empreinte au litre',
  "logement . construction . durée d'amortissement",
]

const indicatorsKeys = ['bilan', 'transport', 'logement']

export default function ModeleDemoBlock() {
  const [situation, setSituation] = useState<Situation>({})
  const [indicators, setIndicators] = useState<{
    [k: (typeof indicatorsKeys)[number]]: Evaluation | null
  }>(Object.fromEntries(indicatorsKeys.map((el) => [el, null])))

  const { data: rules } = useRules({ isOptim: false })

  const engine = useMemo<Engine | null>(
    () => (rules ? new Engine(rules as Rules) : null),
    [rules]
  )

  //TODO: this is shit
  useEffect(() => {
    if (engine && situation) {
      const rules = Object.keys(engine.getParsedRules())

      const safeSituation: Situation = safeGetSituation({
        situation,
        everyRules: rules,
      })

      engine.setSituation(safeSituation as any)
    }

    setIndicators(
      Object.fromEntries(
        indicatorsKeys.map((indicator) => [
          indicator,
          safeEvaluateHelper(indicator, engine)?.nodeValue,
        ])
      )
    )
  }, [situation, engine])

  const onChange = (dottedName: DottedName, value: string) =>
    setSituation({ ...situation, [dottedName]: value })

  const defaultValues = demoDottedNames.reduce(
    (obj, el) => {
      if (!engine) return obj

      obj[el] = safeEvaluateHelper(el, engine)?.nodeValue

      return obj
    },
    {} as { [key: (typeof demoDottedNames)[number]]: Evaluation }
  )

  return (
    <div className="my-4 rounded-md bg-primary-100 p-4">
      <ul>
        {demoDottedNames.map((el) => (
          <li key={el} className="mb-2">
            <label className="flex justify-between">
              <Link href={'/documentation/' + encodeRuleName(el)}>{el}</Link>{' '}
              <span>
                <input
                  type="number"
                  className="rounded-md border border-gray-300 pl-2"
                  value={situation[el] as number}
                  placeholder={defaultValues[el] as string}
                  onChange={(e) =>
                    onChange(el, e.target.value === '' ? '' : e.target.value)
                  }
                />
                &nbsp;{(rules as Rules)?.[el]?.unité}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <div className="mt-4 text-center">
        <span className="block text-2xl font-bold md:text-3xl">
          {formatCarbonFootprint(indicators?.bilan as string).formattedValue}{' '}
          {formatCarbonFootprint(indicators.bilan as string).unit}
        </span>
        <span className="block text-sm md:text-base">
          de CO<sub>2</sub>e / an
        </span>

        <small className="mx-auto block text-center">
          Dont {Math.round(indicators['transport'] as number)} kgCO2e de
          transport et {Math.round(indicators.logement as number)} kgCO2e de
          logement.
        </small>
      </div>
    </div>
  )
}
