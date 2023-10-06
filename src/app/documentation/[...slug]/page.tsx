import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { useSupportedRegions } from '@/hooks/useSupportedRegions'
import DocumentationContent from '../_components/DocumentationContent'

export async function generateMetadata() {
  return getMetadataObject({
    title:
      "Documentation, votre simulateur d'empreinte carbone - Nos Gestes Climat",
    description:
      'Notre documentation détaille les calculs qui nous ont permis de calculer votre bilan carbone personnel.',
  })
}

export default async function DocumentationPage() {
  const supportedRegions = await useSupportedRegions()

  return <DocumentationContent supportedRegions={supportedRegions} />
}
