import Header from '@/components/layout/Header'
import MessageTemplate from '@/components/layout/MessageTemplate'
import Trans from '@/components/translation/trans/TransServer'
import { PARTNER_KEY } from '@/constants/partners'
import Main from '@/design-system/layout/Main'
import Emoji from '@/design-system/utils/Emoji'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import { verifyPartner } from '@/services/partners/verifyPartner'
import type { DefaultPageProps } from '@/types'
import { redirect } from 'next/navigation'
import RedirectLink from './_components/RedirectLink'
import RedirectTimer from './_components/RedirectTimer'

type SearchParams = { success: 'true' | 'false'; status?: '404' | '500' }

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

export default async function PartenairePage({
  params,
  searchParams,
}: DefaultPageProps<{ searchParams: SearchParams }>) {
  const { locale } = await params

  const { t } = await getServerTranslation({ locale })

  const searchParamsObject = (await searchParams) ?? { partner: '' }

  const partner = (searchParamsObject[PARTNER_KEY] as string) ?? ''

  if (!partner) {
    return redirect('/404')
  }

  const partnerInfo = await verifyPartner(partner)

  if (!partnerInfo) {
    return redirect('/404')
  }

  return (
    <>
      <Header />
      <Main>
        <div className="min-h-screen">
          <div className="mt-36 text-center">
            <MessageTemplate
              title={t(
                'Notre partenaire {{name}} vous a invité à leur transmettre vos empreintes carbone et eau.',
                {
                  name: partnerInfo.name,
                }
              )}
              description={
                <>
                  <p>
                    <Trans locale={locale}>C'est chose faite !</Trans>{' '}
                    <Emoji>✅</Emoji>{' '}
                    <Trans locale={locale}>
                      Vous allez être redirigé vers le site de notre partenaire
                      dans
                    </Trans>
                  </p>
                  <RedirectTimer />
                </>
              }
              buttonElement={<RedirectLink />}
            />
          </div>
        </div>
      </Main>
    </>
  )
}
