import FilAriane from '@/components/layout/FilAriane'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { PropsWithChildren } from 'react'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

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
  return (
    <div className="-mt-8 bg-white">
      <FilAriane className="-mt-4 mb-4" />
      {children}
    </div>
  )
}
