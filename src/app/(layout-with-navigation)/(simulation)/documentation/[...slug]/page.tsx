import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import DocumentationContent from '../_components/DocumentationContent'

export function generateMetadata() {
  return getMetadataObject({
    title:
      "Documentation, votre simulateur d'empreinte carbone - Nos Gestes Climat",
    description:
      'Notre documentation détaille les calculs qui nous ont permis de calculer votre bilan carbone personnel.',
  })
}

export default function DocumentationPage() {
  return <DocumentationContent />
}
