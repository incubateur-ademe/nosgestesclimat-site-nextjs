import { getServerTranslation } from '@/helpers/getServerTranslation'
import { createInitialCollectiveTestState } from '@/helpers/organisations/collectiveTestMachine'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import type { DefaultPageProps } from '@/types'
import { getCollectiveTestFlowStatus } from './_actions/getCollectiveTestFlowStatus'
import { CollectiveTestProvider } from './_components/CollectiveTestProvider'

export async function generateMetadata({ params }: DefaultPageProps) {
  const { locale } = await params
  const { t } = await getServerTranslation({ locale })

  return getMetadataObject({
    locale,
    title: t('Créer un test collectif - Nos Gestes Climat'),
    description: t(
      'Accédez à des services sur mesure pour sensibiliser vos partenaires au sein de votre organisation.'
    ),
    alternates: {
      canonical: '/organisations/creer-campagne',
    },
  })
}

export default async function Layout({
  children,
}: LayoutProps<'/[locale]/organisations/creer-campagne'>) {
  const { isAuth, hasOrg, orgSlug, orgName } =
    await getCollectiveTestFlowStatus()

  return (
    <CollectiveTestProvider
      initialState={createInitialCollectiveTestState({
        isAuth,
        hasOrg,
        orgSlug,
        orgName,
      })}>
      {children}
    </CollectiveTestProvider>
  )
}
