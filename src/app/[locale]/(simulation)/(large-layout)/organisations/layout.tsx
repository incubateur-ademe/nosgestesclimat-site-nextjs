import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import type { PropsWithChildren } from 'react'

export const generateMetadata = getCommonMetadata({
  title: t('Le calculateur Nos Gestes Climat, pour les organisations'),
  description: t(
    'Comprenez comment calculer votre empreinte sur le climat en 10min chrono.'
  ),
  alternates: {
    canonical: '/organisations',
  },
})

export default function Layout({ children }: PropsWithChildren) {
  return <div className="bg-white md:-mt-8">{children}</div>
}
