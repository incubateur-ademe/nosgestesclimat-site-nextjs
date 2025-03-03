import FilAriane from '@/components/layout/FilAriane'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import type { DefaultPageProps } from '@/types'
import type { PropsWithChildren } from 'react'

export async function generateMetadata({ params }: DefaultPageProps) {
  const { locale } = await params
  const { t } = await getServerTranslation(locale)

  return getMetadataObject({
    locale,
    title: t(
      'Organisations, calculer votre empreinte carbone - Nos Gestes Climat'
    ),
    description: t(
      'Comprenez comment calculer votre empreinte sur le climat en 10min chrono.'
    ),
    alternates: {
      canonical: '/organisations',
    },
  })
}

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="bg-white md:-mt-8">
      <FilAriane className="-mt-4" />
      {children}
    </div>
  )
}
