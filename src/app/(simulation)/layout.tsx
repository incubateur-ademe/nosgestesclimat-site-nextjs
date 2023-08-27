import { ReactNode } from 'react'

import PageLayout from '@/components/layout/PageLayout'
import Main from '@/design-system/layout/Main'
import Providers from './_components/Providers'

export default async function SimulateurLayout({
  children,
}: {
  children: ReactNode
}) {
  // TODO: endpoint should not be static (and should point to local if available)
  const supportedRegions = await fetch(
    'https://data.nosgestesclimat.fr/supportedRegions.json'
  ).then((res) => res.json())

  return (
    <Providers supportedRegions={supportedRegions}>
      <PageLayout shouldShowMenu>
        <Main className="max-w-[800px] p-8">{children}</Main>
      </PageLayout>
    </Providers>
  )
}
