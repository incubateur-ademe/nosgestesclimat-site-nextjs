import { t } from '@/helpers/metadata/fakeMetadataT'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { PropsWithChildren } from 'react'

export async function generateMetadata() {
  return getMetadataObject({
    title: t(
      'Organisations, calculer votre empreinte carbone - Nos Gestes Climat'
    ),
    description: t(
      'Comprenez comment calculer votre empreinte sur le climat en 10min chrono.'
    ),
    alternates: {
      canonical: '/infos',
    },
  })
}

export default function Layout({ children }: PropsWithChildren) {
  return <div className="bg-white">{children}</div>
}
