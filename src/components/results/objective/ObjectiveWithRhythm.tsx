import DownArrow from '@/components/icons/DownArrow'
import Trans from '@/components/translation/trans/TransServer'
import Badge from '@/design-system/layout/Badge'
import { formatCarbonFootprint } from '@/helpers/formatters/formatCarbonFootprint'
import type { Locale } from '@/i18nConfig'
import { twMerge } from 'tailwind-merge'

interface Props {
  carbonFootprint: number
  locale: Locale
}

const MAX_CARBON_FOOTPRINT = 7000

const MIN_CARBON_FOOTPRINT = 4000

const OVER_7_TONS_YEAR_OBJECTIVE = 2030

const UNDER_7_TONS_YEAR_OBJECTIVE = 2040

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

  switch (true) {
    case carbonFootprint > MAX_CARBON_FOOTPRINT:
      return {
        displayValue: formattedValue,
        unit,
        reductionAmount:
          (carbonFootprint - MAX_CARBON_FOOTPRINT) /
            OVER_7_TONS_YEAR_OBJECTIVE -
          currentYear,
        titleClassName: 'text-red-900',
      }
    case carbonFootprint > MIN_CARBON_FOOTPRINT &&
      carbonFootprint < MAX_CARBON_FOOTPRINT:
      return {
        displayValue: formattedValue,
        unit,
        reductionAmount:
          (MIN_CARBON_FOOTPRINT - carbonFootprint) /
          (UNDER_7_TONS_YEAR_OBJECTIVE - currentYear),
        titleClassName: 'text-orange-900',
      }
    default:
      return {
        displayValue: formattedValue,
        unit,
        reductionAmount: 0,
        titleClassName: 'text-green-900',
      }
  }
}

export default function ObjectiveWithRhythm({
  locale,
  carbonFootprint,
}: Props) {
  const { displayValue, unit, reductionAmount, titleClassName } =
    getObjectiveData({
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
        <div
          className={twMerge(
            'flex-1 rounded-lg px-6 py-4',
            carbonFootprint > MAX_CARBON_FOOTPRINT
              ? 'bg-red-50'
              : carbonFootprint > MIN_CARBON_FOOTPRINT
                ? 'bg-orange-50'
                : 'bg-green-50'
          )}>
          <h3 className={twMerge('mb-2 text-2xl font-bold', titleClassName)}>
            {displayValue} {unit}{' '}
            <Trans locale={locale} i18nKey="common.co2eAn">
              CO₂e / an
            </Trans>
          </h3>

          <p className="mb-0">
            {carbonFootprint > MAX_CARBON_FOOTPRINT ? (
              <Trans
                locale={locale}
                i18nKey="results.objective.over7.description">
                Aujourd’hui, vous êtes{' '}
                <strong>au-dessus de la moyenne nationale </strong>
              </Trans>
            ) : carbonFootprint > MIN_CARBON_FOOTPRINT ? (
              <Trans
                locale={locale}
                i18nKey="results.objective.over4.description">
                Bravo, aujourd’hui vous êtes déjà{' '}
                <strong>en transition vers l’objectif intermédiaire</strong> de
                4T en 2040
              </Trans>
            ) : (
              <>
                <strong className="block">
                  <Trans
                    locale={locale}
                    i18nKey="results.objective.under4.description.title">
                    Vous êtes déjà sous les 4 tonnes, bravo !
                  </Trans>
                </strong>
                <span className="block w-lg max-w-full">
                  <Trans
                    locale={locale}
                    i18nKey="results.objective.under4.description.body">
                    Avec le travail de l’Etat et toute la société dans les
                    décennies à venir, votre empreinte devrait naturellement
                    diminuer pour se rapprocher des 2T. Ce qu’il vous reste à
                    faire ? Persévérer dans votre être et… convaincre les autres
                    !
                  </Trans>
                </span>
              </>
            )}
          </p>
        </div>

        {!!reductionAmount && (
          <>
            <DownArrow className="fill-default h-6 w-6 self-center md:-rotate-90" />

            <div className="bg-primary-50 rounded-lg px-6 py-4">
              <p className="mb-2">
                {carbonFootprint > MAX_CARBON_FOOTPRINT ? (
                  <Trans
                    locale={locale}
                    i18nKey="results.objective.reduction.over7.description">
                    Votre rythme indicatif pour parvenir à{' '}
                    <strong>7T en 2030</strong>
                  </Trans>
                ) : (
                  <Trans
                    locale={locale}
                    i18nKey="results.objective.reduction.over4.description">
                    Votre rythme indicatif pour parvenir à{' '}
                    <strong>4T en 2040</strong>
                  </Trans>
                )}
              </p>

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
