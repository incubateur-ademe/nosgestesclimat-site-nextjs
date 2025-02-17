'use client'

import InformationIconWithTooltip from '@/components/messages/InformationIconWithTooltip'
import TransClient from '@/components/translation/trans/TransClient'
import { carboneMetric } from '@/constants/metric'
import Separator from '@/design-system/layout/Separator'
import type { Simulation } from '@/types/organisations'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import isMobile from 'is-mobile'
import { useMemo } from 'react'
import CategoryListItem from './pollStatisticsCharts/CategoryListItem'
import MainFootprintChart from './pollStatisticsCharts/MainFootprintChart'

export default function PollStatisticsCharts({
  simulations,
  isAdmin,
}: {
  simulations: Simulation[]
  isAdmin?: boolean
}) {
  const maxValueOfAllCategories = useMemo(
    () =>
      simulations?.reduce((acc, obj) => {
        ;(
          Object.keys(
            obj.computedResults[carboneMetric].categories ?? {}
          ) as DottedName[]
        ).forEach((category) => {
          const roundedValue = Math.round(
            obj.computedResults[carboneMetric].categories[category] / 1000
          )
          if (roundedValue > acc) {
            acc = roundedValue
          }
        })
        return acc
      }, 0) + 1,
    [simulations]
  )

  const maxValueOfAllSimulations = useMemo(
    () =>
      simulations?.reduce((acc, obj) => {
        const roundedValue = Math.round(
          obj.computedResults[carboneMetric].bilan / 1000
        )
        if (roundedValue > acc) {
          acc = roundedValue
        }
        return acc
      }, 0) + 1,
    [simulations]
  )

  // Calculate the mean for each category
  const meanCategories = useMemo(
    () =>
      (
        Object.keys(
          simulations?.[0]?.computedResults[carboneMetric].categories ?? {}
        ) as DottedName[]
      ).map((category) => {
        const mean = simulations?.reduce(
          (acc, obj) =>
            acc + obj.computedResults[carboneMetric].categories[category],
          0
        )
        return {
          category,
          value: mean / simulations?.length,
        }
      }),
    [simulations]
  )

  const hasCurrentUser = useMemo(
    () => simulations.some((simulation) => !!simulation.user),
    [simulations]
  )

  const shouldUseAbbreviation = isMobile()

  if (!simulations || simulations?.length < 3) return null

  return (
    <section className="my-12 rounded-xl bg-gray-100 px-8 pt-8 pb-4">
      <h2>
        <TransClient>Répartition des empreintes carbone</TransClient>
        <InformationIconWithTooltip
          id="resultats-groupe"
          className="ml-1 inline-block">
          <>
            <p className="mb-1 text-sm">
              <TransClient>
                Chaque participation est représentée par une barre verticale.
                Votre score est affiché en{' '}
                <span className="text-secondary-700 font-bold">rose</span>.
              </TransClient>
            </p>
            <p className="mb-0 text-sm">
              <TransClient>
                Pour faciliter la lecture, les valeurs supérieures à 100 t sont
                retirées.
              </TransClient>{' '}
              {isAdmin && (
                <TransClient>
                  Elle seront toutefois prises en compte lors de l'export de
                  données.
                </TransClient>
              )}
            </p>
          </>
        </InformationIconWithTooltip>
      </h2>

      <Separator />

      <MainFootprintChart
        simulations={simulations}
        maxValue={maxValueOfAllSimulations + 1}
      />

      <section>
        <div className="flex items-baseline justify-between md:max-w-[16rem]">
          <h3>
            <TransClient>Par catégorie</TransClient>
          </h3>
          <p className="mb-0 text-[0.75rem]">
            <TransClient>Moyenne :</TransClient>
          </p>
        </div>
        <ul>
          {!!simulations?.length &&
            (
              Object.keys(
                simulations[0].computedResults[carboneMetric].categories
              ) as DottedName[]
            ).map((category, index) => (
              <CategoryListItem
                key={index}
                category={category}
                value={meanCategories ? meanCategories[index].value : 0}
                simulations={simulations}
                maxValue={maxValueOfAllCategories}
              />
            ))}
        </ul>
        <div className="flex justify-between py-2">
          <div className="sm:mr-10 sm:w-64" />

          <div className="flex flex-1 justify-between">
            <div>
              <strong className="text-lg">0</strong>{' '}
              {shouldUseAbbreviation ? (
                <TransClient>t CO₂e / an</TransClient>
              ) : (
                <TransClient>tonnes CO₂e / an</TransClient>
              )}
            </div>

            {hasCurrentUser && (
              <div className="flex items-center gap-3">
                <div className="bg-secondary-700 h-4 w-1" />
                <p className="mb-0 text-sm text-gray-600">
                  <TransClient>Votre résultat</TransClient>
                </p>
              </div>
            )}

            <div>
              <strong className="text-lg">{maxValueOfAllCategories}</strong>{' '}
              {shouldUseAbbreviation ? (
                <TransClient>t CO₂e / an</TransClient>
              ) : (
                <TransClient>tonnes CO₂e / an</TransClient>
              )}
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
