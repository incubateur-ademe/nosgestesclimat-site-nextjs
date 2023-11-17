import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'

export async function generateMetadata() {
  return getMetadataObject({
    title:
      "Documentation, votre simulateur d'empreinte carbone - Nos Gestes Climat",
    description:
      'Notre documentation détaille les calculs qui nous ont permis de calculer votre bilan carbone personnel.',
  })
}

// The page content is in layout.tsx in order to persist the state
// between the server and the client
export default async function DocumentationPage() {
  return null
}
