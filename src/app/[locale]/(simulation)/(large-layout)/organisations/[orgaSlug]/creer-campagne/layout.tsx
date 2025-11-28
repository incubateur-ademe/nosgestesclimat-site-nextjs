import Trans from '@/components/translation/trans/TransServer'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import type { DefaultPageProps } from '@/types'
export async function generateMetadata({
  params,
}: DefaultPageProps<{
  params: Promise<{ orgaSlug: string; locale: string }>
}>) {
  const { orgaSlug, locale } = await params

  const { t } = await getServerTranslation({ locale })

  return getMetadataObject({
    locale,
    title: t('Créer une campagne pour mon organisation - Nos Gestes Climat'),
    description: t(
      'Accédez à des services sur mesure pour sensibiliser vos partenaires au sein de votre organisation.'
    ),
    alternates: {
      canonical: `/organisations/${orgaSlug}/creer-campagne`,
    },
  })
}
/* global LayoutProps */
export default async function Layout({
  children,
  params,
}: LayoutProps<'/[locale]/organisations/[orgaSlug]/creer-campagne'>) {
  const { locale } = await params

  return (
    <div className="mb-4 flex flex-col justify-between md:flex-nowrap">
      <Title
        title={<Trans locale={locale}>Créer une campagne</Trans>}
        subtitle={
          <Trans locale={locale}>
            Lancez une campagne de calcul de l'empreinte carbone de vos
            collaborateurs, élèves, collègues...
          </Trans>
        }
      />
      {children}
    </div>
  )
}
