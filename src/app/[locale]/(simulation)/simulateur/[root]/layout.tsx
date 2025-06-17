import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { FormProvider } from '@/publicodes-state'
import type { DefaultPageProps } from '@/types'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import type { PropsWithChildren } from 'react'

type Props = { params: { root: DottedName } }

export async function generateMetadata({
  params,
}: DefaultPageProps<{ params: { root: DottedName } }>) {
  const { root, locale } = await params
  const { t } = await getServerTranslation({ locale })

  return getMetadataObject({
    locale,
    title: undefined,
    description: t(
      'Calculez votre empreinte sur le climat en 10 minutes chrono. Découvrez les gestes qui comptent vraiment pour le climat.'
    ),
    alternates: {
      canonical: `/simulateur/${root}`,
    },
  })
}

export default async function Layout({
  params,
  children,
}: PropsWithChildren<Props>) {
  const { root } = await params
  return <FormProvider root={root}>{children}</FormProvider>
}
