import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { FormProvider } from '@/publicodes-state'
import { PropsWithChildren } from 'react'

type Props = { params: { root: string } }

export async function generateMetadata({ params }: Props) {
  return getMetadataObject({
    title: 'Simulateur d’empreinte climat - Nos Gestes Climat',
    description:
      'Calculez votre empreinte sur le climat en 10 minutes chrono. Découvrez les gestes qui comptent vraiment pour le climat.',
    alternates: {
      canonical: `/simulateur/${params.root}`,
    },
  })
}

export default function Layout({ params, children }: PropsWithChildren<Props>) {
  return <FormProvider root={params.root}>{children}</FormProvider>
}
