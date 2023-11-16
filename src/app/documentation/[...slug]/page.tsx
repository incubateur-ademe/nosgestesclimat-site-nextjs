import Providers from '@/components/providers/Providers'
import { getSupportedRegions } from '@/helpers/getSupportedRegions'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import DocumentationClient from '../_components/DocumentationClient'
import DocumentationRouter from '../_components/DocumentationRouter'
import DocumentationServer from '../_components/DocumentationServer'

export async function generateMetadata() {
  return getMetadataObject({
    title:
      "Documentation, votre simulateur d'empreinte carbone - Nos Gestes Climat",
    description:
      'Notre documentation détaille les calculs qui nous ont permis de calculer votre bilan carbone personnel.',
  })
}

type Props = {
  params: {
    slug: string[]
  }
}
export default async function DocumentationPage({ params }: Props) {
  const supportedRegions = await getSupportedRegions()

  return (
    <>
      <DocumentationRouter
        serverDocumentation={
          <DocumentationServer
            supportedRegions={supportedRegions}
            slugs={params.slug}
          />
        }
        clientDocumentation={
          <Providers supportedRegions={supportedRegions} isOptim={false}>
            <DocumentationClient
              supportedRegions={supportedRegions}
              slugs={params.slug}
            />
          </Providers>
        }
      />
    </>
  )
}
