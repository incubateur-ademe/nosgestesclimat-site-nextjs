import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { FormProvider } from '@/publicodes-state'
import { PropsWithChildren } from 'react'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t('Rejoindre un groupe - Nos Gestes Climat'),
    description: t(
      "Rejoignez votre groupe pour calculez votre empreinte carbone et la comparer avec l'empreinte de vos proches grâce au simulateur de bilan carbone personnel Nos Gestes Climat."
    ),
    alternates: {
      canonical: '/amis/invitation',
    },
  })
}

export default async function SimulateurLayout({
  children,
}: PropsWithChildren) {
  return <FormProvider>{children}</FormProvider>
}
