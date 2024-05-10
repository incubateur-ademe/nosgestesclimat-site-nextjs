import Main from '@/design-system/layout/Main'
import { PropsWithChildren } from 'react'

import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t('Simulateur d’empreinte climat - Nos Gestes Climat'),
    description: t(
      'Calculez votre empreinte sur le climat en 10 minutes chrono. Découvrez les gestes qui comptent vraiment pour le climat.'
    ),
    alternates: {
      canonical: '/',
    },
  })
}

export default async function PageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Main className="my-8 w-full max-w-6xl overflow-visible px-4 lg:mx-auto">
        {children}
      </Main>
    </>
  )
}
