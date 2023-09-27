import { Metadata } from 'next'
import Accessibilite from './_components/Accessibilite'

export const metadata: Metadata = {
  title: 'Accessibilité - Nos Gestes Climat',
  description: "Informations relatives à l'accessibilité de Nos Gestes Climat.",
}

export default function AccessibilityPage() {
  return <Accessibilite />
}
