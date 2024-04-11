import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { FormProvider } from '@/publicodes-state'
import { PropsWithChildren } from 'react'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t('Supprimer mes données de groupe - Nos Gestes Climat'),
    description: t(
      'Supprimez vos données de groupe enregistrées dans le simulateur Nos Gestes Climat.'
    ),
    alternates: {
      canonical: '/amis/supprimer',
    },
  })
}

export default function Layout({
  params,
  children,
}: PropsWithChildren<{ params: { root: string } }>) {
  return <FormProvider root={params.root}>{children}</FormProvider>
}
