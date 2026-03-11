'use client'

import Trans from '@/components/translation/trans/TransClient'
import { formatWaterFootprint } from '@/helpers/formatters/formatWaterFootprint'
import { useLocale } from '@/hooks/useLocale'
import { useRules } from '@/hooks/useRules'
import type { Situation } from '@/publicodes-state/types'
import type { DottedName, NGCRules } from '@incubateur-ademe/nosgestesclimat'
import Engine from 'publicodes'
import type { ReactNode } from 'react'

const AVERAGE_CONSUMPTION_IN_LITERS = 149

interface Props {
  situation: Situation
}

interface FuncProps {
  situation: Situation
  rules: Partial<NGCRules>
}

const getDomesticWaterValue = ({ situation, rules }: FuncProps) => {
  const engine = new Engine<DottedName>(rules, {
    strict: {
      situation: false,
      noOrphanRule: false,
      checkPossibleValues: false,
      noCycleRuntime: false,
    },
    warn: {
      cyclicReferences: false,
      situationIssues: false,
    },
  })

  engine.setSituation(situation)

  const evaluation = engine.evaluate({
    valeur: 'logement . eau domestique',
    contexte: {
      métrique: "'eau'",
    },
  })

  return typeof evaluation.nodeValue === 'number' ? evaluation.nodeValue : 149
}

export default function DomesticWaterBlock({ situation }: Props) {
  const { data: rules, isLoading } = useRules()
  const locale = useLocale()

  if (isLoading || !rules) {
    return null
  }

  const domesticWaterValue = getDomesticWaterValue({ situation, rules })

  const { formattedValue, unit } = formatWaterFootprint(domesticWaterValue, {
    locale,
  })

  return (
    <div className="mb-6 self-center">
      <div className="bg-water flex gap-4 rounded-xl p-4 lg:pr-8">
        <svg
          className="h-auto w-8 fill-white"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M37.7916 23.6907L24.197 1.45337L11.5996 23.5387C8.66632 28.2187 8.41032 34.304 11.4916 39.344C15.8716 46.508 25.309 48.808 32.573 44.4867C39.8343 40.1667 42.1716 30.86 37.7916 23.6907Z" />
        </svg>

        <p className="mb-0 text-lg text-white">
          <Trans
            i18nKey="simulation.eau.whatIsWaterFootprint.showerWater.mainText"
            values={{
              formattedValue,
              unit,
            }}>
            <span className="block">Vous utilisez</span>
            <span>
              <strong className="font-black">
                {{ formattedValue } as unknown as ReactNode}{' '}
                {{ unit } as unknown as ReactNode}
              </strong>{' '}
              <span>d'eau domestique par jour</span>
            </span>
          </Trans>
        </p>
      </div>

      <p className="mt-1 mb-0 w-full text-center">
        <Trans
          i18nKey="simulation.eau.whatIsWaterFootprint.showerWater.average"
          values={{ average: AVERAGE_CONSUMPTION_IN_LITERS }}>
          *La moyenne française est de{' '}
          {{ average: AVERAGE_CONSUMPTION_IN_LITERS } as unknown as ReactNode}{' '}
          litres par jour
        </Trans>
      </p>
    </div>
  )
}
