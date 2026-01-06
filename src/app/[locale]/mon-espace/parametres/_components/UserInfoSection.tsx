import QueryClientProviderWrapper from '@/app/[locale]/_components/mainLayoutProviders/QueryClientProviderWrapper'
import Trans from '@/components/translation/trans/TransServer'
import UserNewslettersForm from '@/components/user/UserNewslettersForm'
import { getLocale } from '@/helpers/language/getLocale'
import { getUser } from '@/helpers/server/model/user'
import { UserProvider } from '@/publicodes-state'
import UserEmail from './userInfoSection/UserEmail'

export default async function UserInfoSection() {
  const locale = await getLocale()
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
          <div className="max-w-[720px]">
            <UserEmail />

            <UserNewslettersForm user={user} />
          </div>
        </UserProvider>
      </QueryClientProviderWrapper>
    </section>
  )
}
