import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Accessibilite from './_components/Accessibilite'

export function generateMetadata() {
  return getMetadataObject({
    title: 'Accessibilité - Nos Gestes Climat',
    description:
      "Informations relatives à l'accessibilité de Nos Gestes Climat.",
  })
}

export default function AccessibilityPage() {
  return <Accessibilite />
}
