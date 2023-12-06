import { Metadata } from 'next'
import Modele from './_components/modele/Modele'

export const metadata: Metadata = {
  title: 'Notre modèle de données - Nos Gestes Climat',
  description:
    "Découvrez le modèle de données de notre simulateur d'empreinte climat",
  alternates: {
    canonical: '/modele',
  },
}

export default function ModelePage() {
  return <Modele />
}
