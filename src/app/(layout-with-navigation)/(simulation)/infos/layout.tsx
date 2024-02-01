import Trans from '@/components/translation/Trans'
import { noIndexObject } from '@/constants/metadata'
import Title from '@/design-system/layout/Title'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { PropsWithChildren } from 'react'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Calculer votre empreinte carbone individuelle - Nos Gestes Climat',
    description:
      'Comprenez comment calculer votre empreinte sur le climat en 10min chrono.',
    alternates: {
      canonical: '/infos',
    },
    robots: noIndexObject,
  })
}

export default async function Infos({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col">
      <Title
        data-cypress-id="tutoriel-title"
        className="text-lg md:text-2xl"
        title={<Trans>Pour commencer</Trans>}
      />
      {children}
    </div>
  )
}
