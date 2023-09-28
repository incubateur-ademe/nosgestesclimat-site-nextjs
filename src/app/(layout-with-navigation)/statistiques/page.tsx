import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import ClientProvider from './_components/ClientProvider'
import StatsContent from './_components/StatsContent'

export function generateMetadata() {
  return getMetadataObject({
    title: "Nos Statistiques d'utilisation - Nos Gestes Climat",
    description:
      "Observez l'évolution de l'impact de Nos Gestes Climat en mesures chiffrées.",
  })
}

export default function Dashboard() {
  return (
    <ClientProvider>
      <StatsContent />
    </ClientProvider>
  )
}
