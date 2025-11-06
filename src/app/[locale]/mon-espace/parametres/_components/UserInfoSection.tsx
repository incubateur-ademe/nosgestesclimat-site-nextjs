import QueryClientProviderWrapper from '@/app/[locale]/_components/mainLayoutProviders/QueryClientProviderWrapper'
import Trans from '@/components/translation/trans/TransServer'
import UserEmailForm from '@/components/user/UserEmailForm'
import UserNewslettersForm from '@/components/user/UserNewslettersForm'
import { getLocale } from '@/helpers/language/getLocale'
import { UserProvider } from '@/publicodes-state'

export default async function UserInfoSection() {
  const locale = await getLocale()
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
            <UserEmailForm
              submitLabel={
                <Trans
                  i18nKey="mon-espace.settings.userInfos.submitLabel"
                  locale={locale}>
                  Mettre à jour mes informations
                </Trans>
              }
              className="mb-8"
            />

            <UserNewslettersForm />
          </div>
        </UserProvider>
      </QueryClientProviderWrapper>
    </section>
  )
}
