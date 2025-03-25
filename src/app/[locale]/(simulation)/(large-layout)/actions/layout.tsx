import NorthStarBanner from '@/components/northstar/NorthstarBanner'
import TopBar from '@/components/simulation/TopBar'
import Trans from '@/components/translation/trans/TransServer'
import { noIndexObject } from '@/constants/metadata'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { FormProvider } from '@/publicodes-state'
import type { DefaultPageProps } from '@/types'
import type { PropsWithChildren } from 'react'

export async function generateMetadata({ params }: DefaultPageProps) {
  const { locale } = await params
  const { t } = await getServerTranslation({ locale })

  return getMetadataObject({
    locale,
    title: t(
      'Mes gestes : comment réduire mon empreinte climat - Nos Gestes Climat'
    ),
    description: t('Quelles sont les actions les plus efficaces ?'),
    alternates: {
      canonical: '/actions',
    },
    robots: noIndexObject,
  })
}

export default async function ActionsLayout({
  children,
  params,
}: PropsWithChildren<DefaultPageProps>) {
  const { locale } = await params

  return (
    <FormProvider>
      <Title title={<Trans locale={locale}>Mes&#160;gestes</Trans>} />

      <TopBar simulationMode={false} showTotal />

      <NorthStarBanner type="action" />

      <div>{children}</div>
    </FormProvider>
  )
}
