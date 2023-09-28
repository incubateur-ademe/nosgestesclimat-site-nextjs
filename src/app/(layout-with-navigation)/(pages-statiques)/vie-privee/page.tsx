import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import ViePrivee from './_components/ViePrivee'

export function generateMetadata() {
  return getMetadataObject({
    title: 'Vie privée - Nos Gestes Climat',
    description:
      'Découvrez comment nous utilisons vos données personnelles pour vous proposer un simulateur de bilan carbone personnel.',
  })
}

export default function ViePriveePage() {
  return <ViePrivee />
}
