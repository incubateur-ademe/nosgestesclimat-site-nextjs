import { noIndexObject } from '@/constants/metadata'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { FormProvider } from '@/publicodes-state'
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
    title: t('Mon Empreinte Carbone - Nos Gestes Climat'),
    description: t('Découvre mon bilan carbone sur Nos Gestes Climat.'),
    robots: noIndexObject,
    alternates: {
      canonical: '/empreinte',
    },
  })
}

export default function Layout({ children }: PropsWithChildren) {
  return <FormProvider>{children}</FormProvider>
}
