import DownArrow from '@/components/icons/DownArrow'
import {
  FIRST_OBJECTIVE,
  SECOND_OBJECTIVE,
  THIRD_OBJECTIVE,
} from '@/components/results/objective/_constants/objectives'
import Trans from '@/components/translation/trans/TransServer'
import Badge from '@/design-system/layout/Badge'
import { formatCarbonFootprint } from '@/helpers/formatters/formatCarbonFootprint'
import type { Locale } from '@/i18nConfig'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  carbonFootprint: number
  locale: Locale
}

const getObjectiveData = ({
  carbonFootprint,
  locale,
}: {
  carbonFootprint: number
  locale: Locale
}) => {
  const currentYear = new Date().getFullYear()

  const { formattedValue, unit } = formatCarbonFootprint(carbonFootprint, {
    locale,
  })

  const getReductionData = () => {
    const secondObjectiveNumber = SECOND_OBJECTIVE.value / 1000

    if (carbonFootprint > FIRST_OBJECTIVE.value) {
      const year = FIRST_OBJECTIVE.year
      const firstObjectiveNumber = FIRST_OBJECTIVE.value / 1000
      return {
        reductionAmount:
          (carbonFootprint - FIRST_OBJECTIVE.value) /
          Math.max(1, year - currentYear),
        titleClassName: 'text-red-900',
        bgClassName: 'bg-red-50',
        description: (
          <Trans locale={locale} i18nKey="results.objective.over7.description">
            Aujourd'hui, vous êtes{' '}
            <strong>au-dessus de la moyenne nationale </strong>
          </Trans>
        ),
        reductionDescription: (
          <Trans
            locale={locale}
            i18nKey="results.objective.reduction.over7.description"
            values={{ year, firstObjectiveNumber }}>
            Votre rythme indicatif pour parvenir à{' '}
            <strong>
              {{ firstObjectiveNumber } as unknown as ReactNode}T en{' '}
              {{ year } as unknown as ReactNode}
            </strong>
          </Trans>
        ),
      }
    }

    if (carbonFootprint > SECOND_OBJECTIVE.value) {
      const year = SECOND_OBJECTIVE.year

      return {
        reductionAmount:
          (carbonFootprint - SECOND_OBJECTIVE.value) /
          Math.max(1, year - currentYear),
        titleClassName: 'text-orange-900',
        bgClassName: 'bg-orange-50',
        description: (
          <Trans
            locale={locale}
            i18nKey="results.objective.over4.description"
            values={{ year, secondObjectiveNumber }}>
            Bravo, aujourd'hui vous êtes déjà{' '}
            <strong>en transition vers l'objectif intermédiaire</strong> de{' '}
            <strong>
              {{ secondObjectiveNumber } as unknown as ReactNode}T en{' '}
              {{ year } as unknown as ReactNode}
            </strong>
          </Trans>
        ),
        reductionDescription: (
          <Trans
            locale={locale}
            i18nKey="results.objective.reduction.over4.description"
            values={{ year, secondObjectiveNumber }}>
            Votre rythme indicatif pour parvenir à{' '}
            <strong>
              {{ secondObjectiveNumber } as unknown as ReactNode}T en{' '}
              {{ year } as unknown as ReactNode}
            </strong>
          </Trans>
        ),
      }
    }

    const thirdObjectiveNumber = THIRD_OBJECTIVE.value / 1000

    return {
      reductionAmount: 0,
      titleClassName: 'text-green-900',
      bgClassName: 'bg-green-50',
      description: (
        <>
          <strong className="block">
            <Trans
              locale={locale}
              i18nKey="results.objective.under4.description.title"
              values={{ secondObjectiveNumber }}>
              Vous êtes déjà sous les{' '}
              {{ secondObjectiveNumber } as unknown as ReactNode} tonnes, bravo
              !
            </Trans>
          </strong>
          <span className="block w-lg max-w-full">
            <Trans
              locale={locale}
              i18nKey="results.objective.under4.description.body"
              values={{ thirdObjectiveNumber }}>
              Avec le travail de l'Etat et toute la société dans les décennies à
              venir, votre empreinte devrait naturellement diminuer pour se
              rapprocher des {{ thirdObjectiveNumber } as unknown as ReactNode}
              T. Ce qu'il vous reste à faire ? Persévérer dans votre être et…
              convaincre les autres !
            </Trans>
          </span>
        </>
      ),
      reductionDescription: null,
    }
  }

  return {
    displayValue: formattedValue,
    unit,
    ...getReductionData(),
  }
}

export default function ObjectiveWithRhythm({
  locale,
  carbonFootprint,
}: Props) {
  const {
    displayValue,
    unit,
    reductionAmount,
    titleClassName,
    bgClassName,
    description,
    reductionDescription,
  } = getObjectiveData({
    carbonFootprint,
    locale,
  })

  const { formattedValue: reductionDisplayValue, unit: reductionUnit } =
    reductionAmount
      ? formatCarbonFootprint(reductionAmount, {
          locale,
        })
      : {}

  return (
    <div className="rounded-lg border border-slate-300 p-6">
      <div className="mb-2">
        <Badge className="border-none text-base" color="secondary">
          <Trans locale={locale} i18nKey="common.vous">
            Vous
          </Trans>
        </Badge>
      </div>
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className={twMerge('flex-1 rounded-lg px-6 py-4', bgClassName)}>
          <h3 className={twMerge('mb-2 text-2xl font-bold', titleClassName)}>
            {displayValue} {unit}{' '}
            <Trans locale={locale} i18nKey="common.co2eAn">
              CO₂e / an
            </Trans>
          </h3>

          <p className="mb-0">{description}</p>
        </div>

        {!!reductionAmount && (
          <>
            <DownArrow className="fill-default h-6 w-6 self-center md:-rotate-90" />

            <div className="bg-primary-50 flex-1 rounded-lg px-6 py-4">
              <p className="mb-2">{reductionDescription}</p>

              <p className="text-2xl font-bold">
                {reductionDisplayValue} {reductionUnit}{' '}
                <Trans locale={locale} i18nKey="common.parAn">
                  par an
                </Trans>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
