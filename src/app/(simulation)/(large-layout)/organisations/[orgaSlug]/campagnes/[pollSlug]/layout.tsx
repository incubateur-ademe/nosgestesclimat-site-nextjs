import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { PropsWithChildren } from 'react'
import FiltersProvider from './_components/FiltersProvider'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t('Organisations, mon espace - Nos Gestes Climat'),
    description: t(
      'Accédez à des services sur mesure pour sensibiliser vos partenaires au sein de votre organisation.'
    ),
    alternates: {
      canonical: '/',
    },
  })
}

export default function Layout({ children }: PropsWithChildren) {
  return <FiltersProvider>{children}</FiltersProvider>
}
