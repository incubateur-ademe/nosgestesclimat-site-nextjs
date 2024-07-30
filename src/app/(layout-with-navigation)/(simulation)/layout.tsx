import Providers from '@/components/providers/Providers'
import { getSupportedRegions } from '@/helpers/modelFetching/getSupportedRegions'
import { PropsWithChildren } from 'react'

export default function SimulateurLayout({ children }: PropsWithChildren) {
  const supportedRegions = getSupportedRegions()

  return <Providers supportedRegions={supportedRegions}>{children}</Providers>
}
