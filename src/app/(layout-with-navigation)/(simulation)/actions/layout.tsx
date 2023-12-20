import NorthStarBanner from '@/components/northstar/NorthstarBanner'
import Total from '@/components/total/Total'
import Trans from '@/components/translation/Trans'
import { noIndexObject } from '@/constants/metadata'
import Title from '@/design-system/layout/Title'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { FormProvider } from '@/publicodes-state'
import { PropsWithChildren } from 'react'

export async function generateMetadata() {
  return getMetadataObject({
    title:
      'Actions : comment réduire votre empreinte climat ? - Nos Gestes Climat',
    description: 'Quelles sont les actions les plus efficaces ?',
    alternates: {
      canonical: '/actions',
    },
    robots: noIndexObject,
  })
}

export default function ActionsLayout({ children }: PropsWithChildren) {
  return (
    <FormProvider>
      <Title title={<Trans>Agir</Trans>} />

      <Total />

      <NorthStarBanner type="action" />

      <div>{children}</div>
    </FormProvider>
  )
}
