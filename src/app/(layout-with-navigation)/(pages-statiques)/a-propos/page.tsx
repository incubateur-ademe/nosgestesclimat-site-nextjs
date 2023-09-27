import { Metadata } from 'next'
import APropos from './_components/APropos'

export const metadata: Metadata = {
  title: 'À propos - Nos Gestes Climat',
  description: 'Informations relatives à Nos Gestes Climat.',
}

export default function AProposPage() {
  return <APropos />
}
