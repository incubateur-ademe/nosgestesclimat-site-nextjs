import QueryClientProviderWrapper from '@/app/[locale]/_components/mainLayoutProviders/QueryClientProviderWrapper'
import Trans from '@/components/translation/trans/TransServer'
import NewsletterManagement from '@/components/user/NewsletterManagement'
import type { Locale } from '@/i18nConfig'
import { UserProvider } from '@/publicodes-state'
import UserEmail from './userInfoSection/UserEmail'

export default function UserInfoSection({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="user-info-title" className="mb-10">
      <h2 id="user-info-title" className="mb-4">
        <Trans i18nKey="mon-espace.settings.userInfos.title" locale={locale}>
          Mes informations
        </Trans>
      </h2>

      <QueryClientProviderWrapper>
        <UserProvider>
          <div className="flex max-w-[720px] flex-col gap-8">
            <UserEmail />

            <h2 className="mt-8">
              <Trans i18nKey="settings.newsletters.title" locale={locale}>
                Inscription à nos contenus
              </Trans>
            </h2>
            <NewsletterManagement hasEmailField={false} />
          </div>
        </UserProvider>
      </QueryClientProviderWrapper>
    </section>
  )
}
