import { noIndexObject } from '@/constants/metadata'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { PropsWithChildren } from 'react'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Organisations, demander une démo - Nos Gestes Climat',
    description:
      'Accédez à des services sur mesure pour sensibiliser vos partenaires au sein de votre organisation.',
    alternates: {
      canonical: '/',
    },
    robots: noIndexObject,
  })
}

export default function Layout({ children }: PropsWithChildren) {
  return <>{children}</>
}
