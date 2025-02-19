import NorthStarBanner from '@/components/northstar/NorthstarBanner'
import TopBar from '@/components/simulation/TopBar'
import Trans from '@/components/translation/Trans'
import { noIndexObject } from '@/constants/metadata'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { FormProvider } from '@/publicodes-state'
import type { PropsWithChildren } from 'react'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t(
      'Actions : comment réduire votre empreinte climat ? - Nos Gestes Climat'
    ),
    description: t('Quelles sont les actions les plus efficaces ?'),
    alternates: {
      canonical: '/actions',
    },
    robots: noIndexObject,
  })
}

export default function ActionsLayout({ children }: PropsWithChildren) {
  return (
    <FormProvider>
      <Title title={<Trans>Mes&#160;gestes</Trans>} />

      <TopBar simulationMode={false} showTotal />

      <NorthStarBanner type="action" />

      <div>{children}</div>
    </FormProvider>
  )
}
