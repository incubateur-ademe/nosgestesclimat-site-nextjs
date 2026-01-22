import ResultsContent from '@/components/results/ResultsContent'
import { MON_ESPACE_RESULTS_PATH } from '@/constants/urls/paths'
import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getUser } from '@/helpers/server/model/user'
import { fetchSimulation } from '@/helpers/simulation/fetchSimulation'
import type { DefaultPageProps } from '@/types'
import { notFound } from 'next/navigation'

export default async function DetailledResultsPage({
  params,
}: DefaultPageProps<{ params: { locale: string; simulationId: string } }>) {
  const { simulationId, locale } = await params

  const { t } = await getServerTranslation({ locale })

  const user = await getUser()

  const simulation = await fetchSimulation({
    simulationId,
    userId: user.id,
  })

  if (!simulation) {
    notFound()
  }

  return (
    <>
      <Breadcrumbs
        items={[
          {
            href: MON_ESPACE_RESULTS_PATH,
            label: t(
              'mon-espace.resultsDetail.breadcrumb.results',
              'Mes résultats'
            ),
          },
          {
            href: `/mon-espace/resultats/${simulationId}`,
            label: t(
              'mon-espace.resultsDetail.breadcrumb.resultDetail',
              'Détail des résultats'
            ),
            isActive: true,
          },
        ]}
      />
      <ResultsContent
        simulation={simulation}
        isStatic
        title={
          <div className="flex flex-col gap-2" key={simulation.id}>
            <Title
              title={t(
                'mon-espace.resultsDetail.title',
                'Détail des résultats'
              )}
            />

            <p className="mb-8 font-bold">
              {t('mon-espace.resultsDetail.date', 'Test effectué le {{date}}', {
                date: new Date(simulation.date).toLocaleDateString(locale, {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }),
              })}
            </p>
          </div>
        }
      />
    </>
  )
}
