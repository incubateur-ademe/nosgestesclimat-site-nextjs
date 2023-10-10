import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import DocumentationLanding from './_components/DocumentationLanding'

export async function generateMetadata() {
  return getMetadataObject({
    title:
      "Documentation, votre simulateur d'empreinte carbone - Nos Gestes Climat",
    description:
      'Notre documentation détaille les calculs qui nous ont permis de calculer votre bilan carbone personnel.',
  })
}

export default function Documentation() {
  return <DocumentationLanding />
}
