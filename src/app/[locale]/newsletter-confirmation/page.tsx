import Header from '@/components/layout/Header'
import Main from '@/design-system/layout/Main'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import type { DefaultPageProps } from '@/types'
import NewsletterErrorMessage from './_components/NewsletterErrorMessage'
import NewsletterInvalidMessage from './_components/NewsletterInvalidMessage'
import NewsletterSuccessMessage from './_components/NewsletterSuccessMessage'

export const generateMetadata = getCommonMetadata({
  title: t("Confirmation d'inscription à nos infolettres - Nos Gestes Climat"),
  image:
    'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/calculer_empreinte_carbone_et_eau_7d061171e4.png',
  description: t(
    "2 millions de personnes ont déjà calculé leur empreinte sur le climat avec le calculateur Nos Gestes Climat ! Et vous, qu'attendez-vous pour faire le test ?"
  ),
  alternates: {
    canonical: '',
  },
})

export default async function NewsletterConfirmationPage({
  params,
  searchParams,
}: DefaultPageProps<{ searchParams: { success: string; status?: string } }>) {
  const { locale } = await params
  const { success, status } = searchParams ? await searchParams : {}

  return (
    <>
      <Header />
      <Main>
        <div className="min-h-screen">
          <div className="mt-36 text-center">
            {success === 'true' && <NewsletterSuccessMessage locale={locale} />}

            {success === 'false' && status === '404' && (
              <NewsletterInvalidMessage locale={locale} />
            )}

            {success === 'false' && status === '500' && (
              <NewsletterErrorMessage locale={locale} />
            )}
          </div>
        </div>
      </Main>
    </>
  )
}
