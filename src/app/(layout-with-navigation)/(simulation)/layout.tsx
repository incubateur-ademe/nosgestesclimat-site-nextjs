import { useSupportedRegions } from '@/hooks/useSupportedRegions'
import { PropsWithChildren } from 'react'
import Providers from './_components/Providers'

export default async function SimulateurLayout({
  children,
}: PropsWithChildren) {
  const supportedRegions = await useSupportedRegions()

  return <Providers supportedRegions={supportedRegions}>{children}</Providers>
}
