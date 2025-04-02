import { noIndexObject } from '@/constants/metadata'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import type { PropsWithChildren } from 'react'

export const generateMetadata = getCommonMetadata({
  title: t('Quiz - Nos Gestes Climat'),
  description: t(
    'Calculez votre empreinte sur le climat en 10 minutes chrono. Découvrez les gestes qui comptent vraiment pour le climat.'
  ),
  alternates: {
    canonical: '/quiz',
  },
  robots: noIndexObject,
})

export default function Layout({ children }: PropsWithChildren) {
  return <>{children}</>
}
