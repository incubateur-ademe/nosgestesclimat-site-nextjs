import Providers from '@/components/providers/Providers'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { getSupportedRegions } from '@/helpers/modelFetching/getSupportedRegions'
import type { DefaultPageProps } from '@/types'
import type { PropsWithChildren } from 'react'

export async function generateMetadata({ params }: DefaultPageProps) {
  const { locale } = await params
  const { t } = await getServerTranslation({ locale })

  return getMetadataObject({
    locale,
    title: t("Nos personas d'utilisateurs types - Nos Gestes Climat"),
    description: t(
      "Découvrez les personas d'utilisateurs types qui nous servent à tester le calculateur sous toutes ses coutures."
    ),
    alternates: {
      canonical: '/personas',
    },
  })
}

export default function PersonasLayout({ children }: PropsWithChildren) {
  const supportedRegions = getSupportedRegions()

  return <Providers supportedRegions={supportedRegions}>{children}</Providers>
}
