import Arrow from '@/components/fin/metricSlider/carboneTotalChart/Arrow'
import Trans from '@/components/translation/Trans'
import { carboneMetric } from '@/constants/metric'
import InlineLink from '@/design-system/inputs/InlineLink'
import type { Simulation } from '@/types/organisations'
import isMobile from 'is-mobile'
import RepartitionChart from './RepartitionChart'

type Props = {
  simulations: Simulation[]
  maxValue: number
}

export default function MainFootprintChart({ simulations, maxValue }: Props) {
  const shouldUseAbbreviation = isMobile()
  return (
    <section className="mb-12">
      <h3>
        <Trans>Empreinte carbone totale</Trans>
      </h3>

      <div className="flex flex-col">
        <div className="relative h-[4rem] w-full">
          <div
            className="absolute"
            style={{
              left: `${(2 / maxValue) * 100}%`,
              top: '0',
            }}>
            <div className="mt-1 whitespace-nowrap">
              <p className="mb-0">
                <strong className="font-black text-secondary-700">
                  2 tonnes,
                </strong>
              </p>
              <p className="mb-0 text-sm">
                <Trans>c'est l’objectif pour 2050,</Trans>{' '}
                <InlineLink href="/actions">
                  <Trans>on s'y met ?</Trans>
                </InlineLink>
              </p>
            </div>

            <Arrow className="h-4 w-4" />
          </div>
        </div>

        <RepartitionChart
          maxValue={maxValue}
          items={simulations.map(({ computedResults, user }) => ({
            value: computedResults[carboneMetric].bilan,
            shouldBeHighlighted: !!user,
          }))}
          id="bilan"
        />

        <div className="relative mt-4 flex items-baseline justify-between">
          <span className="flex items-center">
            <strong className="text-lg">0</strong>{' '}
          </span>

          <span>
            <strong className="text-lg">{maxValue}</strong>{' '}
            <span>
              {shouldUseAbbreviation ? (
                <Trans>t CO₂e / an</Trans>
              ) : (
                <Trans>tonnes CO₂e / an</Trans>
              )}
            </span>
          </span>
        </div>
      </div>
    </section>
  )
}
