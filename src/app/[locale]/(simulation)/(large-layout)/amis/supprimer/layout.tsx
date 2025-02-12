import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import type { PropsWithChildren } from 'react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const { t } = await getServerTranslation(locale)

  return getMetadataObject({
    locale,
    title: t('Supprimer mes données de groupe - Nos Gestes Climat'),
    description: t(
      'Supprimez vos données de groupe enregistrées dans le calculateur Nos Gestes Climat.'
    ),
    alternates: {
      canonical: '/amis/supprimer',
    },
  })
}

export default function Layout({
  children,
}: PropsWithChildren<{ params: { root: string } }>) {
  return <>{children}</>
}
