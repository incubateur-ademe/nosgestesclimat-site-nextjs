import { ReactNode } from 'react'

import PageLayout from '@/components/layout/PageLayout'
import Main from '@/design-system/layout/Main'
import Providers from './_components/Providers'

export default async function SimulateurLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <Providers>
      <PageLayout shouldShowMenu>
        <Main className="max-w-[800px] p-8">{children}</Main>
      </PageLayout>
    </Providers>
  )
}
