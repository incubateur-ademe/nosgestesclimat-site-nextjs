import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Content from './_components/Content'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Documentation Contexte Sondage - Nos Gestes Climat',
    description:
      "Informations relatives à la création d'un contexte spécifique.",
  })
}

export default function ContextesSondagesPage() {
  return <Content />
}
