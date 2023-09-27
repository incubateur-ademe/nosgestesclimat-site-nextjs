import { Metadata } from 'next'
import ClientProvider from './_components/ClientProvider'
import StatsContent from './_components/StatsContent'

export const metadata: Metadata = {
  title: "Nos Statistiques d'utilisation - Nos Gestes Climat",
  description:
    "Observez l'évolution de l'impact de Nos Gestes Climat en mesures chiffrées.",
}

export default function Dashboard() {
  return (
    <ClientProvider>
      <StatsContent />
    </ClientProvider>
  )
}
