import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { FormProvider } from '@/publicodes-state'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import type { PropsWithChildren } from 'react'

type Props = { params: { root: DottedName } }

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    root: DottedName
    locale: string
  }>
}) {
  const { root, locale } = await params
  const { t } = await getServerTranslation(locale)

  return getMetadataObject({
    locale,
    title: t('Calculateur d’empreinte climat - Nos Gestes Climat'),
    description: t(
      'Calculez votre empreinte sur le climat en 10 minutes chrono. Découvrez les gestes qui comptent vraiment pour le climat.'
    ),
    alternates: {
      canonical: `/simulateur/${root}`,
    },
  })
}

export default function Layout({ params, children }: PropsWithChildren<Props>) {
  return <FormProvider root={params.root}>{children}</FormProvider>
}
