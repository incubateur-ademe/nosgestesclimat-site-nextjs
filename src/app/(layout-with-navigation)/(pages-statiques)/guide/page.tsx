import { Metadata } from 'next'
import Guide from './_components/Guide'

export const metadata: Metadata = {
  title: 'Le guide - Nos Gestes Climat',
  description:
    'Retrouvez dans ce guide toutes les informations sur Nos Gestes Climat.',
}

export default function GuidePage() {
  return <Guide />
}
