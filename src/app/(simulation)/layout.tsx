import { PropsWithChildren } from 'react'

import Providers from '../_components/Providers'

export default async function SimulateurLayout({
  children,
}: PropsWithChildren) {
  // TODO: endpoint should not be static (and should point to local if available)
  const supportedRegions = await fetch(
    'https://data.nosgestesclimat.fr/supportedRegions.json'
  ).then((res) => res.json())

  return <Providers supportedRegions={supportedRegions}>{children}</Providers>
}
