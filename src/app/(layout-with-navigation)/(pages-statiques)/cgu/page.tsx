import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Content from './_components/Content'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'CGU - Nos Gestes Climat',
    description: "Conditions générales d'utilisation du site.",
  })
}

export default function CGUPage() {
  return <Content />
}
