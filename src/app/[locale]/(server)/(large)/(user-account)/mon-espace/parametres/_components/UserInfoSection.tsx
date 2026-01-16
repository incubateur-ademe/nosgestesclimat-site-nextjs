import QueryClientProviderWrapper from '@/app/[locale]/_components/mainLayoutProviders/QueryClientProviderWrapper'
import Trans from '@/components/translation/trans/TransServer'
import UserNewslettersForm from '@/components/user/UserNewslettersForm'
import { getUser } from '@/helpers/server/model/user'
import type { Locale } from '@/i18nConfig'
import { UserProvider } from '@/publicodes-state'
import UserEmail from './userInfoSection/UserEmail'

export default async function UserInfoSection({ locale }: { locale: Locale }) {
  const user = await getUser()

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

            <UserNewslettersForm user={user} />
          </div>
        </UserProvider>
      </QueryClientProviderWrapper>
    </section>
  )
}
