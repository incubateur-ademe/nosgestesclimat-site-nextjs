import { noIndexObject } from '@/constants/metadata'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { PropsWithChildren } from 'react'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t(
      "Vos résultats, calculateur d'empreinte climat - Nos Gestes Climat"
    ),
    description: t(
      "Vos résultats de tests de notre calculateur d'empreinte carbone."
    ),
    robots: noIndexObject,
    alternates: {
      canonical: '/fin',
    },
  })
}

export default function Layout({ children }: PropsWithChildren) {
  return <>{children}</>
}
