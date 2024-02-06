'use client'

import Trans from '@/components/translation/Trans'
import Separator from '@/design-system/layout/Separator'
import Emoji from '@/design-system/utils/Emoji'
import { useFetchPollData } from '@/hooks/organizations/useFetchPollData'
import { useLocale } from '@/hooks/useLocale'
import { useUser } from '@/publicodes-state'
import { formatValue } from 'publicodes'
import CategoryListItem from './orgaStatisticsCharts/CategoryListItem'
import RepartitionChart from './orgaStatisticsCharts/RepartitionChart'

export default function DetailedOrgaStatistics() {
  const locale = useLocale()

  const { user } = useUser()

  const regionCode =
    user?.region?.code != undefined && user?.region?.code !== ''
      ? user?.region?.code
      : 'FR'

  const fileName = `co2-model.${regionCode}-lang.${locale}.json`

  const { data: pollData } = useFetchPollData({
    fileName,
    userId: user?.id,
    email: user?.email,
  })

  const mockPollData = {
    funFacts: {
      percentageOfBicycleUsers: 10,
      percentageOfVegetarians: 23.299,
      percentageOfCarOwners: 76.9,
    },
    simulationsRecap: Array.from({ length: 200 }, () => {
      const categories = {
        transport: parseFloat(
          formatValue(Math.random() * 6 - 1, { precision: 1 })
        ),
        logement: parseFloat(
          formatValue(Math.random() * 6 - 1, { precision: 1 })
        ),
        alimentation: parseFloat(
          formatValue(Math.random() * 6 - 1, { precision: 1 })
        ),
        divers: parseFloat(
          formatValue(Math.random() * 6 - 2, { precision: 1 })
        ),
        'services sociétaux': parseFloat(
          formatValue(Math.random() * 6 - 2, { precision: 1 })
        ),
      }
      return {
        bilan: Object.values(categories).reduce((acc, value) => acc + value, 0),
        categories,
        defaultAdditionalQuestions: {},
        progression: Math.random(),
      }
    }),
  }

  // Calculate the mean for each category
  const meanCategories = Object.keys(
    mockPollData.simulationsRecap[0].categories
  ).map((category) => {
    const mean = mockPollData.simulationsRecap.reduce(
      (acc, obj) => acc + obj.categories[category],
      0
    )
    return {
      category,
      value: mean / mockPollData.simulationsRecap.length,
    }
  })
  console.log(meanCategories)
  return (
    <section className="my-12 rounded-lg bg-grey-100 px-8 pb-4 pt-8">
      <h2>
        <Trans>Résultats du groupe</Trans>
      </h2>

      <p>
        Chaque participation est représentée par une barre verticale. Votre
        score est affiché en rose.
      </p>

      <Separator />

      <section className="mb-12">
        <h3>
          <Trans>Empreinte carbone</Trans>
        </h3>

        <div className="flex flex-col">
          <RepartitionChart
            items={mockPollData.simulationsRecap.map(
              ({ bilan, isCurrentUser }) => ({
                value: bilan,
                shouldBeHighlighted: isCurrentUser,
              })
            )}
          />

          <div className="mt-4 flex items-baseline justify-between">
            <span>
              <Emoji className="text-xl">🎯</Emoji>{' '}
              <strong className="text-lg">2</strong> <span>tonnes</span>
            </span>

            <span>
              <strong className="text-lg">29</strong> <span>tonnes</span>
            </span>
          </div>
        </div>
      </section>
      <section>
        <h3>Par catégorie</h3>
        <ul>
          {Object.keys(mockPollData.simulationsRecap[0].categories).map(
            (category, index) => (
              <CategoryListItem
                key={index}
                category={category}
                value={meanCategories[index].value}
                simulationsRecap={mockPollData.simulationsRecap}
              />
            )
          )}
        </ul>
        <div className="flex justify-between py-2">
          <div className="mr-10 w-64" />

          <div className="flex flex-1 justify-between">
            <div>
              <strong className="text-lg">0</strong> <span>tonnes</span>
            </div>

            <div>
              <strong className="text-lg">6</strong> <span>tonnes</span>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
