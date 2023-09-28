import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import APropos from './_components/APropos'

export function generateMetadata() {
  return getMetadataObject({
    title: 'À propos - Nos Gestes Climat',
    description: 'Informations relatives à Nos Gestes Climat.',
  })
}

export default function AProposPage() {
  return <APropos />
}
