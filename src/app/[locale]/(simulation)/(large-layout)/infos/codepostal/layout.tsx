import { noIndexObject } from '@/constants/metadata'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import type { DefaultPageProps } from '@/types'
import type { PropsWithChildren } from 'react'

export async function generateMetadata({ params }: DefaultPageProps) {
  const { locale } = await params
  const { t } = await getServerTranslation({ locale })

  return getMetadataObject({
    locale,
    title: t('Votre code postal, rejoindre une campagne - Nos Gestes Climat'),
    description: t(
      'Comprenez comment calculer votre empreinte sur le climat en 10min chrono.'
    ),
    alternates: {
      canonical: '/infos/codepostal',
    },
    robots: noIndexObject,
  })
}

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <>{children}</>
    </div>
  )
}
