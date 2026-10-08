import ProfileTab from '@/app/[locale]/(server)/(large)/(user-account)/mon-espace/_components/ProfileTabs'
import ActionPlanLinks from '@/components/actions/ActionPlanLinks'
import { classesByTheme } from '@/components/actions/theme/constants/classesByTheme'
import NoResultsBlock from '@/components/dashboard/NoResultsBlock'
import PlusIcon from '@/components/icons/PlusIcon'
import Trans from '@/components/translation/trans/TransServer'
import {
  ACTIONS_MY_PLAN_PATH,
  ACTIONS_PATH,
  END_PAGE_ACTIONS_PATH,
  MON_ESPACE_ACTIONS_PATH,
} from '@/constants/urls/paths'
import ButtonLinkServer from '@/design-system/buttons/ButtonLinkServer'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import { getPersonalizedActionsCatalogue } from '@/services/actions/get-personalized-actions-catalogue'
import { getThemes } from '@/services/actions/get-themes'
import { getUserSession } from '@/services/auth/get-user-session'
import type { DefaultPageProps } from '@/types'
import { twMerge } from 'cn'
import { redirect } from 'next/navigation'
import PlannedActionCard from './_components/PlannedActionCard'

export const generateMetadata = getCommonMetadata({
  title: t('actions.myPlanPage.metaTitle'),
  alternates: {
    canonical: ACTIONS_MY_PLAN_PATH,
  },
})

export default async function ActionsPlanPage({ params }: DefaultPageProps) {
  const { locale } = await params
  const user = await getUserSession()

  if (!user) {
    redirect(ACTIONS_PATH)
  }

  const [actionsCatalogue, themes] = await Promise.all([
    getPersonalizedActionsCatalogue(user.id, locale),
    getThemes(locale),
  ])

  const plannedActions = actionsCatalogue.actions.filter(
    (action) => action.choice?.type === 'committed'
  )
  const plannedActionsByTheme = Object.groupBy(
    plannedActions,
    (action) => action.theme.key
  )
  const plannedActionsCount = plannedActions.length

  // Unverified users can't access "mon espace"
  const exploreHref = user.isAuth
    ? MON_ESPACE_ACTIONS_PATH
    : END_PAGE_ACTIONS_PATH

  return (
    <div className="flex flex-col pb-24">
      {user.isAuth && <ProfileTab activePath={MON_ESPACE_ACTIONS_PATH} />}

      {actionsCatalogue.plan ? (
        <ActionPlanLinks
          plan={actionsCatalogue.plan}
          activeLink="plan"
          exploreHref={exploreHref}
        />
      ) : null}

      {plannedActionsCount === 0 ? (
        <NoResultsBlock />
      ) : (
        <div className="flex w-171 max-w-full flex-col gap-8">
          <div>
            <h1 className="mb-0 text-2xl/normal font-medium md:text-4xl/normal">
              <Trans i18nKey="actions.myPlanPage.title">
                Mon plan d’action
              </Trans>
            </h1>
            <p className="mb-0 text-base/normal">
              <Trans
                i18nKey="actions.myPlanPage.description"
                count={plannedActionsCount}
                defaultValue_one="Vous avez ajouté <1>{{count}} action</1> à votre plan.">
                Vous avez ajouté <strong>{'{{count}}'} actions</strong> à votre
                plan.
              </Trans>
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {themes
              .filter((theme) => plannedActionsByTheme[theme.key]?.length)
              .map((theme) => (
                <section key={theme.id} className="flex flex-col gap-6">
                  <h2
                    className={twMerge(
                      'mb-0 text-sm/normal font-bold uppercase',
                      classesByTheme[theme.key].header
                    )}>
                    {theme.title}
                  </h2>

                  <ul className="flex flex-col gap-2">
                    {plannedActionsByTheme[theme.key]?.map((action) => (
                      <li key={action.id}>
                        <PlannedActionCard action={action} locale={locale} />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
          </div>

          <ButtonLinkServer
            color="secondary"
            className="w-full text-sm!"
            href={exploreHref}>
            <PlusIcon className="stroke-primary-700 mr-2 size-3" />
            <Trans i18nKey="actions.myPlanPage.exploreOtherActions">
              Explorer d’autres actions
            </Trans>
          </ButtonLinkServer>
        </div>
      )}
    </div>
  )
}
