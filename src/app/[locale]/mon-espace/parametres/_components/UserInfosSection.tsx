import QueryClientProviderWrapper from '@/app/[locale]/_components/mainLayoutProviders/QueryClientProviderWrapper'
import Trans from '@/components/translation/trans/TransServer'
import UserContactForm from '@/components/user/UserContactForm'
import UserNewslettersForm from '@/components/user/UserNewslettersForm'

type Props = {
  locale: string
}

export default function UserInfosSection({ locale }: Props) {
  return (
    <section aria-labelledby="user-info-title" className="mb-10">
      <h2 id="user-info-title" className="mb-4">
        <Trans i18nKey="mon-espace.settings.userInfos.title" locale={locale}>
          Mes informations
        </Trans>
      </h2>

      <QueryClientProviderWrapper>
        <div className="max-w-[720px]">
          <UserContactForm
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
      </QueryClientProviderWrapper>
    </section>
  )
}
