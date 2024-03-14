'use client'

import Trans from '@/components/translation/Trans'
import Separator from '@/design-system/layout/Separator'
import Emoji from '@/design-system/utils/Emoji'
import { SimulationRecap } from '@/types/organisations'
import { useMemo } from 'react'
import CategoryListItem from './orgaStatisticsCharts/CategoryListItem'
import RepartitionChart from './orgaStatisticsCharts/RepartitionChart'

export default function OrgaStatisticsCharts({
  simulationRecaps,
}: {
  simulationRecaps: SimulationRecap[]
}) {
  const maxValueOfAllCategories = useMemo(
    () =>
      simulationRecaps?.reduce((acc, obj) => {
        Object.keys(obj.categories ?? {}).forEach((category) => {
          const roundedValue = Math.round(obj.categories[category] / 1000)
          if (roundedValue > acc) {
            acc = roundedValue
          }
        })
        return acc
      }, 0) + 1,
    [simulationRecaps]
  )

  // Calculate the mean for each category
  const meanCategories = useMemo(
    () =>
      Object.keys(simulationRecaps?.[0]?.categories ?? {}).map((category) => {
        const mean = simulationRecaps?.reduce(
          (acc, obj) => acc + obj.categories[category],
          0
        )
        return {
          category,
          value: mean / simulationRecaps?.length,
        }
      }),
    [simulationRecaps]
  )

  const hasCurrentUser = useMemo(
    () => simulationRecaps.some((simulation) => simulation.isCurrentUser),
    [simulationRecaps]
  )

  if (!simulationRecaps || simulationRecaps?.length < 3) return null

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
              value: bilan,
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

            {hasCurrentUser && (
              <div className="flex items-center gap-3">
                <div className="h-4 w-1 bg-secondary-500" />
                <p className="mb-0 text-sm text-gray-600">
                  <Trans>Votre résultat</Trans>
                </p>
              </div>
            )}

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
        <div className="flex items-baseline justify-between md:max-w-[16rem]">
          <h3>
            <Trans>Par catégorie</Trans>
          </h3>
          <p className="mb-0 text-[0.75rem]">
            <Trans>Moyenne :</Trans>
          </p>
        </div>
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
          <div className="sm:mr-10 sm:w-64" />

          <div className="flex flex-1 justify-between">
            <div>
              <strong className="text-lg">0</strong>{' '}
              <span>
                <Trans>tonnes</Trans>
              </span>
            </div>

            {hasCurrentUser && (
              <div className="flex items-center gap-3">
                <div className="h-4 w-1 bg-secondary-500" />
                <p className="mb-0 text-sm text-gray-600">
                  <Trans>Votre résultat</Trans>
                </p>
              </div>
            )}

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
