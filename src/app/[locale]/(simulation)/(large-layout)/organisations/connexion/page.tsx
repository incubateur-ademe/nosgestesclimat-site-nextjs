import AuthenticateUserForm from '@/components/AuthenticateUserForm'
import Trans from '@/components/translation/trans/TransServer'
import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import Separator from '@/design-system/layout/Separator'
import { getOrganisationBaseBreadcrumb } from '@/helpers/filAriane/getOrganisationBaseBreadcrumb'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getLocale } from '@/helpers/language/getLocale'

import { getUserCurrentOrganisation } from '@/helpers/server/model/organisations'
import { isUserAuthenticated } from '@/helpers/server/model/user'
import { redirect } from 'next/navigation'

async function redirectAfterLogin() {
  'use server'
  const organisation = await getUserCurrentOrganisation()
  if (!organisation) {
    redirect('/organisations/creer')
  }
  redirect(`/organisations/${organisation.slug}`)
}

/* global PageProps */
export default async function Page({
  params,
}: PageProps<'/[locale]/organisations/connexion'>) {
  const locale = await getLocale()
  if (await isUserAuthenticated()) {
    await redirectAfterLogin()
  }

  const { t } = await getServerTranslation({ locale: (await params).locale })
  const breadcrumbItems = [
    ...getOrganisationBaseBreadcrumb(t),
    {
      href: '/organisations/connexion',
      label: t('Connexion'),
      isActive: true,
    },
  ]

  return (
    <>
      <Breadcrumbs className="-mt-4" items={breadcrumbItems} />

      <section className="w-full bg-[#fff]">
        <div className="max-w-5xl lg:px-0">
          <h1>
            <Trans locale={locale}>Accédez à votre espace organisation</Trans>
          </h1>
          <p>
            <Trans locale={locale}>
              C'est gratuit, et ça prend une minute !
            </Trans>
          </p>
          <Separator />
          <div className="max-w-full md:w-[40rem]">
            <AuthenticateUserForm onComplete={redirectAfterLogin} />
          </div>
        </div>
      </section>
    </>
  )
}
