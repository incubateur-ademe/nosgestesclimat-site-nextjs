import { noIndexObject } from '@/constants/metadata'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { PropsWithChildren } from 'react'
import InfosProvider from './_components/InfosProvider'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Calculer votre empreinte carbone individuelle - Nos Gestes Climat',
    description:
      'Comprenez comment calculer votre empreinte sur le climat en 10min chrono.',
    alternates: {
      canonical: '/infos',
    },
    robots: noIndexObject,
  })
}

export default async function Infos({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col">
      <InfosProvider>{children}</InfosProvider>
    </div>
  )
}
