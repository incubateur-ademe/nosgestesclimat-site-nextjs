import ContentLarge from '@/components/layout/ContentLarge'
import ResultsContent from '@/components/results/ResultsContent'
import { CONNEXION_PATH } from '@/constants/urls/paths'
import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import Title from '@/design-system/layout/Title'
import { getAuthentifiedUser } from '@/helpers/authentication/getAuthentifiedUser'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { fetchSimulation } from '@/helpers/simulation/fetchSimulation'
import type { DefaultPageProps } from '@/types'
import { notFound, redirect } from 'next/navigation'

export default async function DetailledResultsPage({
  params,
}: DefaultPageProps<{ params: { locale: string; simulationId: string } }>) {
  const { simulationId, locale } = await params

  const { t } = await getServerTranslation({ locale })

  const authenticatedUser = await getAuthentifiedUser()

  if (!authenticatedUser) {
    redirect(CONNEXION_PATH)
  }

  const simulation = await fetchSimulation({
    simulationId,
    userId: authenticatedUser.id,
  })

  if (!simulation) {
    notFound()
  }

  return (
    <ContentLarge>
      <Breadcrumbs
        items={[
          {
            href: '/mon-espace',
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
        userId={authenticatedUser.id}
        isStatic
        title={
          <div className="flex flex-col gap-2">
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
    </ContentLarge>
  )
}
