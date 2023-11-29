import Providers from '@/components/providers/Providers'
import { getSupportedRegions } from '@/helpers/getSupportedRegions'
import { PropsWithChildren } from 'react'

export default async function SimulateurLayout({
  children,
}: PropsWithChildren) {
  const supportedRegions = await getSupportedRegions()

  return <Providers supportedRegions={supportedRegions}>{children}</Providers>
}
