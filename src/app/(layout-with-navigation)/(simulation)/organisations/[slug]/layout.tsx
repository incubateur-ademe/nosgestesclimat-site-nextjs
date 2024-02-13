import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { PropsWithChildren } from 'react'
import { FiltersProvider } from './resultats-detailles/_components/FiltersProvider'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Organisations, mon espace - Nos Gestes Climat',
    description:
      'Accédez à des services sur mesure pour sensibiliser vos partenaires au sein de votre organisation.',
    alternates: {
      canonical: '/',
    },
  })
}

export default function Layout({ children }: PropsWithChildren) {
  return <FiltersProvider>{children}</FiltersProvider>
}
