import { Metadata } from 'next'
import ViePrivee from './_components/ViePrivee'

export const metadata: Metadata = {
  title: 'Vie privée - Nos Gestes Climat',
  description:
    'Découvrez comment nous utilisons vos données personnelles pour vous proposer un simulateur de bilan carbone personnel.',
}

export default function ViePriveePage() {
  return <ViePrivee />
}
