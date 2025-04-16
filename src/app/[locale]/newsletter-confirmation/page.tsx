import Header from '@/components/layout/Header'
import Trans from '@/components/translation/trans/TransServer'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Main from '@/design-system/layout/Main'
import Emoji from '@/design-system/utils/Emoji'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import type { DefaultPageProps } from '@/types'

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
}: DefaultPageProps) {
  const { locale } = await params

  return (
    <>
      <Header />
      <Main>
        <div className="min-h-screen">
          <div className="mt-36 text-center">
            <h1 className="mb-4 text-lg md:text-xl">
              <Trans locale={locale}>
                Confirmation de votre inscription à nos e-mails
              </Trans>{' '}
              <Emoji>👍</Emoji>
            </h1>

            <p className="mb-10">
              <Trans locale={locale}>
                Votre e-mail a été vérifié, vous êtes bien inscrit à notre
                infolettre.
              </Trans>
            </p>

            <ButtonLink href="/">
              <Trans locale={locale}>Revenir à la page d'accueil</Trans>
            </ButtonLink>
          </div>
        </div>
      </Main>
    </>
  )
}
