import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import type { PropsWithChildren } from 'react'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t('Organisations, accéder à mon espace - Nos Gestes Climat'),
    description: t(
      'Accédez à des services sur mesure pour sensibiliser vos partenaires au sein de votre organisation.'
    ),
    alternates: {
      canonical: '/organisations/creer',
    },
  })
}

export default function Layout({ children }: PropsWithChildren) {
  return <>{children}</>
}
