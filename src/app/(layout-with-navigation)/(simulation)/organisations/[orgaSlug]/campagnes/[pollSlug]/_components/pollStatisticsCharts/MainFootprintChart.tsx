import Arrow from '@/components/fin/totalChart/Arrow'
import Trans from '@/components/translation/Trans'
import InlineLink from '@/design-system/inputs/InlineLink'
import { SimulationRecap } from '@/types/organisations'
import RepartitionChart from './RepartitionChart'

type Props = {
  simulationRecaps: SimulationRecap[]
  maxValue: number
}

export default function MainFootprintChart({
  simulationRecaps,
  maxValue,
}: Props) {
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
          items={simulationRecaps.map(({ bilan, isCurrentUser }) => ({
            value: bilan,
            shouldBeHighlighted: isCurrentUser,
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
              <Trans>tonnes</Trans>
            </span>
          </span>
        </div>
      </div>
    </section>
  )
}
