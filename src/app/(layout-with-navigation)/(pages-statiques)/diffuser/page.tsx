import { Metadata } from 'next'
import Diffuser from './_components/Diffuser'

export const metadata: Metadata = {
  title: "Diffuser notre simulateur d'empreinte climat - Nos Gestes Climat",
  description: 'Diffusez Nos Gestes Climat dans votre organisation.',
}

export default function DiffuserPage() {
  return <Diffuser />
}
