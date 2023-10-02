import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Diffuser from './_components/Diffuser'

export async function generateMetadata() {
  return getMetadataObject({
    title: "Diffuser notre simulateur d'empreinte climat - Nos Gestes Climat",
    description: 'Diffusez Nos Gestes Climat dans votre organisation.',
  })
}

export default function DiffuserPage() {
  return <Diffuser />
}
