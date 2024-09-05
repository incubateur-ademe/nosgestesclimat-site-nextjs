import { noIndexObject } from '@/constants/metadata'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { PropsWithChildren } from 'react'
import InfosProvider from './_components/InfosProvider'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t(
      'Calculer votre empreinte carbone individuelle - Nos Gestes Climat'
    ),
    description: t(
      'Comprenez comment calculer votre empreinte sur le climat en 10min chrono.'
    ),
    alternates: {
      canonical: '/infos',
    },
    robots: noIndexObject,
  })
}

export default async function Infos({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <InfosProvider>{children}</InfosProvider>
    </div>
  )
}
