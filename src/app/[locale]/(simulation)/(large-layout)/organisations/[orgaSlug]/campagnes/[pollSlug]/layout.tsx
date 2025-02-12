import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import type { PropsWithChildren } from 'react'
import FiltersProvider from './_components/FiltersProvider'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ orgaSlug: string; pollSlug: string; locale: string }>
}) {
  const { orgaSlug, pollSlug, locale } = await params
  const { t } = await getServerTranslation(locale)

  return getMetadataObject({
    locale,
    title: t('Organisations, mon espace - Nos Gestes Climat'),
    description: t(
      'Accédez à des services sur mesure pour sensibiliser vos partenaires au sein de votre organisation.'
    ),
    alternates: {
      canonical: `/organisations/${orgaSlug}/campagnes/${pollSlug}`,
    },
  })
}

export default function Layout({ children }: PropsWithChildren) {
  return <FiltersProvider>{children}</FiltersProvider>
}
