'use client'

import InformationIconWithTooltip from '@/components/messages/InformationIconWithTooltip'
import Trans from '@/components/translation/Trans'
import Separator from '@/design-system/layout/Separator'
import { SimulationRecap } from '@/types/organisations'
import { useMemo } from 'react'
import CategoryListItem from './pollStatisticsCharts/CategoryListItem'
import MainFootprintChart from './pollStatisticsCharts/MainFootprintChart'

export default function PollStatisticsCharts({
  simulationRecaps,
  isAdmin,
}: {
  simulationRecaps: SimulationRecap[]
  isAdmin?: boolean
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

  const maxValueOfAllSimulations = useMemo(
    () =>
      simulationRecaps?.reduce((acc, obj) => {
        const roundedValue = Math.round(obj.bilan / 1000)
        if (roundedValue > acc) {
          acc = roundedValue
        }
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
    <section className="my-12 rounded-xl bg-gray-100 px-8 pb-4 pt-8">
      <h2>
        <Trans>Répartition des empreintes carbone</Trans>
        <InformationIconWithTooltip
          id="resultats-groupe"
          className="ml-1 inline-block">
          <>
            <p className="mb-1 text-sm">
              <Trans>
                Chaque participation est représentée par une barre verticale.
                Votre score est affiché en{' '}
                <span className="font-bold text-secondary-700">rose</span>.
              </Trans>
            </p>
            <p className="mb-0 text-sm">
              <Trans>
                Pour faciliter la lecture, les valeurs supérieures à 100 t sont
                retirées.
              </Trans>{' '}
              {isAdmin && (
                <Trans>
                  Elle seront toutefois prises en compte lors de l'export de
                  données.
                </Trans>
              )}
            </p>
          </>
        </InformationIconWithTooltip>
      </h2>

      <Separator />

      <MainFootprintChart
        simulationRecaps={simulationRecaps}
        maxValue={maxValueOfAllSimulations + 1}
      />

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
                <div className="h-4 w-1 bg-secondary-700" />
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
