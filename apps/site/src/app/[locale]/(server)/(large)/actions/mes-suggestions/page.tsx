import ActionsPage from '@/components/actions/pages/ActionsPage'
import NoResultsBlock from '@/components/dashboard/NoResultsBlock'
import UserSpaceTabs from '@/components/layout/UserSpaceTabs'
import { ACTIONS_PATH, ACTIONS_SUGGESTED_PATH } from '@/constants/urls/paths'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import { getPersonalizedActionsCatalogue } from '@/services/actions/get-personalized-actions-catalogue'
import { getThemes } from '@/services/actions/get-themes'
import { getUserSession } from '@/services/auth/get-user-session'
import { getCurrentSimulation } from '@/services/simulations/get-current-simulation'
import type { DefaultPageProps } from '@/types'
import { redirect } from 'next/navigation'

export const generateMetadata = getCommonMetadata({
  title: t('actions.listPage.metaTitle'),
  alternates: {
    canonical: ACTIONS_SUGGESTED_PATH,
  },
})

export default async function SuggestedActionsPage({
  params,
}: DefaultPageProps) {
  const { locale } = await params
  const user = await getUserSession()
  const { t } = await getServerTranslation()

  if (!user) {
    redirect(ACTIONS_PATH)
  }

  const [actionsCatalogue, themes, currentSimulation] = await Promise.all([
    getPersonalizedActionsCatalogue(locale),
    getThemes(locale),
    getCurrentSimulation(),
  ])

  return (
    <div className="flex flex-col">
      <UserSpaceTabs isAuth={user.isAuth} activeTabId="actions" />

      {/* No finished simulation: nothing to personalize from. */}
      {actionsCatalogue.assessmentStatus === null ? (
        <NoResultsBlock />
      ) : (
        <ActionsPage
          title={t(
            'actions.plan.header.title',
            "Construisez votre plan d'action"
          )}
          description={t(
            'actions.plan.header.description',
            'Ces actions sont personnalisées selon vos réponses au test. Choisissez celles qui vous semblent atteignables et ajoutez-les à votre plan d’action !'
          )}
          otherActionsTitle={t(
            'actions.plan.otherActions.title',
            'Toutes vos actions, par catégorie'
          )}
          withOtherActionsDescription={false}
          topActions={actionsCatalogue.topActions}
          actions={actionsCatalogue.actions}
          assessmentStatus={actionsCatalogue.assessmentStatus}
          plan={
            actionsCatalogue.plan ?? {
              numberOfCommittedActions: 0,
              totalImpact: 0,
            }
          }
          themes={themes}
          from="mes-suggestions"
          totalFootprint={currentSimulation?.computedResults.carbone.bilan}
        />
      )}
    </div>
  )
}
