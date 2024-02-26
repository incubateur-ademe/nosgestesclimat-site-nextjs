'use client'

import Trans from '@/components/translation/Trans'
import Separator from '@/design-system/layout/Separator'
import Emoji from '@/design-system/utils/Emoji'
import { SimulationRecap } from '@/types/organisations'
import CategoryListItem from './orgaStatisticsCharts/CategoryListItem'
import RepartitionChart from './orgaStatisticsCharts/RepartitionChart'

export default function OrgaStatisticsCharts({
  simulationRecaps,
}: {
  simulationRecaps: SimulationRecap[]
}) {
  if (!simulationRecaps || simulationRecaps?.length <= 1) return null

  const maxValueOfAllCategories = simulationRecaps?.reduce((acc, obj) => {
    Object.keys(obj.categories).forEach((category) => {
      const roundedValue = Math.round(obj.categories[category] / 1000)
      if (roundedValue > acc) {
        acc = roundedValue
      }
    })
    return acc
  }, 0)

  // Calculate the mean for each category
  const meanCategories = Object.keys(simulationRecaps?.[0]?.categories).map(
    (category) => {
      const mean = simulationRecaps?.reduce(
        (acc, obj) => acc + obj.categories[category],
        0
      )
      return {
        category,
        value: mean / 1000 / simulationRecaps?.length,
      }
    }
  )

  return (
    <section className="my-12 rounded-lg bg-grey-100 px-8 pb-4 pt-8">
      <h2>
        <Trans>Résultats du groupe</Trans>
      </h2>

      <p>
        <Trans>
          Chaque participation est représentée par une barre verticale. Votre
          score est affiché en rose.
        </Trans>
      </p>

      <Separator />

      <section className="mb-12">
        <h3>
          <Trans>Empreinte carbone</Trans>
        </h3>

        <div className="flex flex-col">
          <RepartitionChart
            maxValue={29}
            items={simulationRecaps.map(({ bilan, isCurrentUser }) => ({
              value: bilan / 1000,
              shouldBeHighlighted: isCurrentUser,
            }))}
            id="bilan"
          />

          <div className="mt-4 flex items-baseline justify-between">
            <span>
              <Emoji className="text-xl">🎯</Emoji>{' '}
              <strong className="text-lg">2</strong>{' '}
              <span>
                <Trans>tonnes</Trans>
              </span>
            </span>

            <div className="flex items-center gap-3">
              <div className="bg-secondary-500 h-4 w-1" />
              <p className="mb-0 text-sm text-gray-600">
                <Trans>Votre résultat</Trans>
              </p>
            </div>

            <span>
              <strong className="text-lg">29</strong>{' '}
              <span>
                <Trans>tonnes</Trans>
              </span>
            </span>
          </div>
        </div>
      </section>

      <section>
        <h3>
          <Trans>Par catégorie</Trans>
        </h3>
        <ul>
          {simulationRecaps?.length > 0 &&
            Object.keys(simulationRecaps[0].categories).map(
              (category, index) => (
                <CategoryListItem
                  key={index}
                  category={category}
                  value={meanCategories ? meanCategories[index].value : 0}
                  simulationsRecap={simulationRecaps}
                  maxValue={maxValueOfAllCategories}
                />
              )
            )}
        </ul>
        <div className="flex justify-between py-2">
          <div className="mr-10 w-64" />

          <div className="flex flex-1 justify-between">
            <div>
              <strong className="text-lg">0</strong>{' '}
              <span>
                <Trans>tonnes</Trans>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-secondary-500 h-4 w-1" />
              <p className="mb-0 text-sm text-gray-600">
                <Trans>Votre résultat</Trans>
              </p>
            </div>

            <div>
              <strong className="text-lg">{maxValueOfAllCategories}</strong>{' '}
              <span>
                <Trans>tonnes</Trans>
              </span>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
