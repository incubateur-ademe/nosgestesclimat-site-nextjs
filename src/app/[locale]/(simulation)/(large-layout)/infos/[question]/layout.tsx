import { noIndexObject } from '@/constants/metadata'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import type { PropsWithChildren } from 'react'

export const generateMetadata = getCommonMetadata({
  title: t(
    'Question personnalisée, rejoindre une campagne - Nos Gestes Climat'
  ),
  description: t(
    'Comprenez comment calculer votre empreinte sur le climat en 10min chrono.'
  ),
  alternates: {
    canonical: '/infos/[question]',
  },
  robots: noIndexObject,
})

export default function Layout({ children }: PropsWithChildren) {
  return <>{children}</>
}
