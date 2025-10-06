import Header from '@/components/layout/Header'
import { PARTNER_KEY } from '@/constants/partners'
import { NOT_FOUND_PATH } from '@/constants/urls/paths'
import Main from '@/design-system/layout/Main'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import { verifyPartner } from '@/services/partners/verifyPartner'
import type { DefaultPageProps } from '@/types'
import { redirect } from 'next/navigation'
import AdaptiveMessage from './_components/AdaptiveMessage'

type SearchParams = Record<string, string>

export const generateMetadata = getCommonMetadata({
  title: t('Partagez vos résultats avec notre partenaire - Nos Gestes Climat'),
  description: t(
    "2 millions de personnes ont déjà calculé leur empreinte sur le climat avec le calculateur Nos Gestes Climat ! Et vous, qu'attendez-vous pour faire le test ?"
  ),
  alternates: {
    canonical: '',
  },
})

export default async function PartenairePage({
  params,
  searchParams,
}: DefaultPageProps<{ searchParams: SearchParams }>) {
  const { locale } = await params
  const searchParamsObject = (await searchParams) ?? { partner: '' }

  const partner = (searchParamsObject[PARTNER_KEY] as string) ?? ''

  if (!partner) {
    return redirect(NOT_FOUND_PATH)
  }

  const partnerInfo = await verifyPartner(partner)

  if (!partnerInfo) {
    return redirect(NOT_FOUND_PATH)
  }

  return (
    <>
      <Header />
      <Main>
        <div className="min-h-screen">
          <div className="mt-36 text-center">
            <AdaptiveMessage partner={partner} />
          </div>
        </div>
      </Main>
    </>
  )
}
