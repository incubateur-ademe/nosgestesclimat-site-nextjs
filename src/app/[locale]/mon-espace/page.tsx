import Link from '@/components/Link'
import PlusIcon from '@/components/icons/PlusIcon'
import ContentLarge from '@/components/layout/ContentLarge'
import Trans from '@/components/translation/trans/TransServer'
import { SHOW_WELCOME_BANNER_QUERY_PARAM } from '@/constants/urls/params'
import { CONNEXION_PATH, MON_ESPACE_PATH } from '@/constants/urls/paths'
import Separator from '@/design-system/layout/Separator'
import Emoji from '@/design-system/utils/Emoji'
import { getIsUserAuthenticated } from '@/helpers/authentication/getIsUserAuthenticated'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import type { DefaultPageProps } from '@/types'
import { redirect } from 'next/navigation'
import ProfileTab from './_components/ProfileTabs'

export default async function MonEspacePage({
  params,
  searchParams,
}: DefaultPageProps) {
  const { locale } = await params
  const { [SHOW_WELCOME_BANNER_QUERY_PARAM]: showWelcomeBanner } =
    (await searchParams) || {}

  const { t } = await getServerTranslation({ locale })

  const authenticatedUser = await getIsUserAuthenticated()

  if (!authenticatedUser) {
    redirect(CONNEXION_PATH)
  }

  return (
    <ContentLarge className="mt-4 px-4 md:mt-10 lg:px-0">
      {showWelcomeBanner && (
        <div className="relative mb-10 rounded-lg bg-blue-50 p-4 md:p-6">
          <article className="relative flex flex-col">
            <div>
              <div>
                <h1 className="mb-4">
                  {' '}
                  <span className="inline-block text-xl md:text-2xl">
                    <Trans i18nKey="mon-espace.welcome.title" locale={locale}>
                      Bienvenue dans votre espace Nos Gestes climat !
                    </Trans>
                    <Emoji>👋</Emoji>
                  </span>
                </h1>
                <Separator className="mt-0 mb-6" />
              </div>

              <Link
                href={MON_ESPACE_PATH}
                title={t(
                  'mon-espace.welcome.close-banner',
                  'Fermer la bannière de bienvenue'
                )}
                className="absolute top-0 right-0">
                <PlusIcon className="h-5 w-5 min-w-5 origin-center rotate-45" />
              </Link>
            </div>

            <p>
              <Trans
                locale={locale}
                i18nKey="mon-espace.welcome.description.part1">
                Ici, vous pourrez
              </Trans>{' '}
              <strong>
                <Trans
                  i18nKey="mon-espace.welcome.description.part2"
                  locale={locale}>
                  suivre vos résultats
                </Trans>
              </strong>
              <Trans
                locale={locale}
                i18nKey="mon-espace.welcome.description.part3">
                , passer à{' '}
              </Trans>{' '}
              <strong>
                <Trans
                  i18nKey="mon-espace.welcome.description.part4"
                  locale={locale}>
                  l’action
                </Trans>
              </strong>
              <Trans
                locale={locale}
                i18nKey="mon-espace.welcome.description.part5">
                , et
              </Trans>{' '}
              <strong>
                <Trans
                  i18nKey="mon-espace.welcome.description.part6"
                  locale={locale}>
                  embarquer d’autres personnes
                </Trans>
              </strong>{' '}
              <Trans
                locale={locale}
                i18nKey="mon-espace.welcome.description.part7">
                avec vous.
              </Trans>
            </p>
          </article>
        </div>
      )}

      <ProfileTab locale={locale} activePath={MON_ESPACE_PATH} />
    </ContentLarge>
  )
}
